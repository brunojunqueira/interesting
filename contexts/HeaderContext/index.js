import { createContext, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import useSizeContext from "../../hooks/useSizeContext";

import HeaderDesktop from "./components/HeaderDesktop";
import HeaderMobile from "./components/HeaderMobile";

export const HeaderContext = createContext({});

export function HeaderProvider({children}){

    const { isMobile } = useSizeContext();
    const { loading } = useAuthContext();

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