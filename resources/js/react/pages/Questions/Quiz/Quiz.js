import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../../ItemTypes";

import { Text, Image, Flex, Box, Icon } from "@chakra-ui/core";
import url from "../../../url";

import Info from "./Info/Info";

const Quiz = ({ quiz, provided }) => {
    return (
        <Flex alignItems="center">
            {/* it has to be passed on to
             a native element */}
            <div {...provided.dragHandleProps}>
                <Icon name="drag-handle" size="10px" />
            </div>
            <Box width="20%">{quiz.title}</Box>
            <Box width="20%">{quiz.description}</Box>
            <Box width="20%" display={["none", "none", "none", "block"]}>
                {quiz.image ? (
                    <Image
                        borderRadius="50%"
                        marginX="auto"
                        marginTop={2}
                        src={`${url}/storage/${quiz.image.image_link}`}
                        height="80px"
                        width="80px"
                        cursor="pointer"
                    />
                ) : null}
            </Box>
            <Box width="20%" display={["none", "none", "none", "block"]}>
                {quiz.base_badge_image ? (
                    <Image
                        borderRadius="50%"
                        marginX="auto"
                        marginTop={2}
                        src={`${url}/storage/${quiz.base_badge_image.image_link}`}
                        height="80px"
                        width="80px"
                        cursor="pointer"
                    />
                ) : null}
            </Box>
            <Box width="15%" marginLeft="auto">
                <Info quiz={quiz} />
            </Box>
        </Flex>
    );
};

export default Quiz;
