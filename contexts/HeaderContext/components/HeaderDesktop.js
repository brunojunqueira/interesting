import { Flex } from "@chakra-ui/react";
import Logo from "../../../components/Logo"
import UserMenuDesktop from "./UserMenuDesktop";
import { SearchProvider } from "../../SearchContext";

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
            <SearchProvider/>
            <UserMenuDesktop/>
        </Flex>
    )
}