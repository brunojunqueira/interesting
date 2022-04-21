import useSizeContext from "../../hooks/useSizeContext"

import { Box, Flex } from "@chakra-ui/react";
import { MdPhoto } from "react-icons/md"
import { RiVideoFill } from "react-icons/ri"

export default function NewPost(){

    const { isMobile } = useSizeContext();

    return(
        <Flex
            w='100vw'
            h='80px'
            justify='center'
            align='center'
            gap='10px'
        >
            <Flex
                h='40px'
                w={ isMobile ? '150px' : '200px' }
                justify='center'
                align='center'
                cursor='pointer'
                borderRadius='5px'
                transition='0.1s ease-in-out'
                background='rgb(62, 49, 44)'
                color='#FFFAFA'
                _hover={{background:'#FFFAFA', color:'rgb(33, 25, 22)'}}
                shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
                gap='10px'
                
            >
                <MdPhoto fontSize='20px'/>
                Photo
            </Flex>
            <Flex
                h='40px'
                w={ isMobile ? '150px' : '200px' }
                justify='center'
                align='center'
                cursor='pointer'
                borderRadius='5px'
                transition='0.1s ease-in-out'
                background='rgb(62, 49, 44)'
                color='#FFFAFA'
                _hover={{background:'#FFFAFA', color:'rgb(33, 25, 22)'}}
                shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
                gap='10px'
                
            >
                <RiVideoFill fontSize='20px'/>
                Video
            </Flex>
        </Flex>
    )
}