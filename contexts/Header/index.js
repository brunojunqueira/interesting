import { createContext } from "react";
import useSizeContext from "../../hooks/useSizeContext";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export const HeaderContext = createContext({});

export function HeaderProvider({children}){

    const { isMobile } = useSizeContext();

    return(
        <HeaderContext.Provider value={{}}>
            { isMobile ?
                <HeaderMobile/>
            :
                <HeaderDesktop/>
            }
            {children}
        </HeaderContext.Provider>
    )
}