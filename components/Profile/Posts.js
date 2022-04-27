import { Flex, Icon, useBreakpointValue } from "@chakra-ui/react";
import { MdCollections } from "react-icons/md"
import PostsGrid from "../Global/PostsGrid";

export default function Posts({id}){

    const size = useBreakpointValue({base: 1, md: 2, lg: 3});

    return(
        <Flex
            w='100%'
            flexDir='column'
            gap='10px'
        >
            <Flex 
                pl='25px'
                align='center'
                gap='10px'
                fontSize='20px'
            >
                <Icon
                    as={ MdCollections } 
                    color='blackAlpha.800'
                />
                Posts
            </Flex>
            <Flex
                w='100%'
                minH='220px'
                py='25px'
                background='#FFFAFA'
                boxShadow='inset 0px 5px 5px -5px #000000'
                justify='center'
                gap='15px'
            >
                <PostsGrid 
                    size={size}
                    user={id}
                />
            </Flex>
        </Flex>
    )
}