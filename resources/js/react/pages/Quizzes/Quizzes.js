import React, { useEffect, useState } from "react";

import {
    Box,
    Stack,
    Divider,
    Text,
    Flex,
    Image,
    Icon,
    Button,
    Link
} from "@chakra-ui/core";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import get from "../../CustomFunctions/get";
import post from "../../CustomFunctions/post";

import url from "../../url";

import Quiz from "./Quiz/Quiz";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: "100%",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#f1f2f7",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#f1f2f7",
    padding: grid
});

const Quizzes = props => {
    const [quizzes, setQuizzes] = useState([]);

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        let temp_quizzes = [...quizzes];
        let quiz = temp_quizzes[startIndex];
        let quiz_id = quiz.id.slice(5);

        post(
            `${url}/api/quiz/${quiz_id}/set-serial/${temp_quizzes[endIndex].serial}`,
            {},
            response => {
                let quizzes = response.data.map(quiz => {
                    return { ...quiz, id: `item-${quiz.id}` };
                });
                setQuizzes(quizzes);
            },
            error => {}
        );

        return result;
    };

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newQuizzes = reorder(
            quizzes,
            result.source.index,
            result.destination.index
        );

        setQuizzes(newQuizzes);
    }

    useEffect(() => {
        const callBack = response => {
            let quizzes = response.data.map(quiz => {
                return { ...quiz, id: `item-${quiz.id}` };
            });
            setQuizzes(quizzes);
        };

        get(`${url}/api/quizzes`, {}, callBack, error => {});
    }, []);

    return (
        <Box bg="#f1f2f7" w="100%" minHeight="100vh" padding="20px">
            <Box bg="white" minHeight="100vh" padding="20px">
                <Stack>
                    <Flex justifyContent="space-between" flexDir="column">
                        <Text fontSize="lg" fontWeight="semibold">
                            All Quizzes
                        </Text>
                        <Button
                            size="sm"
                            as={Link}
                            href={`${url}/quiz/store`}
                            // width="100px"
                            marginTop="20px"
                            variantColor="green"
                        >
                            Add New Quiz
                        </Button>
                    </Flex>
                    <Divider color="#f1f2f7" />
                    {quizzes.length > 0 ? (
                        <Box
                            marginTop={10}
                            fontSize={["xs", "sm", "md"]}
                            fontSize={["xs", "sm", "md"]}
                            textAlign="center"
                        >
                            <Box
                                width="100%"
                                backgroundColor="#f1f2f7"
                                padding={2}
                                fontWeight="semibold"
                            >
                                <Flex alignItems="center">
                                    <Box width="20px"></Box>
                                    <Box width="20%">
                                        <Text>Title</Text>
                                    </Box>
                                    <Box width="20%">
                                        <Text>Description</Text>
                                    </Box>
                                    <Box
                                        width="20%"
                                        display={[
                                            "none",
                                            "none",
                                            "none",
                                            "inline-block"
                                        ]}
                                    >
                                        <Text>Image</Text>
                                    </Box>
                                    <Box
                                        width="20%"
                                        display={[
                                            "none",
                                            "none",
                                            "none",
                                            "inline-block"
                                        ]}
                                    >
                                        <Text>Base Badge</Text>
                                    </Box>
                                    <Box width="15%" marginLeft="auto"></Box>
                                </Flex>
                            </Box>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <Box
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(
                                                snapshot.isDraggingOver
                                            )}
                                        >
                                            {quizzes.map((quiz, index) => (
                                                <Draggable
                                                    key={quiz.id}
                                                    draggableId={quiz.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided
                                                                    .draggableProps
                                                                    .style
                                                            )}
                                                        >
                                                            <Quiz
                                                                provided={
                                                                    provided
                                                                }
                                                                quiz={quiz}
                                                                setQuizzes={setQuizzes}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Box>
                    ) : (
                        <Text color="red.500">No Quizzes Added Yet</Text>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default Quizzes;
