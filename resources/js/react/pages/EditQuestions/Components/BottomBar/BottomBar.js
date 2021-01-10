import { Box, Button, Flex } from "@chakra-ui/core";
import React from "react";

import AddQuestion from "./AddQuestion/AddQuestion";
import Edit from "./Edit/Edit";

const BottomBar = ({
    questions,
    setQuestions,
    deletedQuestions,
    deletedOptions
}) => {
    return (
        <Box
            position="fixed"
            bottom="0"
            left="0"
            width="100%"
            padding={4}
            backgroundColor="rgba(241,242,247, 0.7)"
            borderTop="1px solid grey"
            zIndex={3}
        >
            <Flex alignItems="center" flexWrap="wrap">
                <AddQuestion setQuestions={setQuestions} />
                <Flex alignItems="center" marginLeft="auto">
                    <Edit
                        questions={questions}
                        deletedQuestions={deletedQuestions}
                        deletedOptions={deletedOptions}
                    />
                </Flex>
            </Flex>
        </Box>
    );
};

export default BottomBar;
