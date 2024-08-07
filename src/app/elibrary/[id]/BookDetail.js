'use client'
import { poppins } from "@/app/fonts";
import { Container, InputRightElement, VStack, Image, Text, InputGroup, Textarea, HStack, Box, Stack, Button, IconButton } from "@chakra-ui/react";
import { decode } from 'html-entities';
import { useEffect, useState } from "react";
import { IconDownload, IconHeart } from "@tabler/icons-react";
import { IconHeartFilled, IconEye, IconSend2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { AddFavourite, FetchComments, FetchFavourites, RemoveFavourite, SubmitComment } from "@/actions/book-actions";
import { authStore } from '@/store/auth-store';
import Comment from "@/components/comment/Comment";
export default function BookDetail({ res }) {
    const [isClient, setIsClient] = useState(false)
    const [resource, setResource] = useState(null)
    const [comments, setComments] = useState(null)
    const [commentTxt, setCommentTxt] = useState('')
    const {isAuth } = authStore((state) => state);
    const [isFavourite,setIsFavourite] = useState(false)
    const router = useRouter()


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const loadComments = async (id) => {
        const response = await FetchComments(id)
        if (response.success) {
            setComments(response.data)
        }
    };

    const addFavourites = async () => {
        const response = await AddFavourite(resource.id);
        if (response.success) {
            setIsFavourite(true);
        }
    }

    const removeFavourites = async () => {
        const response = await RemoveFavourite(resource.id);
        if (response.success) {
            setIsFavourite(false);
        }
    }


    const loadFavourites = async (id) => {
        const response = await FetchFavourites();
        if (response.success) {
            console.log("Fav success")
            // Check if any object in the array has a resource value of 4
            const hasFavouriteResource = response.data?.some(item => item.resource === id);
            setIsFavourite(hasFavouriteResource);
        }
    }

    useEffect(() => {
        if (res.success) {
            setResource(res.data)
            loadComments(res.data.id)
            console.log("Auth", isAuth)
            if(isAuth) {
                loadFavourites(res.data.id)
            }
        }
        setIsClient(true)
    }, [isAuth])




    const handleTextOnChange = (e) => {
        e.preventDefault()
        setCommentTxt(e.target.value)
    }


    const handleSubmitComment = async () => {
        if (!commentTxt) {
            return
        }
        const response = await SubmitComment(resource.id, commentTxt)
        if (response.success) {
            setCommentTxt('')
            loadComments(resource.id)
        }

    }
    // const decodedHtml = decode(content.content);
    return isClient && (
        <Container my={14} maxW={"96em"}>
            <HStack>
                <Stack spacing={{ base: 6, md: 3 }} flexDir={{ base: "column", md: "row" }} width={"100%"} alignItems={'flex-start'}>
                    <VStack spacing={3} flex={{ base: 1.5, lg: 1 }} width={"100%"}>
                        <Image flexGrow={1} borderRadius={"12px"} src={resource.image_file}
                            height={"400px"} width={"fit-content"} objectFit={"cover"} bgColor={"#3394d7"} objectPosition={"center"} />
                        <Button as={"a"} href={resource.file} target="_blank" _hover={{ opacity: "0.7" }} bg={"#FED238"} color={"#fff"} rightIcon={<IconDownload />} width={"280px"}>
                            Download
                        </Button>
                    </VStack>

                    <VStack px={2} justifyContent={"flex-start"} alignItems={"flex-start"} flex={3}>
                        <HStack alignItems={"center"} width={"100%"} justifyContent={"space-between"}>
                            <Text fontSize={{ base: "18px", md: "24px" }} fontWeight={600} sx={{ overflowWrap: 'break-word' }}>
                                {resource.title}
                            </Text>
                        </HStack>
                        <Text color={"rgba(0,0,0,0.6)"} fontSize={{ base: "16px", md: "18px" }} className={`${poppins.className}`} fontWeight={500} sx={{ overflowWrap: 'break-word' }}>
                            {resource.author}
                        </Text>
                        <HStack alignItems={"center"} width={"100%"} justifyContent={"space-between"}>
                            <HStack spacing={{ base: 2, md: 4 }} justifyContent={"flex-start"}>
                                <Text color={"#97989F"} fontSize={{ base: "12px", md: "14px" }}>
                                    Last Update - {formatDate(resource.created_at)}
                                </Text>
                            </HStack>
                            <HStack display={{ base: "flex", md: "flex" }} alignItems={"center"} spacing={{ base: 2, md: 4 }} justifyContent={"center"}>
                                {
                                    isAuth && (
                                    <Box width={{ base: "24px", md: "28px" }} height={{ base: "24px", md: "28px" }}>
                                        {
                                            isFavourite ? (
                                                <IconHeartFilled style={{ width: "inherit", height: "inherit", cursor:"pointer" }} color="#FF5480" onClick={removeFavourites} />
                                            ) : (
                                                <IconHeart style={{ width: "inherit", height: "inherit", cursor:"pointer" }}  onClick={addFavourites} />
                                            )
                                        }
                                        
                                    </Box>
                                    )
                                }
                                <Box width={{ base: "24px", md: "28px" }} height={{ base: "24px", md: "28px" }}>
                                    <IconEye style={{ width: "inherit", height: "inherit" }} />
                                </Box>
                                <Text color={"#97989F"} fontSize={"14px"} >
                                    {resource.view_count}
                                </Text>
                            </HStack>
                        </HStack>
                        <Box lineHeight={"28px"} fontSize={{ base: "14px", md: "16px" }} sx={{ overflowWrap: 'break-word' }}>
                            <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: decode(resource.content) }} />
                        </Box>

                    </VStack>
                </Stack>
            </HStack>
            <Text my={10} fontSize={{ base: "22px", md: "26px" }}>
                Comments
            </Text>
            <Box width={"100%"} maxW={"600px"}>
                <Box overflowY={"auto"} maxH={"500px"} width={"100%"} maxW={"600px"}
                    overflowX={"hidden"}
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '3px',
                        },
                        '&::-webkit-scrollbar-track': {
                            width: '5px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'darkgrey',
                            outline: '1px solid slategrey',
                        },
                    }}

                >
                    {
                        comments?.map((comment, index) => (
                            <Comment key={index} comment={comment} />
                        ))
                    }
                    {
                        (comments?.length < 1) && (
                            <Text ml={2} color={"rgba(0,0,0,0.5)"} mb={5}> No Answer</Text>
                        )
                    }


                </Box>
                <InputGroup>
                    <Textarea
                        value={commentTxt}
                        onChange={handleTextOnChange}
                        placeholder='Write Comment'
                        resize="vertical" // Allows vertical resize
                    />
                    <InputRightElement onClick={() => handleSubmitComment()} _hover={{ cursor: "pointer", color: "#3394d7" }}>
                        <IconSend2 />
                    </InputRightElement>
                </InputGroup>
            </Box>
        </Container>
    )
}