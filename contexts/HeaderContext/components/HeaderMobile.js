import { Flex } from "@chakra-ui/react";
import { SearchProvider } from "../../SearchContext";
import UserMenuMobile from "./UserMenuMobile";
import Logo from "../../../components/Logo";


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
            <SearchProvider/>
        </Flex>
    )
}