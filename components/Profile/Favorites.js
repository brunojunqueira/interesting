import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { MdStar } from "react-icons/md"

export default function Favorites({profile}){
    return(
        <Flex
            w='100%'
            flexDir='column'
            gap='10px'
        >
            <Flex 
                pl='25px'
                align='center'
                gap='10px'
                fontSize='20px'
            >
                <Icon
                    as={ MdStar } 
                    color='#F4D35E'
                />
                Spotlight
            </Flex>
            <Flex
                w='100%'
                h='150px'
                background='#FFFAFA'
                boxShadow='inset 0px 5px 5px -5px #000000'
                justify='center'
                align='center'
                gap='5px'
            >
                {profile?.spotlight ? 
                    profile.spotlight.map((item, index) => {
                        return(
                            <Image
                                h='125px'
                                key={index}
                                alt='post image'
                            />
                        )
                    })
                    :
                    <Text>This user haven&apos;t a spotlight yet. </Text>
                }
            </Flex>
        </Flex>
    )
}