'use client'
import { useRouter } from "next/navigation"
import { oleo, poppins, roboto } from "@/app/fonts"
import { Box, Container, VStack, Text, Button } from "@chakra-ui/react"
import { IconMailCheck, IconMail, IconMailCancel } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import VerifyBtn from "./VerifyBtn"
export default function Verificaiton({ VerifyEmail, otp }) {
    const [isClient, setIsClient] = useState(false)
    const [isVerifyClicked, setIsVerifyClicked] = useState(false)
    const [isVerified, setISVerified] = useState(false)
    const handleVerifyOnClick = async (e) => {
        const response = await VerifyEmail(otp)
        setISVerified(response)
        setIsVerifyClicked(true)
    }
    const router = useRouter()
    useEffect(() => {
        setIsClient(true)
    }, [])
    return isClient && (
        <Box width={"100%"}>
            <Container display={"flex"} alignItems={'center'} justifyContent={'center'} maxW="96em" h={"calc(100vh - 60px)"} >
                <Box borderRadius={"5px"} p={5} bg={"#fff"} width={"100%"}>
                    <VStack spacing={5}>
                        {
                            isVerifyClicked ? isVerified ? (
                                <>
                                    <IconMailCheck color="#FFA500" size={"120px"}/>
                                    <Text textAlign={"center"} fontSize={"28px"} className={`${oleo.className}`}>
                                        Your Email has been Verified
                                    </Text>
                                    <Button onClick={() => router.push('/login')} _hover={{ background: "#ffe070" }} color={"#fff"} bg={"#FED238"}>
                                        Login
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <IconMailCancel color="#FFA500" size={"120px"}/>
                                    <Text className={`${poppins.className}`}>
                                        Your Verificaiton Code has been expired!
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <IconMail color="#FFA500" size={"120px"} />
                                    <Text textAlign={"center"} fontSize={"28px"} className={`${oleo.className}`}>
                                        Please Verify Your Email
                                    </Text>
                                    <form action={() => handleVerifyOnClick()}>
                                       <VerifyBtn />
                                    </form>
                                </>
                            )
                        }

                    </VStack>
                </Box>
            </Container>
        </Box>
    )

}