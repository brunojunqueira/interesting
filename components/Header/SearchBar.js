import { useState } from "react"
import useSizeContext from "../../hooks/useSizeContext";

import { Icon, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md"


export default function SearchBar(){

    const { isMobile } = useSizeContext();

    const [loading, setLoading] = useState(false);

    function search(){
        setLoading(true);
    }

    return(
        <InputGroup 
            background='white' 
            color='rgb(33, 25, 22)'
            borderRadius='15px' 
            width={ isMobile ? '90%' : '30%'} 
        >
            <Input
                id='search-box'
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
    )

}