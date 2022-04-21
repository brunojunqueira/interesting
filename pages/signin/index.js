import { Flex, Text } from "@chakra-ui/react";
import useAuthContext from "../../hooks/useAuthContext"

import { IoLogoGoogle } from 'react-icons/io'
import { FaFacebookF } from 'react-icons/fa'

export default function Signin(){

    const { login } = useAuthContext();

    return(
        <Flex
            h='calc(100vh - 75px)'
            justify='center'
            align='center'
        >
            <Flex
                w='300px'
                h='200px'
                borderRadius='10px'
                background='#FFFAFA'
                shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
                justify='center'
                align='center'
                flexDir='column'
                gap='10px'
            >
                <Text 
                    mt='-25px'
                    fontSize='25px'
                    fontWeight='bold'
                >
                    Sign in
                </Text>
                <Flex
                    h='40px'
                    w='250px'
                    justify='center'
                    align='center'
                    cursor='pointer'
                    borderRadius='5px'
                    transition='0.1s ease-in-out'
                    background='rgb(62, 49, 44)'
                    color='#FFFAFA'
                    _hover={{background:'#FFFAFA', color:'rgb(33, 25, 22)'}}
                    shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
                    onClick={()=>{login('google')}}
                    gap='10px'
                    
                >
                    <IoLogoGoogle/>
                    Sign in with Google
                </Flex>
                <Flex
                    h='40px'
                    w='250px'
                    justify='center'
                    align='center'
                    cursor='pointer'
                    borderRadius='5px'
                    transition='0.1s ease-in-out'
                    background='rgb(62, 49, 44)'
                    color='#FFFAFA'
                    _hover={{background:'#FFFAFA', color:'rgb(33, 25, 22)'}}
                    shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
                    onClick={()=>{login('facebook')}}
                    gap='10px'
                >
                    <FaFacebookF/>
                    Sign in with Facebook
                </Flex>
            </Flex>
        </Flex>
    )
}