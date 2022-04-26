import { Flex } from "@chakra-ui/react";
import { createContext } from "react";
import useSizeContext from "../../hooks/useSizeContext";

import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

export const HeaderContext = createContext({});

export function HeaderProvider({children}){

    const { isMobile } = useSizeContext();

    return(
        <HeaderContext.Provider value={{ }}>
                {isMobile ?
                    <HeaderMobile/>
                :
                    <HeaderDesktop/>
                }
                {children}
        </HeaderContext.Provider>
    )
}