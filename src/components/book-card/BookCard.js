"use client";
import { montserrat, nunito_sans, poppins, roboto, work_sans } from "@/app/fonts";
import { Box, Text, Badge, VStack, Image, HStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IconHeart } from "@tabler/icons-react";
export default function BookCard({book}) {
    const router = useRouter()
    return (
        <Box transition={"all 0.2s ease-in"} _hover={{ cursor: "pointer", transition: "all 0.2s ease-in", transform: "scale(1.02)" }} borderRadius={"10px"} width={"100%"} boxShadow={"0px 0px 6px -1px rgba(196,196,196,0.75)"}>
            <HStack alignItems={"flex-end"} spacing={1} p={5}>
                <Image borderRadius={"12px"} src={book.image_file}
                    height={"280px"} width={"100%"} objectFit={"contain"} objectPosition={"center"} />
                <VStack alignItems={"flex-start"} height={"100%"} width={"100%"} px={3} spacing={1}>
                    {/* <Badge mb={2} bg={"#3394d7"} fontSize={"10px"} padding={1} variant="solid" borderRadius={"5px"} colorScheme='green'> Nice</Badge> */}
                    <Text color={"#0D0842"} fontSize={"16px"} className={`${montserrat.className}`} fontWeight={400} noOfLines={1} overflow={"hidden"} sx={{ overflowWrap: 'break-word' }}>
                        {book.title}
                    </Text>
                    <Text color={"#0D0842"} opacity={"0.6"} fontSize={"14px"} className={`${nunito_sans.className}`} fontWeight={400} noOfLines={3} overflow={"hidden"} sx={{ overflowWrap: 'break-word' }}>
                        ~{book.author}
                    </Text>
                    <Text my={3} color={"#0D0842"} fontSize={"14px"} className={`${nunito_sans.className}`} fontWeight={400} noOfLines={3} overflow={"hidden"} sx={{ overflowWrap: 'break-word' }}>
                        {book.content}
                    </Text>
                    <Button onClick={() => router.push(`/elibrary/${book.id}`)} color={"white"} bg={"#FFCE1A"}>
                        Read
                    </Button>
                </VStack>
            </HStack>

        </Box>
    )
}