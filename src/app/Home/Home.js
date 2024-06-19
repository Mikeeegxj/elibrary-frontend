"use client"
import { Box, Stack, Text, Container, HStack, Image, VStack, Button } from "@chakra-ui/react"
import { montserrat, nunito_sans } from "../fonts"
export default function Home() {
    return (
        <Container maxW={"96em"} my={8}>
            <HStack flexDir={{base:"column", md:"row"}}>
                <VStack alignItems={"flex-start"} spacing={8} flex={1}>
                    <Text color={""} fontWeight={500} fontSize={{ base: "30px", md: "38px" }} className={`${montserrat.className}`}>
                        Welcome to E-Library Hub
                    </Text>
                    <Text lineHeight={"25px"} maxW={"550px"} fontSize={{ base: "14px", md: "16px" }} className={`${montserrat.className}`} >
                        It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone
                    </Text>
                    <Button color={"#fff"} bg="#FFCE1A" className={`${nunito_sans.className}`}>
                        Sign Up
                    </Button>
                </VStack>
                <VStack display={{base:"block", md:"block"}} width={"100%"} flex={1}>
                    <Image src={"/assets/coverbook.png"} />
                </VStack>
            </HStack>
        </Container>
    )
}