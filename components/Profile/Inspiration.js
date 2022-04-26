import { Flex, Icon, Image, Text } from "@chakra-ui/react"
import { MdBrush } from "react-icons/md"

export default function Inspiration({profile}){
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
                    color='#584B45'
                    as={ MdBrush } 
                />
                Artists that inspires me...
            </Flex>
            <Flex
                w='100%'
                h='100px'
                background='#FFFAFA'
                boxShadow='inset 0px 5px 5px -5px #000000'
                justify='center'
                align='center'
                gap='5px'
            >
                {profile?.artists ? 
                    profile.artists.map((item, index) => {
                        return(
                            <Image
                                h='125px'
                                key={index}
                                alt='artist avatar'
                            />
                        )
                    })
                    :
                    <Text>This user haven&apos;t a inspiration yet. </Text>
                }
            </Flex>
        </Flex>
    )
}