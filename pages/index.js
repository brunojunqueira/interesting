import useAuthContext from "../hooks/useAuthContext"

import { Flex, useBreakpointValue } from "@chakra-ui/react";
import NewPost from "../components/Global/NewPost";
import PostsGrid from "../components/Global/PostsGrid";
import useSizeContext from "../hooks/useSizeContext";


export default function Home() {

  const size = useBreakpointValue({base: 1, md: 2, lg: 3, xl: 4, "2xl": 5, "3xl": 6});

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
      <PostsGrid size={size}/>
    </Flex>
  )
}
