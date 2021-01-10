import React from "react";

import {
    Badge,
    Box,
    Flex,
    IconButton,
    Link,
    Stack,
    Text
} from "@chakra-ui/core";

import url from "../../../../url";
import DeleteQuiz from "../DeleteQuiz/DeleteQuiz";

const Info = ({ quiz, setQuizzes }) => {
    return (
        <Flex flexDirection="column">
            <Badge
                variantColor="green"
                variant="solid"
                as={Link}
                href={`${url}/quiz/${quiz.id.split("-")[1]}/questions`}
                marginBottom={2}
            >
                <Text fontSize={["8px", "10px", "12px"]}>Questions</Text>
            </Badge>
            <Flex justifyContent="space-between">
                <IconButton
                    size="sm"
                    icon="edit"
                    as={Link}
                    href={`${url}/quiz/${quiz.id.split("-")[1]}/edit`}
                />
                <DeleteQuiz quiz={quiz} setQuizzes={setQuizzes} />
            </Flex>
        </Flex>
    );
};

export default Info;
