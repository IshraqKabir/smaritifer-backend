import { Box, Heading, Text } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";

import Question from "../Question/Question";

import BottomBar from "../BottomBar/BottomBar";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

let defaultQuestion = {
    question: "",
    marks: 1,
    answer_type: "multiple_choice",
    image: ""
};

let defaultOption = {
    title: "",
    image: "",
    is_right: true
};

const AddQuestions = props => {
    const [questions, setQuestions] = useState([
        {
            ...defaultQuestion,
            id: "item-1",
            options: [{ ...defaultOption, id: "item-1" }]
        }
    ]);

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragStart = () => {

    }

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

    return (
        <Box
            bg="#f1f2f7"
            w="100%"
            minHeight="100vh"
            paddingX={[1, 2, "15%", "30%"]}
            paddingTop={4}
            paddingBottom="100px"
        >
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
                    <Text fontSize="mg" color="grey">
                        {quiz.description}
                    </Text>
                </Box>
            </Box>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Droppable droppableId="question-droppable">
                    {(provided, snapshot) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {questions
                                ? questions.map((question, index) => {
                                      return (
                                          <Draggable
                                              key={question.id}
                                              draggableId={question.id}
                                              index={index}
                                          >
                                              {(provided, snapshot) => (
                                                  <div
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                  >
                                                      <Question
                                                          key={index}
                                                          index={index}
                                                          question={question}
                                                          questions={questions}
                                                          setQuestions={
                                                              setQuestions
                                                          }
                                                          provided={provided}
                                                          isDragging={snapshot.isDragging}
                                                      />
                                                  </div>
                                              )}
                                          </Draggable>
                                      );
                                  })
                                : null}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
            <BottomBar questions={questions} setQuestions={setQuestions} />
        </Box>
    );
};

export default AddQuestions;
