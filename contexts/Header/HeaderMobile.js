import { useState } from "react";
import { useRouter } from "next/router";
import useAuthContext from "../../hooks/useAuthContext";

import { Avatar, Box, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Image, Input, InputGroup, InputRightElement, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { MdSearch, MdMenu, MdClose } from 'react-icons/md'


export default function HeaderMobile({loading}){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { login, logout, user } = useAuthContext();
    const router = useRouter();

    return(
        <Flex
            flexDir='column'
            align='center'
            gap='10px'
        >
            <Flex
                pos='sticky'
                top='0'
                w='100vw'
                h='75px'
                overflow='hidden'
                background='rgb(33, 25, 22)'
                alignItems='center'
                justify='center'
            >
                <Flex 
                    pos='absolute'
                    left='25px'
                    color='#E7E0D6'
                    onClick={onOpen}
                >
                    <Icon 
                        fontSize='25px'
                        as={MdMenu}
                    />
                </Flex>
                <Image 
                    draggable='false' 
                    userSelect='none' 
                    h='25px' 
                    src='/logo.svg'
                    onClick={() => router.push('/')}
                    cursor='pointer'
                />  
                <Drawer 
                    placement='left'
                    onClose={onClose} 
                    isOpen={isOpen} 
                    size='full'
                >
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerHeader 
                            as={Flex}
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <Image 
                                draggable='false' 
                                userSelect='none' 
                                h='25px' 
                                src='/logo.svg'
                            />
                            <Icon
                                color='rgb(33, 25, 22)'
                                mt='-0.5'
                                as={ MdClose }
                                fontSize='25px'
                                onClick={onClose}
                            />
                        </DrawerHeader>
                        <DrawerBody>
                            <Box
                                as={ Flex }
                                flexDir='column'
                                color='rgb(33, 25, 22)'
                                gap='5px'
                            >
                                {user ? 
                                <Flex
                                    flexDir='column'
                                    gap='5px'
                                    mt='5px'
                                >
                                    <Flex
                                        h='50px'
                                        w='100%'    
                                        align='center'
                                        pl='5px'
                                        gap="10px"
                                    >
                                        <Avatar src={user.avatar_url}/>
                                        <Text>{user.name}</Text>
                                    </Flex>
                                    <Divider/>
                                    <Flex
                                        h='50px'
                                        w='100%'
                                        justify='left'
                                        align='center'
                                        pl='5px'
                                        onClick={logout}
                                    >
                                        Sign Out
                                    </Flex>
                                </Flex>
                                :
                                <Flex
                                    h='50px'
                                    w='100%'
                                    justify='left'
                                    align='center'
                                    pl='5px'
                                    onClick={login}
                                >
                                    Sign In
                                </Flex>
                                }
                                <Divider/>
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <InputGroup 
                background='white' 
                color='rgb(33, 25, 22)'
                borderRadius='15px' 
                width='90%' 
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
        </Flex>
    )
}