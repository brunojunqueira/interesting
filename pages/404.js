import { Flex, Stack, Text } from "@chakra-ui/react";
import { headerStyle } from "../contexts/HeaderContext/style"
import useSizeContext from "../hooks/useSizeContext";

export default function NotFound() {

    const { isMobile } = useSizeContext();

    const header = (isMobile)? headerStyle.desktop: headerStyle.mobile;

    return (
        <Flex
            w='100%'
            h={`calc(100vh - ${header.height}px)`}
            justify='center'
            align='center'
        >   
            
            <Text fontSize='32px' fontWeight='bold' w='fit-content' >404 - Page Not Found</Text>

            
        </Flex>
    )
  }