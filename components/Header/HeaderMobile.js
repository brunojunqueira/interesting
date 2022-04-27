import { Flex } from "@chakra-ui/react";
import Logo from "../Logo";
import SearchBar from "./SearchBar";
import UserMenuMobile from "./UserMenuMobile";


export default function HeaderMobile(){

    return(
        <Flex
            pos='fixed'
            top='0'
            background='white'
            h='150px'
            flexDir='column'
            align='center'
            gap='10px'
            zIndex='5'
        >
            <Flex
                w='100vw'
                h='75px'
                background='rgb(33, 25, 22)'
                alignItems='center'
                justify='center'
            >
                <UserMenuMobile/>
                <Logo/>
            </Flex>
            <SearchBar/>
        </Flex>
    )
}