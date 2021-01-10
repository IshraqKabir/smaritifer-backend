import {
    Box,
    FormLabel,
    Text,
    Input,
    useToast,
    IconButton,
    AspectRatioBox,
    Image,
    Flex
} from "@chakra-ui/core";
import React, { useRef } from "react";

import uploadLogo from "../../../../Icons/upload.svg"
import url from "../../../../url";
import post from "../../../../CustomFunctions/post"
import deleteRequest from "../../../../CustomFunctions/deleteRequest";

const QuestionImage = ({ image, setImage }) => {
    const toast = useToast();
    const hiddenFileInput = useRef(null);

    const handleDelete = () => {
                setImage("");
    };

    const handleChange = e => {
        if (!validateImage(e.target.files)) {
            return;
        }

        const fd = new FormData();
        fd.append("image", e.target.files[0]);
        fd.append("model", "question");

        if (image) {
            fd.append("prev_image_id", image.id);
        }

        const callBack = response => {
            setImage(response.data);
        };

        const errorCallBack = error => {
            console.log(error);
        };

        post(`${url}/api/image/store`, fd, callBack, errorCallBack, true);
    };

    const validateImage = value => {
        if (!value[0].type.includes("image")) {
            toast({
                title: "File Format Not Supported",
                description: "Only JPEG and PNG are supported",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return false;
        }

        if (value[0].size > 10000000) {
            toast({
                title: "Image Size Too Large",
                description: "Image cannot be more than 2 MB",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            return false;
        }

        return true;
    };

    return (
        <Box marginTop={2}>
            <FormLabel htmlFor="question_image" fontWeight="bold">
                <Flex alignItems="center">
                    <Text>Question Image</Text>
                    {image ? null : (
                        <Image
                            marginLeft={2}
                            src={uploadLogo}
                            height="20px"
                            width="20px"
                            name="question_image"
                            cursor="pointer"
                            onClick={e => hiddenFileInput.current.click()}
                        />
                    )}
                </Flex>
            </FormLabel>
            <Input
                id="question_image"
                name="question_image"
                display="none"
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
            />
            {image ? (
                <Box position="relative" marginTop={2}>
                    <IconButton
                        size="sm"
                        icon="edit"
                        position="relative"
                        float="left"
                        zIndex={2}
                        m={2}
                        onClick={e => hiddenFileInput.current.click()}
                    />
                    <IconButton
                        size="sm"
                        icon="close"
                        variantColor="red"
                        position="relative"
                        float="left"
                        zIndex={2}
                        m={2}
                        onClick={handleDelete}
                    />
                    <AspectRatioBox ratio={1 / 1} height="400px" width="400px">
                        <Image
                            src={`${url}/storage/${image.image_link}`}
                            key={`${url}/storage/${image.image_link}`}
                            zIndex={0}
                            alt="Quiz Image"
                            objectFit="cover"
                        />
                    </AspectRatioBox>
                </Box>
            ) : null}
        </Box>
    );
};

export default QuestionImage;
