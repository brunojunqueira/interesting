import { useRouter } from "next/router"
import { useDisclosure } from "@chakra-ui/react";
import useAuthContext from "../../../hooks/useAuthContext";

import { Avatar, Box, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { MdMenu, MdClose } from 'react-icons/md'


export default function UserMenuMobile(){

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logout, user, id } = useAuthContext();
    const userdata = user && user.user_metadata;
    const router = useRouter();

    return(
        <>
            <Flex 
                    pos='fixed'
                    left='25px'
                    color='#E7E0D6'
                    onClick={onOpen}
                >
                    <Icon 
                        fontSize='25px'
                        as={MdMenu}
                    />
            </Flex>
            
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
                                mt='5px'
                            >
                                <Flex
                                    h='50px'
                                    w='100%'    
                                    align='center'
                                    pl='5px'
                                    mb='10px'
                                    gap="10px"
                                >
                                    <Avatar src={userdata?.avatar_url}/>
                                    <Text>{userdata?.name}</Text>
                                </Flex>
                                <Divider/>
                                <Flex
                                    h='50px'
                                    w='100%'
                                    justify='left'
                                    align='center'
                                    pl='5px'
                                    onClick={()=>{ router.push(`/profile/${id}`); onClose(); }}
                                >
                                    Profile
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
                                    Sign out
                                </Flex>
                            </Flex>
                            :
                            <Flex
                                h='50px'
                                w='100%'
                                justify='left'
                                align='center'
                                pl='5px'
                                onClick={() => {router.push('/signin'); onClose();}}
                                gap='10px'
                            >
                                Sign in
                            </Flex>
                            }
                            <Divider/>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}