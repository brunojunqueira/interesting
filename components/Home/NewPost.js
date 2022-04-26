import { supabase } from "../../utils/supabase";
import { useState } from "react";
import useSizeContext from "../../hooks/useSizeContext"
import useAuthContext from "../../hooks/useAuthContext"

import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { MdCollections } from "react-icons/md"


export default function NewPost(){

    const { isMobile } = useSizeContext();

    const { user, id } = useAuthContext();

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [error, setError] = useState(null);

    async function post(){

        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = async _this => {
            let files = Array.from(input.files);
            if(files){

                let type = files[0].type;

                switch(type.split('/')[1]){
                    case 'png': break;
                    case 'jpg': break;
                    case 'jpeg': break;
                    case 'gif': break;
                    default: 
                        setError({message: 'Invalid file type, please post only files with type .png, .jpg, .jpeg e .gif.'});
                        return;
                }

                let date = new Date();
                
                let path = `${id}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}_${date.getDate()}${date.getMonth()}${date.getFullYear()}.${type.split('/')[1]}`;

                let { error } = await supabase
                .storage
                .from('public-posts')
                .upload(path, files[0], {contentType: type});

                if(!error){

                    let post = {
                        author: user.user_metadata.name,
                        author_id: user.id,
                        author_avatar: user.user_metadata.avatar_url,
                        public: true,
                        src_url:`https://tchvevzeixnravgznlpr.supabase.co/storage/v1/object/public/public-posts/${path}`
                    }
        
                    let { error } = await supabase
                        .from('posts')
                        .insert(post);

                    if(error) setError(error.message);

                }
            }
        };
        input.click();
    }

    return(
        <Flex
            position='sticky'
            w='100vw'
            h='80px'
            justify='center'
            align='center'
            gap='10px'
            userSelect='none'
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
                onClick={ () => post() }
            >
                <MdCollections fontSize='20px'/>
                New Post
            </Flex>
            <AlertDialog isOpen={error ?? false} onClose={onClose}>
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <AlertDialogCloseButton 
                        onClick={()=>{onClose(); setError(null)}}
                        _focus={{outline:'none'}}
                    />
                    <AlertDialogHeader> Oops! </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text>
                            {error?.message}
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button 
                            colorScheme='green' 
                            onClick={()=>{onClose(); setError(null)}} 
                            _focus={{outline:'none'}}
                            >
                                Okay
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Flex>
    )
}