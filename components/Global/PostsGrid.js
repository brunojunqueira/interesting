import { useEffect, useState } from 'react';
import { getPostsFromUser, getPostsInRange } from '../../utils/requests';
import useSizeContext from "../../hooks/useSizeContext";

import { Flex, Text } from '@chakra-ui/react';
import ImageModal from '../PostsGrid/PostModal';
import Post from '../PostsGrid/Post';


export default function PostsGrid({size, user = null}){

    const { isMobile } = useSizeContext();

    const [range, setRange] = useState(0);
    const [columns, setColumns] = useState(null);
    const [loading, setLoading] = useState(true);
    const [src, setSrc] = useState(null);

    useEffect(()=>{

        /**
        *  Load posts in range.
        */
        async function getPosts(){
            const result = user ? await getPostsFromUser(user) : await getPostsInRange(range, range+100);
            if(result) getColumns(result);
        }

        /**
        * Arrange the columns with posts loaded.
        */
        function getColumns(posts){
            
            let rest = posts.length%size;
            let chunkSize = (posts.length-rest)/size;

            let res = [];

            while (posts?.length > 0) {
                const chunk = posts.splice(0, rest ? chunkSize + 1 : chunkSize);
                res.push(chunk);
                rest--;
            }
            setColumns(res);
        }

        /**
         * Check it if the page are half scrolled and load more posts.
         */
        function checkAndLoad(){
            if(scrollY >= screen.availHeight){
                if(!loading){
                    setLoading(true);
                    setRange(prev => prev + 100);
                }
            }
        }

        getPosts();

        document.addEventListener('scroll', checkAndLoad);

        return(()=>{
            document.removeEventListener('scroll', checkAndLoad);
        })

    }, [range, size, user, loading])

    function openModal(src){
        setSrc(src);
    }

    return(
        <Flex
            as={Flex}
            w='90%'
            gap='25px'
            justify='center'
        >
            {!columns && 
            <Text>There&apos;s no posts yet.</Text>}
            {columns?.map((column, i)=>{
                return(
                    <Flex
                        key={i}
                        flexDir='column'
                        gap='15px'
                        w={ isMobile ? '100%' : (100/size)+"%"}
                        align='center'
                    >   
                        {column?.map((post, index) => {
                            return(
                                <Post 
                                    onLoad={()=>{(i === (columns?.length-1) && index === (column?.length-1)) && setLoading(false) }} 
                                    key={index} 
                                    post={post} 
                                    loading={loading} 
                                    openModal={openModal}
                                />
                            )
                        })}
                    </Flex>
                )
            })}
            <ImageModal src={src} />
        </Flex>    
    )
}