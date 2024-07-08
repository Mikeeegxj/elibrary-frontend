'use client'
import { Box, Button, Container, Select, Input, InputGroup, InputRightElement, Text, Grid, Spinner, VStack, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { IconSearch } from "@tabler/icons-react"
import BookCard from "@/components/book-card/BookCard"
import { FetchBooks } from "@/actions/book-actions"
export default function Elibrary({ resCat }) {
    const [categories, setCategories] = useState(null)
    const [isClient, setIsClient] = useState(false)
    const [searchInput, setSearchInput] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
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

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearchValue(searchInput)
        }
    }

    return isClient && (
        <Container maxW={"96em"} my={8}>
            <Box className='flex mt-20 flex-row flex-wrap justify-center gap-5'>
                <Button onClick={() => setSelectedCategory(null)} px={6} border={"1px solid #FFCE1A"} _hover={{ fontWeight: 800, transition: "all 0.5s ease" }} color={!selectedCategory ? "white" : "#FFCE1A"} bg={!selectedCategory ? "#FFCE1A" : "none"}  borderRadius={"20px"}>
                    All
                </Button>
                {
                    categories?.map((category) => (
                        <Button onClick={() => setSelectedCategory(category.id)} key={category.id} px={6} border={"1px solid #FFCE1A"} _hover={{ fontWeight: 800, transition: "all 0.5s ease" }} color={selectedCategory === category.id ? "white" : "#FFCE1A"} bg={selectedCategory === category.id ? "#FFCE1A" : "none"} borderRadius={"20px"}>
                            {category.name}
                        </Button>
                    ))
                }
            </Box>
            <HStack justifyContent={"space-between"} mt={9}>

                <Select value={selectedSort} maxW={"200px"} onChange={(e) => setSelectedSort(e.target.value)} placeholder="">
                    <option value="-created_at">Recent</option>
                    <option value="created_at">Older</option>
                    <option value="-view_count">Popular</option>
                    <option value="title">A to Z</option>
                    <option value="-title">Z to A</option>
                </Select>
                <InputGroup borderRadius={"25px"} background={"#EAEAEA"} maxW={"300px"}>
                    <Input value={searchInput} onChange={handleSearchInput} onKeyDown={handleKeyDown} placeholder='Search Your Books' />
                    <InputRightElement _hover={{ cursor: "pointer" }}>
                        <IconSearch />
                    </InputRightElement>
                </InputGroup>
            </HStack>
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