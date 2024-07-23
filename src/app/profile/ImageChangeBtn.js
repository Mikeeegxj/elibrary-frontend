'use client';
import { Button, Spinner } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";
const ImageChangeBtn = ({selectedImage}) => {
    const { pending } = useFormStatus();
    return (

        <Button type="submit" _hover={{opacity:"0.7"}} color={"#fff"} background={"#FED238"} isDisabled={!selectedImage}>
             {pending ? <Spinner /> : 'Done'}
        </Button>
    )
}

export default ImageChangeBtn