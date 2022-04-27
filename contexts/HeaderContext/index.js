import { createContext } from "react";
import HeaderDesktop from "../../components/Header/HeaderDesktop";
import HeaderMobile from "../../components/Header/HeaderMobile";
import useSizeContext from "../../hooks/useSizeContext";


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