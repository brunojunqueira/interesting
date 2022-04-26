import { Flex, Text } from "@chakra-ui/react";

export default function NotFound() {

    return (
        <Flex
            w='100%'
            justify='center'
            align='center'
        >   
            
            <Text fontSize='32px' fontWeight='bold' w='fit-content' >404 - Page Not Found</Text>

            
        </Flex>
    )
  }