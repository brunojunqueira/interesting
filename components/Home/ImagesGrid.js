import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSizeContext from "../../hooks/useSizeContext";

import { Avatar, Box, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Skeleton, Text, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { supabase } from "../../utils/supabase";

export default function ImagesGrid(){

    const router = useRouter();

    const { isMobile } = useSizeContext();

    const size = useBreakpointValue({base: 1, md: 2, lg: 3, xl: 4, "2xl": 5, "3xl": 6});

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [posts, setPosts] = useState([]);
    const [range, setRange] = useState(0);
    const [rows, setRows] = useState([]);
    const [over, setOver] = useState(null);
    const [open, setOpen] = useState(null);
    const [loading, setLoading] = useState(true);

    /**
         * Return all posts avaible on public-posts.
         */
    async function getPosts(){

        let from = range;
        let to = range + 100;

        let { data } = await supabase
            .from('posts')
            .select()
            .range(from, to);

        if(data) {
            setPosts([...data]);
        }
    }

     /**
     * Arrange the rows with images loaded .
     */
    function getRows(){

        let rest = posts.length%size;
        let index = 0;
        let newrows = [];
        
        for(let i = 0; i < size; i++){
            let row = [];
            let calc = (posts.length-rest)/size;
            for(let j = 0; j < calc; j++){
                row.push({
                    author: posts[index]?.author, 
                    author_id: posts[index]?.author_id,
                    author_avatar:posts[index]?.author_avatar,
                    src:posts[index]?.src_url, 
                    index: index
                })
                index++
            }
            if(i < rest){
                row.push({
                    author: posts[index]?.author, 
                    author_id: posts[index]?.author_id,
                    author_avatar:posts[index]?.author_avatar,
                    src:posts[index]?.src_url, 
                    index: index
                })
                index++
            }
            newrows.push(row);
        }

        setRows(newrows);
    }

    /**
     * Redirect to profile of corresponding id.
     * @param [id] simple_id of user profile
     */
    async function goToProfile(id){

        let { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', id)

        if(data){
            router.push(`/profile/${data[0].simple_id}`);
        }

    }

    useEffect(()=>{

        if (posts.length < 1) getPosts();

        document.addEventListener('scroll', () => {
            if(scrollY >= screen.availHeight){
                if(!loading){
                    if(posts.length > range + 100){
                        setLoading(true);
                        setRange(prev => prev + 100);
                    }
                }
            }
          });

    }, [posts.length, range])

    useEffect(()=>{
        if(posts.length > 0) getRows();
        setLoading(true);
    }, [posts.length, size])

    return(
        <Flex
            as={Flex}
            w='90%'
            gap='25px'
            justify='center'
        >
            {posts.length === 0 && 
            <Text>There&apos;s no posts yet.</Text>}
            {rows?.map((row, i)=>{
                return(
                    <Flex
                        key={i}
                        flexDir='column'
                        gap='15px'
                        w={ isMobile ? '100%' : (100/size)+"%"}
                        align='center'
                    >   
                        {row?.map((img, index) => {
                            return(
                                <Skeleton
                                    key={index}
                                    pos='relative'
                                    isLoaded={!loading}
                                    borderRadius='10px'
                                    onLoad={ () => { if (img?.index  === posts?.length - 1) setLoading(false); } }
                                    onMouseOver={()=>setOver(img?.index)}
                                    onMouseOut={()=>setOver(null)}
                                >
                                    <Image
                                        alt='post'
                                        src={img.src}
                                        draggable='false'
                                        maxH='600px'
                                        w='500px'
                                        objectFit='cover'
                                        borderRadius='10px'
                                        _hover={{shadow:'0px 0px 5px 0px rgba(0,0,0,0.9)'}}   
                                        onClick={() => { onOpen(); setOpen(img?.index); }}
                                    />
                                    <Flex
                                        pos='absolute'
                                        bottom='10px'
                                        left='10px'
                                        gap='5px'
                                        color='white'
                                        background='rgba(0, 0, 0, 0.8)'
                                        px='2'
                                        py='1'
                                        borderRadius='20'
                                        opacity={ over != img?.index && !isMobile ? '0' : '1' }
                                        transition='0.25s ease-in-out'
                                        cursor='pointer'
                                        userSelect='none'
                                        onClick={() => goToProfile(img?.author_id)}
                                    >
                                        <Avatar         
                                            alt='author_avatar'
                                            src={img?.author_avatar} 
                                            size='xs'
                                        />
                                        <Text
                                        >
                                            {img?.author}
                                        </Text>
                                        
                                    </Flex>
                                    <Box h='5px' />
                                </Skeleton>
                            )
                        })}
                    </Flex>
                )
            })}

            <Flex 
                isOpen={isOpen} 
                onClose={onClose}
                as={ Modal }
                pos='absolute'
                top='0'
                left='0'
                h='100vh'
                w='100vw'
            >
                <ModalOverlay />
                <ModalContent
                    background='transparent'
                    color='white'
                >
                    <ModalCloseButton
                        _focus={{outline:'none'}}
                        position='fixed'
                        right='5'
                        top='5'
                    />
                    <Flex
                        as={ ModalBody }
                        pos='fixed'
                        top='50%'
                        left='50%'
                        transform='translate(-50%, -50%)'
                        h='100%'
                        w='100%'
                        justify='center'
                        align='center'
                        background='transparent'
                        zIndex='-5'
                        userSelect='none'
                        onClick={onClose}
                    >
                        <Image
                            alt='post image'
                            src={open != null && posts[open]?.src_url}
                            maxH='80%'
                            maxW='80%'
                            shadow='0px 0px 15px -5px rgba(0,0,0,0.9)'
                        />
                    </Flex>
                </ModalContent>
            </Flex>
        </Flex>
    )
}