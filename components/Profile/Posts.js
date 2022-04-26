import { useState, useEffect } from "react";
import useSizeContext from "../../hooks/useSizeContext";

import { Avatar, Box, Flex, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import { MdCollections } from "react-icons/md"
import { supabase } from "../../utils/supabase";

export default function Posts({profile}){

    const { isMobile } = useSizeContext();

    const [posts, setPosts] = useState([]);
    const [rows, setRows] = useState([]);
    const [over, setOver] = useState(null);
    const [open, setOpen] = useState(null);
    const [loading, setLoading] = useState(true);

    const {isOpen, onOpen, onClose} = useDisclosure();

    const size = isMobile ? 1 : 3;  

    /**
     * Return all posts avaible on public-posts.
     */
    async function getPosts(){

        let { data } = await supabase
            .from('posts')
            .select()
            .eq('author_id', profile.id);

        if(data) {
            setPosts(data);
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

    useEffect(()=>{
        if(profile && posts.length < 1) getPosts();
    }, [posts.length, profile]);

    useEffect(()=>{
        if(posts.length > 0) getRows();
        setLoading(true);
    }, [posts.length, size])

    return(
        <Flex
            w='100%'
            flexDir='column'
            gap='10px'
        >
            <Flex 
                pl='25px'
                align='center'
                gap='10px'
                fontSize='20px'
            >
                <Icon
                    as={ MdCollections } 
                    color='blackAlpha.800'
                />
                Posts
            </Flex>
            <Flex
                w='100%'
                minH='220px'
                background='#FFFAFA'
                boxShadow='inset 0px 5px 5px -5px #000000'
                justify='center'
                align='center'
                gap='15px'
            >
                {posts.length === 0 && 
                <Text>There&apos;s no posts yet.</Text>}
                {rows?.map((row, i)=>{
                    return(
                        <Flex
                            key={i}
                            flexDir='column'
                            gap='15px'
                            w={ isMobile ? '90%' : (80/size)+"%"}
                            justify='center'
                            pt='10'
                            pb='10'
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
                                        <Box h='5px' />
                                    </Skeleton>
                                )
                            })}
                        </Flex>
                    )
                })}
            </Flex>
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