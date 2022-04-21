import { Image } from "@chakra-ui/react";
import { useRouter } from "next/router"

export default function Logo(){

    const router = useRouter();
    
    return(
        <Image 
                draggable='false' 
                userSelect='none' 
                cursor='pointer'
                h='25px' 
                src='/logo.svg'
                onClick={()=> router.push('/')}
        />
    )
}