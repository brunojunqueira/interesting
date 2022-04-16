import { createContext, useState  } from "react";
import useSizeContext from "../../hooks/useSizeContext";

import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export const HeaderContext = createContext({});

export function HeaderProvider({children}){

    const { isMobile } = useSizeContext();

    const [loading, setLoading] = useState(false);

    return(
        <HeaderContext.Provider value={{}}>
            { isMobile ?
                <HeaderMobile loading={loading}/>
            :
                <HeaderDesktop loading={loading}/>
            }
            {children}
        </HeaderContext.Provider>
    )
}