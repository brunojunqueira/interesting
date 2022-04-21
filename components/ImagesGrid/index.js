import { supabase } from "../../utils/supabase";
import { useEffect } from 'react';

export default function ImagesGrid(){
    useEffect(() => {
        getImages();
    })

    async function getImages() {
        const { data, error } = await supabase
            .storage
            .from('public-posts')
            .list();
    }

    return(
        <>
        </>
    )
}