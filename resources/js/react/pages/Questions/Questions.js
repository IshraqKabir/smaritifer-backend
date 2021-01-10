import React, { useEffect, useState } from "react";

import {
    Box,
    Stack,
    Divider,
    Text,
    Flex,
    Image,
    Icon,
    Heading,
    Button,
    Link
} from "@chakra-ui/core";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import get from "../../CustomFunctions/get";
import post from "../../CustomFunctions/post";

import url from "../../url";

import Question from "./Question/Question";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: "100%",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#f1f2f7",
    padding: grid
});

const Questions = props => {
    const [questions, setQuestions] = useState([]);

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        let temp_quizzes = [...questions];
        let question = temp_quizzes[startIndex];
        let question_id = question.id.slice(5);

        post(
            `${url}/api/question/${question_id}/set-serial/${temp_quizzes[endIndex].serial}`,
            {},
            response => {
                let quizzes = response.data.map(quiz => {
                    return { ...quiz, id: `item-${quiz.id}` };
                });
                setQuestions(quizzes);
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

        const newQuestions = reorder(
            questions,
            result.source.index,
            result.destination.index
        );

        setQuestions(newQuestions);
    }

    useEffect(() => {
        const callBack = response => {
            let questions = response.data.map(question => {
                return { ...question, id: `item-${question.id}` };
            });
            setQuestions(questions);
        };

        get(`${url}/api/quiz/${quiz.id}/questions`, {}, callBack, error => {});
    }, []);

    return (
        <Box bg="#f1f2f7" w="100%" minHeight="100vh" padding={[0, 1, 2, 4]}>
            <Box minHeight="100vh">
                <Stack>
                    <Box
                        bg="white"
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="10px"
                        backgroundColor="black"
                    >
                        <Box height="10px"></Box>
                        <Box
                            padding={4}
                            backgroundColor="white"
                            borderBottomLeftRadius="9px"
                            borderBottomRightRadius="9px"
                        >
                            <Heading marginBottom={2} size="lg">
                                {quiz.title}
                            </Heading>
                            <Text fontSize="mg" color="grey" marginBottom={5}>
                                {quiz.description}
                            </Text>
                            <Button
                                size="xs"
                                variantColor="green"
                                marginRight={2}
                                as={Link}
                                href={`${url}/quiz/${quiz.id}/questions/store`}
                            >
                                Add Questions
                            </Button>
                            <Button
                                size="xs"
                                variantColor="green"
                                as={Link}
                                href={`${url}/quiz/${quiz.id}/questions/edit`}
                            >
                                Edit Questions
                            </Button>
                        </Box>
                    </Box>
                    {questions.length > 1 ? (
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
                                    <Box width="40%">
                                        <Text>Question</Text>
                                    </Box>
                                    <Box width="20%">
                                        <Text>Marks</Text>
                                    </Box>
                                    <Box width="20%">
                                        <Text>Image</Text>
                                    </Box>
                                    {/* <Box width="15%" marginLeft="auto">
                                        <Text>Info</Text>
                                    </Box> */}
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
                                            {questions.map(
                                                (question, index) => (
                                                    <Draggable
                                                        key={question.id}
                                                        draggableId={
                                                            question.id
                                                        }
                                                        index={index}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
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
                                                                <Question
                                                                    provided={
                                                                        provided
                                                                    }
                                                                    question={
                                                                        question
                                                                    }
                                                                    setQuestions={
                                                                        setQuestions
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            )}
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Box>
                    ) : (
                        <Text color="red.500">No Questions Added Yet</Text>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default Questions;
