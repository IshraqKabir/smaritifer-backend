import React from "react";
import {
    Image,
    Flex,
    Box,
    Icon,
    Text,
    IconButton,
    Link
} from "@chakra-ui/core";
import url from "../../../url";

import Info from "./Info/Info";
import DeleteQuestion from "./DeleteQuestion/DeleteQuestion";

const Question = ({ question, provided, setQuestions }) => {
    return (
        <Flex alignItems="center">
            {/* it has to be passed on to
             a native element */}
            <div {...provided.dragHandleProps}>
                <Icon name="drag-handle" size="10px" />
            </div>
            <Box width="40%">
                <Text isTruncated={true}>{question.question}</Text>
            </Box>
            <Box width="20%">{question.marks}</Box>
            <Box width="20%">
                {question.image ? (
                    <Image
                        borderRadius="50%"
                        marginX="auto"
                        marginTop={2}
                        src={`${url}/storage/${question.image.image_link}`}
                        height="80px"
                        width="80px"
                        cursor="pointer"
                    />
                ) : null}
            </Box>
            <Flex marginLeft="auto">
                <IconButton size="sm" icon="edit" as={Link} marginRight={2} />
                <DeleteQuestion
                    question={question}
                    setQuestions={setQuestions}
                />
            </Flex>
        </Flex>
    );
};

export default Question;
