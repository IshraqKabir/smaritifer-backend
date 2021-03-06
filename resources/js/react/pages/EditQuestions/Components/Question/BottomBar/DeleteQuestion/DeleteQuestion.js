import { Icon } from "@chakra-ui/core";
import React from "react";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    ButtonGroup
} from "@chakra-ui/core";
import deleteImageReq from "../../../../../../CustomFunctions/deleteImageRequest";

const DeleteQuestion = ({
    question,
    questions,
    setQuestions,
    setDeletedQuestions,
    setDeletedOptions,
    options
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const open = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    const handleClick = () => {
        // setting questions to delete
        if (question.id.split("-")[0] != "new") {
            setDeletedQuestions(questions => {
                return [
                    ...questions,
                    parseInt(
                        question.id.split("-")[
                            question.id.split("-").length - 1
                        ]
                    )
                ];
            });
        }

        // removing the question from the ui
        setQuestions(questions => questions.filter(q => q.id != question.id));
    };

    return (
        <>
            <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={close}
                placement="right"
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <Icon
                        name="delete"
                        cursor="pointer"
                        color="red.500"
                        size="25px"
                        onClick={open}
                        marginRight={2}
                    />
                </PopoverTrigger>
                <PopoverContent zIndex={4}>
                    <PopoverHeader fontWeight="semibold">
                        Confirmation
                    </PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        Are you sure you want to delete this question?
                    </PopoverBody>
                    <PopoverFooter d="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                            <Button variant="outline" onClick={close}>
                                Cancel
                            </Button>
                            <Button
                                variantColor="red"
                                onClick={() => {
                                    handleClick();
                                    close();
                                }}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default DeleteQuestion;
