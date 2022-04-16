import { useContext } from "react";
import { SizeContext } from "../../contexts/SizeContext";

export default function useSizeContext(){
    const sizeContext = useContext(SizeContext);
    return sizeContext;
}