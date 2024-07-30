"use client";
import { Box, Text, Badge, VStack, Image, HStack, Divider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { open_sans } from "@/app/fonts";
import { format, parseISO } from 'date-fns';
export default function Comment ({comment}) {
    const router = useRouter()
    function formatDate(dateString) {
        const parsedDate = parseISO(dateString);
        return format(parsedDate, "MMMM d, yyyy 'at' h:mm a");
      }
      
    return (
        <Box mb={4}>
        <HStack mb={{ base: 6, md: 9 }} justifyContent={"flex-start"} w={"100%"} spacing={{ base: 4, md: 6 }} align="top">
            <Box w={{ base: "35px", md: "45px" }} h={{ base: "35px", md: "45px" }} minW={25} rounded={"50%"} backgroundPosition={"center"} backgroundImage={`url('https://www.connectjcu.club/media/${comment.author.profile_image}')`} backgroundSize={"cover"} />
            <VStack alignItems={"flex-start"} spacing={{ base: 2, md: 4 }} flex={1}>
                <HStack spacing={4}>
                    <Text fontSize={{ base: "14px", md: "18px" }} fontWeight={500}>
                        {comment.author.full_name}
                    </Text>
                    <Text color={"rgba(0,0,0,0.5)"} fontSize={{ base: "12px", md: "16px" }} fontWeight={500}>
                        {formatDate(comment.created_at)}
                    </Text>
                </HStack>

                <Text fontSize={{ base: "12px", md: "16px" }} width={"100%"} sx={{ overflowWrap: 'break-word', wordBreak: "break-all" }}>
                    {comment.text}
                </Text>
            </VStack>
        </HStack>
        <Divider borderWidth={"1px"} />
    </Box>
    )
}