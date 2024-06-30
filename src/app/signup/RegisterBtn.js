'use client';
import { Button, Spinner } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";
const RegisterBtn = () => {
    const { pending } = useFormStatus();
    return (

        <Button type="submit" my={3} py={7} width={"100%"} bg={"#FED238"} color={"#fff"} fontWeight={700} _hover={{ background: "#ffe070", color: "#fff" }}>
             {pending ? <Spinner /> : 'Sign Up'}
        </Button>
    )
}

export default RegisterBtn