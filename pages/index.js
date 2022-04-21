import useSizeContext from "../hooks/useSizeContext"
import useAuthContext from "../hooks/useAuthContext"

import { Flex } from "@chakra-ui/react";
import ImagesGrid from "../components/ImagesGrid";
import NewPost from "../components/NewPost";

export default function Home() {
  const { isMobile } = useSizeContext();
  const { user } = useAuthContext();
  
  return (
    <>
      {user && 
        <NewPost/>
      }
      <ImagesGrid/>
    </>
  )
}
