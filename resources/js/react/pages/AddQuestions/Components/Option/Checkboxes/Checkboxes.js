import { Box, Divider, Flex, Icon } from "@chakra-ui/core";
import React, { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Option from "./Option";

const Checkboxes = ({ options, setOptions, question, questions }) => {
    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newOptions = reorder(
            options,
            result.source.index,
            result.destination.index
        );

        setOptions(newOptions);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"option" + question.id}>
                {(provided, snapshot) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {options.map((option, index) => (
                            <Draggable
                                key={option.id}
                                draggableId={option.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <Flex
                                            alignItems="center"
                                            ref={provided.innerRef}
                                            marginBottom={5}
                                        >
                                            <Option
                                                provided={provided}
                                                option={option}
                                                setOptions={setOptions}
                                                questions={questions}
                                            />
                                        </Flex>
                                        <Divider />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Checkboxes;
