"use client"
import { Container, HStack, Image, VStack, Text, Box, IconButton } from "@chakra-ui/react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { useEffect, useRef, useState } from "react";
import { IconUser, IconMail, IconCalendar, IconEdit, IconX } from "@tabler/icons-react";
import {nunito_sans } from "../fonts";
import ImageChangeBtn from "./ImageChangeBtn";
import { ChangeProfileImage } from "@/actions/auth-actions";
import { authStore } from "@/store/auth-store";

export default function Profile({ res }) {
    const [isClient, setIsClient] = useState(false)
    const [user, setUser] = useState(null)
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const joinDate = new Date(res.data.date_joined).toLocaleDateString('en-GB', options);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageFormData, setImageFormData] = useState(new FormData());
    const fileInputRef = useRef(null);
    const { userInfo, setUserInfo } = authStore((state) => state)

    const handleImageSubmit = async () => {
        console.log("here")
        const res = await ChangeProfileImage(imageFormData)
        if (res.success) {
            user.profile_image = res.data.profile_image

            let userStorage = userInfo
            userStorage.image = res.data.profile_image
            setUserInfo(userStorage)
            handleImageModalClose()
        }
    }

    const handleImageModalClose = () => {
        setIsImageModalOpen(false);
        setSelectedImage(null)
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        setSelectedImage(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append('profile_image', file);
        setImageFormData(formData);
        console.log(formData); // You can use this FormData object for further processing or sending to an API
    };
    useEffect(() => {
        if (res.success) {
            setUser(res.data)
        }
        setIsClient(true)
    }, [])
    return isClient && (
        <>
            <Container my={8} maxW={"96em"}>
                {user ? (
                    <>
                        <VStack mb={12} spacing={6}>
                            <Box pos={"relative"}>
                                <Image position={"relative"} border={{ base: "5px solid #FED238", md: "8px solid #FED238" }}
                                    borderRadius={"50%"}
                                    objectFit={"cover"}
                                    objectPosition={"center"}
                                    width={{ base: "100px", md: "250px" }}
                                    height={{ base: "100px", md: "250px" }}
                                    src={user.profile_image} />
                                <IconButton
                                    onClick={() => setIsImageModalOpen(true)}
                                    _hover={{ background: "none", color: "#FED238" }}
                                    minW={0} minHeight={0}
                                    background={"none"}
                                    pos={"absolute"}
                                    bottom={{ base: "-8px", md: "2px" }}
                                    right={{ base: "-10px", md: "2px" }}
                                    icon={<IconEdit />} />
                            </Box>
                            <VStack spacing={4} alignItems={"flex-start"}>
                                <HStack fontSize={{ base: "16px", md: "20px" }} gap={"40px"}>
                                    <IconUser />
                                    <Text className={`${nunito_sans.className}`} >
                                        {user.first_name} {user.last_name}
                                    </Text>
                                </HStack>
                                <HStack fontSize={{ base: "16px", md: "20px" }} gap={"40px"}>
                                    <IconMail />
                                    <Text className={`${nunito_sans.className}`} >
                                        {user.email}
                                    </Text>
                                </HStack>
                                <HStack fontSize={{ base: "16px", md: "20px" }} gap={"40px"}>
                                    <IconCalendar />
                                    <Text className={`${nunito_sans.className}`} >
                                        {joinDate} <spam style={{ color: "rgba(0,0,0,0.5)", fontSize: "16px" }}>(Joined)</spam>
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </>
                ) : (
                    <Box>Erro Fetching Data</Box>
                )}


            </Container>
            <Modal isCentered isOpen={isImageModalOpen} onClose={handleImageModalClose}>
                <ModalOverlay />
                <ModalContent position={"relative"} mx={2} alignItems={"center"} justifyContent={"center"} display={"flex"} flexDir={"column"}>
                    <IconButton onClick={handleImageModalClose} _hover={{ background: "none", color: "#3394d7" }} background={"none"} icon={<IconX />} top={"2px"} right={"2px"} pos={"absolute"} />
                    <ModalHeader>Choose Image</ModalHeader>
                    <ModalBody gap={"16px"} alignItems={"center"} justifyContent={"center"} width={"100%"} display={"flex"} flexDir={"column"}>
                        <Box textAlign="center">
                            <Image objectFit={"cover"} objectPosition={"center"} borderRadius={"50%"} width={"200px"} height={"200px"} src={selectedImage ? selectedImage : user.profile_image} alt="Selected Image" />
                        </Box>
                        <input accept=".jpg, .jpeg, .png" ref={fileInputRef} style={{ display: "none" }} type="file" onChange={handleImageChange} />
                        <Button onClick={handleButtonClick}>Choose Image</Button>
                    </ModalBody>
                    <ModalFooter>
                        <HStack spacing={8}>
                            <form action={() => handleImageSubmit()}>
                                <ImageChangeBtn selectedImage={selectedImage} />
                            </form>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}