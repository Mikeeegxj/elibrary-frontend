"use client"
import { Box, Stack, Text, Container, HStack, Image, VStack, Button } from "@chakra-ui/react"
import { montserrat, nunito_sans } from "../fonts"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Book-swiper-styles.css';
import { Pagination } from 'swiper/modules';

import BookCard from "../components/book-card/BookCard";
export default function Home() {
    const books = [{
        name: "Really Good Actually",
        url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSychbQIpvpgPKGVx0r75hjROWLFWQrrmPYu3u37aEk5P0qrd9z3Kg5C9Ssd9WFPcPyVWTO1Uvd8ATcgnPRqAlVlg_HveBWI7fmnLn7xmY&usqp=CAE"
    },
    {
        name: "Educated",
        url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg"
    },
    {
        name: "Deathly Hallow",
        url: "https://images.booksense.com/images/221/010/9780545010221.jpg"
    },
    {
        name:"The Outsider",
        url: "https://m.media-amazon.com/images/I/71Bg39CmhoL._AC_UF350,350_QL50_.jpg"
    }
    ]
    return (
        <Container maxW={"96em"} my={8}>
            <HStack mb={12} flexDir={{ base: "column", md: "row" }}>
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
                        modules={[Pagination]}
                        className="mySwiper book-swiper"
                        style={{
                            paddingBottom: "30px",
                        }}
                    >
                        {
                            books.map((book, index) => (
                                <SwiperSlide key={index}> <BookCard book={book}/> </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </Box>
            </Box>
        </Container>
    )
}