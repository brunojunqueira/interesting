import { Flex } from "@chakra-ui/react";
import Logo from "../Logo"
import SearchBar from "./SearchBar";
import UserMenuDesktop from "./UserMenuDesktop";

export default function HeaderDesktop(){

    return(
        <Flex
            pos='fixed'
            top='0'
            w='100vw'
            h='75px'
            background='rgb(33, 25, 22)'
            alignItems='center'
            justify='space-between'
            pl='5vw'
            pr='5vw'
            gap='50px'
            shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
            zIndex='5'
        >
            <Logo/>
            <SearchBar/>
            <UserMenuDesktop/>
        </Flex>
    )
}