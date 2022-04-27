import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getProfile } from "../../utils/requests";
import useAuthContext from "../../hooks/useAuthContext";
import useSizeContext from "../../hooks/useSizeContext";


import { Flex } from "@chakra-ui/react";
import Header from "../../components/Profile/Header";
import Favorites from "../../components/Profile/Favorites";
import Inspiration from "../../components/Profile/Inspiration";
import Posts from "../../components/Profile/Posts";




export default function Profile(){

    const router = useRouter();

    const [profile, setProfile] = useState(null);
    const { id } = useAuthContext();

    const { isMobile } = useSizeContext();

    useEffect(()=>{        

        async function findProfile(id){
            const result = await getProfile(id);
            if(!result){
                router.push('/404');
            }
            else{
                setProfile(result);
            }
        } 

        const id = router.query.id;
        if(id) findProfile(id);

    }, [router.query.id, router])

    return(
        <Flex
            w='100%'
            h='calc(100vh - 75px)'
            justify='center'
            pt={isMobile ? '150px' : '100px'}
            
        >
            <Flex
                w={isMobile ? '90vw' : '50vw'}
                h='fit-content'
                background='#FFFAFA'
                flexDir='column'
                align='center'
                borderRadius='10px'
                pt='50px'
                gap='50px'
                shadow='0px 2px 2px 1px rgba(0,0,0,0.2)'
            >
                <Header profile={profile} id={id}/>
                <Favorites profile={profile}/>
                <Inspiration profile={profile}/>
                <Posts id={profile?.simple_id}/>
            </Flex>

        </Flex>
    )
}