import {
    Box,
    FormLabel,
    Text,
    Input,
    useToast,
    Button,
    IconButton,
    AspectRatioBox,
    Image,
    Flex
} from "@chakra-ui/core";
import React, { useRef } from "react";
import deleteRequest from "../../../CustomFunctions/deleteRequest";

import post from "../../../CustomFunctions/post";
import url from "../../../url";

import uploadLogo from "../../../Icons/upload.svg";

const QuizImage = ({ image, setImage, error }) => {
    const toast = useToast();
    const hiddenFileInput = useRef(null);

    const handleDelete = () => {
        setImage("");
        // if (image) {
        //     const deleteCallBack = response => {};

        //     const deleteErrorCallBack = error => {};

        //     deleteRequest(
        //         `${url}/api/image/${image.id}/delete`,
        //         {},
        //         deleteCallBack,
        //         deleteErrorCallBack
        //     );
        // }
    };

    const handleChange = e => {
        if (!validateImage(e.target.files)) {
            return;
        }

        const fd = new FormData();
        fd.append("image", e.target.files[0]);
        fd.append("model", "quiz");

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
            <FormLabel htmlFor="quiz_image" fontWeight="bold">
                <Flex alignItems="center">
                    <Text>Quiz Image</Text>
                    {image ? null : (
                        <Image
                            marginLeft={2}
                            src={uploadLogo}
                            height="20px"
                            width="20px"
                            cursor="pointer"
                            onClick={e => hiddenFileInput.current.click()}
                        />
                    )}
                </Flex>
            </FormLabel>
            <Input
                id="quiz_image"
                name="quiz_image"
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
            {error ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    JPG/PNG Format Image Is Required
                </Text>
            ) : null}
        </Box>
    );
};

export default QuizImage;
