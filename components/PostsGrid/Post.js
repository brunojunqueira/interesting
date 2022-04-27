import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import useSizeContext from "../../hooks/useSizeContext";
import { dateToSimpleDate } from "../../utils/conversor";

import { BiDotsVertical } from 'react-icons/bi'
import { Avatar, Collapse, Flex, Icon, Image, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import useAuthContext from "../../hooks/useAuthContext";


export default function Post({post, loading, openModal, onLoad}){

    const router = useRouter();

    const { isMobile } = useSizeContext();

    const { user } = useAuthContext();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOptionsOpen, setOptionsOpen] = useState(false);

    async function downloadImage(imageSrc) {
        const image = await fetch(imageSrc)
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
      
        const link = document.createElement('a')
        link.href = imageURL
        link.download = `${post?.created_at.split('T')[0]}_${post?.id}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

    useEffect(()=>{
        setOptionsOpen(false);
    },[isOpen])

    return(
        <Skeleton
            pos='relative'
            isLoaded={!loading}
            outline={isMobile ? '1px solid rgba(0,0,0,0.2)' : 'none'}
            _hover={{outline:'1px solid rgba(0,0,0,0.2)'}}   
            onMouseOver={() => onOpen()}
            onMouseOut={() => onClose()}
        >
            <Image
                maxH='600px'
                w='500px'
                objectFit='cover'

                alt='post'
                src={post?.src_url}
                draggable='false'

                onLoad={onLoad}
                onClick={() => openModal(post?.src_url)}
            />
            <Collapse 
                in={isOpen || isMobile} 
                animateOpacity
            >
                <Flex
                    w='100%'
                    px='2'
                    py='1'
                    background='#E7E0D6'
                    justify='space-between'
                    align='center'
                    opacity={ !isOpen && !isMobile ? '0' : '1' }

                    transition='0.25s ease'

                    userSelect='none'
                >
                    <Flex
                        bottom='10px'
                        left='10px'
                        gap='5px'
                    >
                        <Avatar      
                            h='30px'
                            w='30px'   

                            alt='author_avatar'
                            src={post?.author_avatar} 
                            cursor='pointer'
                            onClick={() => router.push(`/profile/${post?.author_simple_id}`)}
                        />
                        <Flex
                            flexDir='column'
                            color='black'
                        >
                            <Text
                                mb='-2px'
                                fontSize='14px'
                                cursor='pointer'
                                onClick={() => router.push(`/profile/${post?.author_simple_id}`)}
                            >
                                {post?.author}
                            </Text>
                            <Text
                                mt='-3px'
                                fontSize='10px'
                            >
                                {dateToSimpleDate(post?.created_at)} ago
                            </Text>           
                        </Flex>   
                    </Flex>
                    <Icon
                        as={ BiDotsVertical }
                        cursor='pointer'
                        onClick={()=>setOptionsOpen(prev => !prev)}
                    />
                </Flex>
                <Collapse 
                    in={isOptionsOpen} 
                    animateOpacity
                >
                    <Flex
                        bottom='10px'
                        left='10px'
                        pl='2'
                        py='1'
                        gap='5px'
                        flexDir='column'
                        background='#F5EEE4'
                        align='center'
                        userSelect='none'
                    >
                        <Flex
                            w='100%'
                            cursor='pointer'
                            onClick={() => downloadImage(post?.src_url)}
                        >
                            Download
                        </Flex>
                        {user?.id === post?.author_id && 
                            <Flex
                                w='100%'
                                cursor='pointer'
                            >
                                Delete
                            </Flex>
                        }
                    </Flex>
                </Collapse>
            </Collapse>
        </Skeleton>
    )
}