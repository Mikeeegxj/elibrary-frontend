'use client';
import { Button, Spinner } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";
const VerifyBtn = () => {
    const { pending } = useFormStatus();
    return (

        <Button type="submit" _hover={{ background: "#ffe070" }} color={"#fff"} bg={"#FED238"}>
             {pending ? <Spinner /> : 'Verify'}
        </Button>
    )
}

export default VerifyBtn