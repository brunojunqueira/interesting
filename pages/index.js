import useAuthContext from "../hooks/useAuthContext"

import { Flex } from "@chakra-ui/react";
import ImagesGrid from "../components/Home/ImagesGrid";
import NewPost from "../components/Home/NewPost";
import useSizeContext from "../hooks/useSizeContext";

export default function Home() {

  const { isMobile } = useSizeContext();
  const { user } = useAuthContext();
  
  return (
    <Flex
      w='100vw'
      flexDir='column'
      justify='center'  
      align='center'
      gap='25px'
      pt={isMobile ? '150px' : '100px'}
    >
      {user && 
        <NewPost/>
      }
      <ImagesGrid/>
    </Flex>
  )
}
