'use client'
import { Box, Container, Text, Grid, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { oleo } from "../fonts";
import BookCard from "@/components/book-card/BookCard";
import { FetchFavourites, FetchBooks } from "@/actions/book-actions";

export default function Favourite() {
    const [isClient, setIsClient] = useState(false);
    const [books, setBooks] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loadFavourites = async () => {
        try {
            const response = await FetchFavourites();
            if (response.success) {
                setFavourites(response.data);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    }

    useEffect(() => {
        const getBooks = async () => {
            setIsLoading(true);
            try {
                const res = await FetchBooks();
                if (res.success) {
                    setBooks(res.data);
                } else {
                    setIsError(true);
                }
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };

        getBooks();
        loadFavourites();
        setIsClient(true);
    }, []);

    const favouriteBookIds = favourites.map(fav => fav.resource);

    const filteredBooks = books.filter(book => favouriteBookIds.includes(book.id));

    return isClient && (
        <Container maxW={"96em"} my={8}>
            <VStack>
                <Text color={"#FFA500"} fontSize={{ base: "28px", md: "40px" }} className={`${oleo.className}`} fontWeight={400}>
                    FAVOURITE
                </Text>
            </VStack>
            {
                isError ? (
                    <Text>
                        Sorry, Please Refresh and Try Again!
                    </Text>
                ) : (
                    <>
                        {
                            isLoading ? (
                                <VStack mt={"100px"}>
                                    <Spinner />
                                </VStack>
                            ) : (
                                <Grid my={"60px"} sx={{
                                    gridTemplateColumns: { base: "repeat(1, 1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" },
                                    gap: { base: "10px", md: "10px" },
                                }}>
                                    {
                                        filteredBooks.length > 0 ? (
                                            filteredBooks.map((book) => (
                                                <BookCard book={book} key={book.id} />
                                            ))
                                        ) : (
                                            <Text>No favourites found</Text>
                                        )
                                    }
                                </Grid>
                            )
                        }
                    </>
                )
            }
        </Container>
    );
}
