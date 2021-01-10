import React, { useState } from "react";
import { IconButton } from "@chakra-ui/core";

import {
    Button,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useToast
} from "@chakra-ui/core";
import deleteRequest from "../../../../CustomFunctions/deleteRequest";
import url from "../../../../url";

const DeleteQuiz = ({ quiz, setQuizzes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const toast = useToast();

    const open = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    const deleteHandler = () => {
        setIsSending(true);

        const data = {};

        const callBack = response => {
            setIsSending(false);

            close();

            toast({
                title: "Quiz Deleted Succesfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });

            setQuizzes(quizzes => quizzes.filter(q => q.id != quiz.id));
        };

        const errorCallBack = error => {
            return;
        };

        deleteRequest (
           `${url}/api/quiz/${quiz.id.split("-")[1]}/delete`,
           data,
           callBack,
           errorCallBack
        )
    };

    return (
        <Popover
            returnFocusOnClose={false}
            isOpen={isOpen}
            onClose={close}
            placement="right"
        >
            <PopoverTrigger>
                <IconButton
                    size="sm"
                    icon="delete"
                    color="red.500"
                    onClick={open}
                />
            </PopoverTrigger>
            <PopoverContent zIndex={4}>
                <PopoverHeader>Cofirm Delete</PopoverHeader>
                <PopoverBody>
                    <Flex direction="column">
                        <Text>Are you sure you want to delete this Quiz?</Text>
                        <Flex>
                            <Button
                                variantColor="red"
                                size="sm"
                                marginRight={2}
                                onClick={deleteHandler}
                                isLoading={isSending}
                                isLoadingText="Deleting"
                            >
                                Yes
                            </Button>
                            <Button
                                variantColor="green"
                                size="sm"
                                onClick={close}
                            >
                                No
                            </Button>
                        </Flex>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default DeleteQuiz;
