import { Box, Flex } from "@chakra-ui/core";
import React from "react";

import CloneQuestion from "./CloneQuestion/CloneQuestion";
import DeleteQuestion from "./DeleteQuestion/DeleteQuestion";

const BottomBar = ({ question, questions, setQuestions }) => {
    return (
        <Box>
            <Flex alignItems="center" justifyContent="space-between">
                <CloneQuestion
                    question={question}
                    setQuestions={setQuestions}
                />
                <DeleteQuestion
                    question={question}
                    questions={questions}
                    setQuestions={setQuestions}
                />
            </Flex>
        </Box>
    );
};

export default BottomBar;
