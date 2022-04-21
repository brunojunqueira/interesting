import { createContext, useState } from "react"

import { Icon, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md"
import useSizeContext from "../../hooks/useSizeContext";

export const SearchContext = createContext({});

export function SearchProvider(){

    const { isMobile } = useSizeContext();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function search(){
        setLoading(true)
    }

    return(
        <SearchContext.Provider value={{}}>
            <InputGroup 
                background='white' 
                color='rgb(33, 25, 22)'
                borderRadius='15px' 
                width={ isMobile ? '90%' : '30%'} 
            >
                <Input
                    _focus={{outlineStyle: 'none'}}
                    placeholder='What are you looking for?'
                    _placeholder={{color:'rgb(33, 25, 22)'}}
                    onKeyDown={(e)=>{(e.key === 'Enter' || e.key === 'NumpadEnter') && search}}
                    h='40px'
                />
                <InputRightElement>
                    { loading ? 
                        <Spinner size='sm'/>
                        :
                        <Icon 
                            as={ MdSearch } 
                            onClick={search}
                        />
                    }
                </InputRightElement>
            </InputGroup>
        </SearchContext.Provider>
    )

}