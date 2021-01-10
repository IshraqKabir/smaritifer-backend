import {
    Box,
    Input,
    Textarea,
    useToast,
    IconButton,
    AspectRatioBox,
    Image,
    Flex,
    Stack,
    Icon,
    Checkbox
} from "@chakra-ui/core";
import React, { useRef, useState, useEffect } from "react";
import deleteImageRequest from "../../../../../CustomFunctions/deleteImageRequest";

import post from "../../../../../CustomFunctions/post";
import uploadLogo from "../../../../../Icons/upload.svg";
import url from "../../../../../url";

import RemoveOption from "../RemoveOption";

const Option = ({
    option,
    setOptions,
    provided,
    questions,
    setDeletedOptions
}) => {
    const [title, setTitle] = useState(option.title);
    const [image, setImage] = useState(option.image);
    const [isRight, setIsRight] = useState(option.is_right);

    const toast = useToast();
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        setOptions(state => {
            let options = [...state];

            options = options.map(o => {
                if (o.id == option.id) {
                    return {
                        id: option.id,
                        title: title,
                        image: image,
                        is_right: isRight
                    };
                }
                return o;
            });

            return options;
        });
    }, [title, image, isRight]);

    const handleDelete = () => {
        setImage("");
        if (image) {
            const deleteCallBack = response => {};

            const deleteErrorCallBack = error => {};

            deleteImageRequest(
                image,
                questions,
                deleteCallBack,
                deleteErrorCallBack
            );
        }
    };

    const handleChange = e => {
        if (!validateImage(e.target.files)) {
            return;
        }

        const fd = new FormData();
        fd.append("image", e.target.files[0]);
        fd.append("model", "option");

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
        <Stack width="100%">
            <RemoveOption
                option={option}
                setOptions={setOptions}
                questions={questions}
                setImage={setImage}
                setDeletedOptions={setDeletedOptions}
            />
            <Box>
                <Flex alignItems="center">
                    <div {...provided.dragHandleProps}>
                        <Icon
                            name="drag-handle"
                            marginY="auto"
                            marginRight={2}
                        />
                    </div>
                    <Checkbox
                        isChecked={isRight}
                        onChange={() => setIsRight(!isRight)}
                        marginRight={2}
                        variantColor="green"
                    />
                    <Textarea
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Option Title"
                    />
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
                    <Input
                        id="question_image"
                        name="question_image"
                        display="none"
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                    />
                </Flex>
            </Box>
            {image ? (
                <Box marginTop={2} marginX="auto">
                    <IconButton
                        size="sm"
                        icon="edit"
                        position="relative"
                        float="right"
                        zIndex={1}
                        m={2}
                        onClick={e => hiddenFileInput.current.click()}
                    />
                    <IconButton
                        size="sm"
                        icon="close"
                        variantColor="red"
                        position="relative"
                        float="right"
                        zIndex={1}
                        m={2}
                        onClick={handleDelete}
                    />
                    <AspectRatioBox ratio={1 / 1} height="200px" width="200px">
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
        </Stack>
    );
};

export default Option;
