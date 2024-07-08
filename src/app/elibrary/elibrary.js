'use client'
import { Box, Button, Container, Stack, Text, Grid, Spinner, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import BookCard from "@/components/book-card/BookCard"
import { FetchBooks } from "@/actions/book-actions"
export default function Elibrary({ resCat }) {
    const [categories, setCategories] = useState(null)
    const [isClient, setIsClient] = useState(false)
    const [searchInput, setSearchInput] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [selectedCategory, setSelectedCateogory] = useState(null)
    const [selectedSort, setSelectedSort] = useState(null)
    const [books, setBooks] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (resCat.success) {
            setCategories(resCat.data)
        }
        setIsClient(true)
    }, [])
    useEffect(() => {
        const getBooks = async () => {
            const res = await FetchBooks(searchValue, selectedCategory, selectedSort)
            if (res.success) {
                setBooks(res.data)
                console.log("book here ")
            } else {
                setIsError(true)
            }
            setIsLoading(false)
        }
        setIsLoading(true)
        getBooks()
    }, [selectedCategory, searchValue, selectedSort])
    return isClient && (
        <Container maxW={"96em"} my={8}>
            <Box className='flex mt-20 flex-row flex-wrap justify-center gap-5'>
                {
                    categories?.map((category) => (
                        <Button key={category.id} px={6} border={"1px solid #FFCE1A"} _hover={{ fontWeight: 800, transition: "all 0.5s ease" }} color={"#FFCE1A"} bg={"none"} borderRadius={"20px"}>
                            {category.name}
                        </Button>
                    ))
                }
            </Box>
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
                                        books?.map((book) => (
                                            <BookCard book={book} key={book.id} />
                                        ))
                                    }
                                </Grid>
                            )
                        }
                    </>
                )
            }

        </Container>
    )
}