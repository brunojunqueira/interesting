import { useBreakpointValue } from "@chakra-ui/react";
import { createContext } from "react";

export const SizeContext = createContext({});

export function SizeProvider({children}){

    const isMobile = useBreakpointValue({base: true, lg: false});

    return(
        <SizeContext.Provider value={{isMobile}}>
            {children}
        </SizeContext.Provider>
    )
}