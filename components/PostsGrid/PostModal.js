import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

export default function ImageModal({src = null}){

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(()=>{
        onOpen();
    }, [src, onOpen])

    return(
        <Flex 
            isOpen={isOpen && src} 
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
                    onClick={() => onClose()}
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
                        src={src}
                        maxH='80%'
                        maxW='80%'
                        shadow='0px 0px 15px -5px rgba(0,0,0,0.9)'
                    />
                </Flex>
            </ModalContent>
        </Flex>
    )
}