import useAuthContext from "../../hooks/useAuthContext";
import { useRouter } from "next/router"

import { MdKeyboardArrowDown } from 'react-icons/md'
import { Avatar, Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";


export default function UserMenuDesktop(){

    const { logout, user, id } = useAuthContext();
    
    const userdata = user && user.user_metadata;
    const router = useRouter();

    return(
    <>
        {user ? 
            <Box
                as={ Flex }
                gap='10px'
                alignItems='center'
                justifyContent='center'
                color='#E7E0D6'
            >   
                <Avatar h='40px' w='40px' src={userdata?.avatar_url}/>
                <Text>{userdata?.name}</Text>
                <Menu>
                    <MenuButton ml='-5px' mt='3px' fontSize='15px'>
                        <MdKeyboardArrowDown/>
                    </MenuButton>
                    <MenuList 
                        padding='0'
                        background='#FFFAFA'
                        border='none'
                        borderRadius='0'
                        mt='8px'
                        mr='-15px'
                        shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
                    >
                        <MenuItem 
                            as={Flex}
                            alignItems='center'
                            justifyContent='center'
                            cursor='pointer'
                            color='rgb(33, 25, 22)'
                            _focus={{background:'#FFFAFA'}}
                            _hover={{background:'#E7E0D6'}}
                            onClick={()=>router.push(`/profile/${id}`)}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem 
                            as={Flex}
                            alignItems='center'
                            justifyContent='center'
                            cursor='pointer'
                            color='rgb(33, 25, 22)'
                            _focus={{background:'#FFFAFA'}}
                            _hover={{background:'#E7E0D6'}}
                            onClick={logout}
                        >
                            Sign out
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            :
            <Box
                as={ Flex }
                color='white'
                gap='5px'
            >
                <Flex
                    h='40px'
                    w='200px'
                    justify='center'
                    align='center'
                    cursor='pointer'
                    borderRadius='5px'
                    transition='0.1s ease-in-out'
                    _hover={{background:'rgb(62, 49, 44)'}}
                    onClick={() => router.push('/signin')}
                    gap='10px'
                    color='#E7E0D6'
                >
                    Sign in
                </Flex>
            </Box>
        }
    </>
    )
}