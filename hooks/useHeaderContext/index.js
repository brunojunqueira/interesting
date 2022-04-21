import { useContext } from "react";
import { HeaderContext } from "../../contexts/HeaderContext";

export default function useHeaderContext(){
    const headerContext = useContext(HeaderContext);
    return headerContext;
}