'use client';
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Divider, Container, VStack, Text, Input, InputGroup, InputRightElement,HStack } from "@chakra-ui/react";
import {oleo } from "../fonts";
import LoginBtn from "./LoginBtn";
import { IconEyeClosed, IconEye } from "@tabler/icons-react";
import { authStore } from "@/store/auth-store";

const Login = ({ LoginAccount }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordOnClick = () => setShowPassword(!showPassword);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const [isErrorMsg, setIsErrorMsg] = useState(null)

    const { setAuth, isAuth, setUserInfo } = authStore((state) => state);

    const router = useRouter()


    const handleLogin = async () => {
        setIsErrorMsg(null)
        const res = await LoginAccount(email, password);
        setIsLogin(res.success);
        if (res.success) {
            setAuth(true)
            const data = res.data
            setUserInfo({first_name:data.first_name,full_name:data.full_name,email:data.email,image:data.profile_image})
            router.refresh()
            router.push('/')
        } else {
            setIsErrorMsg(res.message)
        }
    }
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }


    return (
        <Box width={"100%"}>
            <Container display={"flex"} flexDir={"column"} alignItems={'center'} justifyContent={'center'} maxW="96em" h={"calc(100vh - 60px)"} >
            <Text color={"#FFA500"} fontSize={{ base: "28px", md: "40px" }} className={`${oleo.className}`} fontWeight={400}>
                    Welcome to E-library Hub!
                </Text>
                <Box borderRadius={"5px"} p={5} bg={"#fff"} maxW={"400px"} width={"100%"}>
                <form style={{width:"100%"}} action={() => handleLogin()}>
                    <VStack spacing={2}>
                    <Input onChange={handleEmailChange} bg={"#EEE"} borderRadius={10} paddingY={7} type='email' placeholder='Email' />

                    <InputGroup bg={"#EEE"} borderRadius={10}>
                                    <Input onChange={handlePasswordChange} placeholder='Password' paddingY={7} type={showPassword ? 'text' : 'password'} />
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
                            <Text color={"red"} minH={"14px"} fontSize={"12px"}>
                               {isErrorMsg}
                            </Text>
                            <LoginBtn />
                     
                        <HStack my={4} w="100%" textAlign="center" justifyContent={'center'} alignItems={'center'}>
                            <Divider />
                            <Text bg="white" px={2} fontSize="sm" fontWeight="medium" color="gray.500">or</Text>
                            <Divider />
                        </HStack>
                        <HStack>
                            <Text as={"a"} href="/signup" _hover={{ cursor: "pointer" }} fontWeight={700} color={"#FED238"}>
                                Sign Up
                            </Text>
                            <Text>
                                If you don't have an account!
                            </Text>
                        </HStack>
                    </VStack>
                    </form>
                </Box>
            </Container>
        </Box>
    )
}

export default Login