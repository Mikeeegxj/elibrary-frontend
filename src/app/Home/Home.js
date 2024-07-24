"use client"
import { Box, Stack, Text, Container, HStack, Image, VStack, Button, Spinner } from "@chakra-ui/react"
import { montserrat, nunito_sans } from "../fonts"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Book-swiper-styles.css';
import { Pagination, Autoplay } from 'swiper/modules';
import { useRouter } from "next/navigation";

import BookCard from "@/components/book-card/BookCard";
import { useEffect, useState } from "react";
import { FetchBooks } from "@/actions/book-actions";
export default function Home() {
    const router = useRouter();
    const [books, setBooks] = useState(null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        const getBooks = async () => {
            const res = await FetchBooks("","","-view_count")
            if(res.success) {
                setBooks(res.data)
            }
            setIsClient(true)
        }
        getBooks()
    },[])

    return isClient ? (
        <Container maxW={"96em"} my={8}>
            <HStack mb={12} flexDir={{ base: "column", md: "row" }}>
                <VStack alignItems={"flex-start"} spacing={8} flex={1}>
                    <Text color={""} fontWeight={500} fontSize={{ base: "30px", md: "38px" }} className={`${montserrat.className}`}>
                        Welcome to E-Library Hub
                    </Text>
                    <Text lineHeight={"25px"} maxW={"550px"} fontSize={{ base: "14px", md: "16px" }} className={`${montserrat.className}`} >
                        It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone
                    </Text>
                    <Button color={"#fff"} bg="#FFCE1A" onClick={()=> router.push("/signup")} className={`${nunito_sans.className}`}>
                        Sign Up
                    </Button>
                </VStack>
                <VStack display={{ base: "block", md: "block" }} width={"100%"} flex={1}>
                    <Image src={"/assets/coverbook.png"} />
                </VStack>
            </HStack>
            <Box>
                <Text className={`${montserrat.className}`} fontWeight={400} fontSize={{ base: "20px", md: "24px" }}>
                    Top Books
                </Text>
                <Box width={"100%"} height={"100%"}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            loop: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1000: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1800: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper book-swiper"
                        style={{
                            paddingBottom: "30px",
                        }}
                    >
                        {
                             books?.slice(0, 6).map((book, index) => (
                                <SwiperSlide key={index}> <BookCard book={book}/> </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Box>
            </Box>
        </Container>
    ) : (
        <VStack justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
              <Spinner />
        </VStack>
      
    )
}