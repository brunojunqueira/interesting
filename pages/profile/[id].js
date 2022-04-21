import { useRouter } from "next/router"
import { useEffect } from "react"
import useAuthContext from "../../hooks/useAuthContext";
import useSizeContext from "../../hooks/useSizeContext";


import { Flex } from "@chakra-ui/react";
import Header from "../../components/Profile/Header";
import Favorites from "../../components/Profile/Favorites";
import Inspiration from "../../components/Profile/Inspiration";



export default function Profile(){

    const router = useRouter()

    const { id, profile, getProfile } = useAuthContext();

    const { isMobile } = useSizeContext();


    useEffect(()=>{        

        async function setProfile(id){
            const result = await getProfile(id);
            if(result !== 'success'){
                router.push('/404');
            }
        } 

        const id = router.query.id;
        if(id) setProfile(id);

    }, [router.query.id, router, getProfile])

    return(
        <Flex
            w='100%'
            h='calc(100vh - 75px)'
            justify='center'
            pt={isMobile ? '10px' : '0'}
            
        >
            <Flex
                w={isMobile ? '90vw' : '50vw'}
                background='#FFFAFA'
                flexDir='column'
                align='center'
                borderRadius={isMobile ? '10px' : '0'}
                pt='50px'
                gap='50px'
                shadow='0px 2px 2px 1px rgba(0,0,0,0.2)'
            >
                <Header profile={profile} id={id}/>
                <Favorites profile={profile}/>
                <Inspiration profile={profile}/>
            </Flex>

        </Flex>
    )
}