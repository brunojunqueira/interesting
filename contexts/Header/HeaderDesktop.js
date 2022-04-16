import useAuthContext from "../../hooks/useAuthContext";

import { Avatar, Box, Flex, Icon, Image, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Spinner, Text } from "@chakra-ui/react";
import { MdSearch, MdKeyboardArrowDown } from 'react-icons/md'


export default function HeaderDesktop({loading}){

    const { login, logout, user } = useAuthContext();

    return(
        <Flex
            pos='sticky'
            top='0'
            w='100vw'
            h='75px'
            background='rgb(33, 25, 22)'
            alignItems='center'
            justify='space-between'
            pl='5vw'
            pr='5vw'
            gap='50px'
        >
            <Image 
                draggable='false' 
                userSelect='none' 
                h='25px' 
                src='/logo.svg'
            />

            <InputGroup 
                background='white' 
                color='rgb(33, 25, 22)'
                borderRadius='15px' 
                width='500px' 
                size='sm'
            >
                <Input
                    _focus={{outlineStyle: 'none'}}
                    placeholder='What are you looking for?'
                    _placeholder={{color:'rgb(33, 25, 22)'}}
                />
                <InputRightElement>
                    { loading ? 
                        <Spinner size='sm'/>
                        :
                        <Icon 
                            as={ MdSearch } 
                            onClick={()=>{ setLoading(true) }}
                        />
                    }
                </InputRightElement>
            </InputGroup>
            {user ? 
            <Box
                as={ Flex }
                color='white'
                gap='10px'
                alignItems='center'
            >   
                <Avatar size='md' src={user.avatar_url}/>
                <Text>{user.name}</Text>
                <Menu>
                    <MenuButton>
                        <MdKeyboardArrowDown/>
                    </MenuButton>
                    <MenuList 
                        padding='0'
                        background='rgb(62, 49, 44)'
                        border='none'
                        borderRadius='0'
                        mt='20px'
                        mr='-15px'
                    >
                        <MenuItem 
                            as={Flex}
                            alignItems='center'
                            justifyContent='center'
                            cursor='pointer'
                            _focus={{background:'rgb(62, 49, 44)'}}
                            _hover={{background:'#E7E0D6', color:'black'}}
                            onClick={logout}
                        >
                            Sign Out
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
                    h='50px'
                    w='100px'
                    justify='center'
                    align='center'
                    cursor='pointer'
                    borderRadius='5px'
                    transition='0.1s ease-in-out'
                    _hover={{background:'rgb(62, 49, 44)'}}
                    onClick={login}
                >
                    Sign In
                </Flex>
            </Box>
            }
            
        </Flex>
    )
}