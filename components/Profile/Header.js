import { useState } from "react";

import { Flex, Image, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useSizeContext from "../../hooks/useSizeContext";
import { valueToSimpleValue } from "../../utils/conversor";

export default function Header({profile, id}){

    const { isMobile } = useSizeContext();

    return(
        <Flex
            w='90%'
            justify='space-between'
            gap='20px'
        >
            <Flex
                justify='left'
                gap='20px'
            >
                {profile?.avatar_url ? 
                    <Image
                        src={profile?.avatar_url} 
                        borderRadius='50%'
                        h={ isMobile ? '80px' : '100px'}
                        alt='avatar'
                    />
                    :
                    <SkeletonCircle
                        h={ isMobile ? '80px' : '100px'}
                        w={ isMobile ? '80px' : '100px'}
                    />
                }
                <Flex
                    flexDir='column'
                    gap= { profile ? '0' : '5' }
                >   
                    {profile?.name ?
                        <Text
                            fontSize={isMobile ? '20px' : '30px'}
                        >
                            {profile?.name}
                        </Text>
                     :
                        <Skeleton
                            h={ isMobile ? '20px' : '30px' }
                            w={isMobile ? '150px' : '250px'}
                        />
                    }
                    
                    { profile ?
                        <Flex
                            align='center'
                            gap={ isMobile ? '15px' : '25px' }
                        >
                            <Flex
                                flexDir='column'
                                fontWeight='bold'
                            >
                                <Text 
                                    mb='-4px'
                                    opacity='0.8'
                                    fontSize={isMobile ? '14px' : '16px'}
                                > 
                                    {valueToSimpleValue(profile?.post_count)}
                                </Text>
                                <Text
                                    mt='-4px'
                                    opacity='0.5'
                                    fontSize={isMobile ? '12px' : '14px'}
                                >
                                    Posts
                                </Text>
                            </Flex>
                            <Flex
                                flexDir='column'
                                fontWeight='bold'
                            >
                                <Text 
                                    mb='-4px'
                                    opacity='0.8'
                                    fontSize={isMobile ? '14px' : '16px'}
                                > 
                                    {valueToSimpleValue(profile?.fans)}
                                </Text>
                                <Text
                                    mt='-4px'
                                    opacity='0.5'
                                    fontSize={isMobile ? '12px' : '14px'}
                                >
                                    Fans
                                </Text>
                            </Flex>
                        </Flex>
                        :
                        <Skeleton
                            h={isMobile ? '16px' : '25px'}
                            w={isMobile ? '40px' : '80px'}
                        />
                    }
                </Flex>
            </Flex>
            {(profile?.simple_id !== id  && profile) &&
                <Flex
                    h={ isMobile ? '30px' : '40px' }
                    w={ isMobile ? '100px' : '200px' }
                    justify='center'
                    align='center'
                    cursor='pointer'
                    borderRadius='5px'
                    transition='0.1s ease-in-out'
                    background='rgb(62, 49, 44)'
                    color='#FFFAFA'
                    _hover={{background:'#FFFAFA', color:'rgb(33, 25, 22)'}}
                    shadow='0px 1px 2px 0px rgba(0,0,0,0.45)'
                    gap='10px'
                    
                >
                    Follow
                </Flex>
            }
        </Flex>
    )
}
