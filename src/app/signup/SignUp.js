'use client';
import { useState } from "react";
import { Box, Divider, Container, VStack, Text, Input, InputGroup, InputLeftElement, InputRightElement, Button, HStack } from "@chakra-ui/react";
import { inter, oleo, poppins } from "../fonts";
import { IconMail, IconUserCircle, IconLockCheck, IconLock, IconEyeClosed, IconEye, IconUser } from "@tabler/icons-react";
import RegisterBtn from "./RegisterBtn";
const SignUp = ({ RegisterAccount }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [isRegistered, setIsRegistered] = useState(false)
    const [isErrorMsg, setIsErrorMsg] = useState(null)

    const handleEmailOnChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordOnChange = (e) => {
        setPassword(e.target.value)
    }
    const handleConfirmPasswordOnChange = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleFirstNameOnChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameOnChange = (e) => {
        setLastName(e.target.value)
    }

    const handleRegisterOnClick = async (e) => {
        if (email && firstName && lastName && password && confirmPassword) {
            if (password === confirmPassword) {
                const response = await RegisterAccount(email, firstName, lastName, password)

                if (response.success) {
                    setIsRegistered(true)
                } else {
                    setIsErrorMsg(response.message)
                }
            } else {
                setIsErrorMsg("Password does not match")
            }
        } else {
            setIsErrorMsg("Please provide all the information")
        }




    }

    const handlePasswordOnClick = () => setShowPassword(!showPassword);
    return (
        <Box width={"100%"}>
            <Container display={"flex"} flexDir={"column"} alignItems={'center'} justifyContent={'center'} maxW="96em" h={"calc(100vh - 60px)"} >
                <Text color={"#FFA500"} display={isRegistered ? "block" : "none"} fontSize={{ base: "28px", md: "40px" }} className={`${oleo.className}`} fontWeight={400}>
                    Welcome to E-library Hub!
                </Text>
                <Box borderRadius={"5px"} p={5} bg={"#fff"} maxW={"400px"} width={"100%"}>
                    {true ? (
                        <>
                          
                            <VStack spacing={4}>
                            <Text  fontSize={{ base: "28px", md: "30px" }} className={`${oleo.className}`} fontWeight={400}>
                                Verification Mail Sent!
                            </Text>
                                <IconMail color={"#FFA500"} size={"100px"} />
                                <Text className={`${poppins.className}`}>
                                    Please Check Your Email
                                </Text>
                            </VStack>
                        </>
                    ) : (
                        <form style={{ width: "100%" }} action={() => handleRegisterOnClick()}>
                            <VStack spacing={6}>


                                <Input onChange={handleFirstNameOnChange} bg={"#EEE"} borderRadius={10} paddingY={7} type='text' placeholder='First Name' />

                                <Input onChange={handleLastNameOnChange} bg={"#EEE"} borderRadius={10} paddingY={7} type='text' placeholder='Last Name' />


                                <Input onChange={handleEmailOnChange} bg={"#EEE"} borderRadius={10} paddingY={7} type='email' placeholder='Email' />


                                <InputGroup bg={"#EEE"} borderRadius={10}>
                                    <Input onChange={handlePasswordOnChange} placeholder='Password' paddingY={7} type={showPassword ? 'text' : 'password'} />
                                    <InputRightElement
                                        color='gray.300'
                                        fontSize='1.2em'
                                        onClick={handlePasswordOnClick}
                                        paddingY={7}
                                        _hover={{ cursor: "pointer" }}
                                    >
                                        {
                                            showPassword ?
                                                (<IconEye />) : (<IconEyeClosed />)
                                        }
                                    </InputRightElement>
                                </InputGroup>

                                <Input onChange={handleConfirmPasswordOnChange} bg={"#EEE"} borderRadius={10} paddingY={7} placeholder='Confirm Password' type={showPassword ? 'text' : 'password'} />
                                ß
                                <VStack width={"100%"}>
                                    <Text color={"red"} minH={"15px"} fontSize={"12px"}>
                                        {isErrorMsg}
                                    </Text>
                                    <RegisterBtn />
                                </VStack>

                                <HStack w="100%" textAlign="center" justifyContent={'center'} alignItems={'center'}>
                                    <Divider />
                                    <Text bg="white" px={2} fontSize="sm" fontWeight="medium" color="gray.500">or</Text>
                                    <Divider />
                                </HStack>
                                <HStack>
                                    <Text as={"a"} href="/login" _hover={{ cursor: "pointer", color: "#ffe070" }} fontWeight={700} color={"#FED238"}>
                                        Login
                                    </Text>
                                    <Text>
                                        If you already have an account!
                                    </Text>
                                </HStack>
                            </VStack>
                        </form>
                    )}

                </Box>
            </Container>
        </Box>
    )
}

export default SignUp