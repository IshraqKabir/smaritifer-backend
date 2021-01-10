import {
    Box,
    Divider,
    Select,
    Stack,
    FormLabel,
    Textarea,
    Heading,
    Icon,
    useToast
} from "@chakra-ui/core";
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/core";
import React, { useState, useEffect, useRef } from "react";

import QuestionImage from "./QuestionImage";

import Options from "../Options/Options";
import deleteRequest from "../../../../CustomFunctions/deleteRequest";
import url from "../../../../url";

import BottomBar from "./BottomBar/BottomBar";

const Question = ({
    question,
    questions,
    setQuestions,
    provided,
    isDragging,
    setDeletedQuestions,
    setDeletedOptions
}) => {
    const [title, setTitle] = useState(question.question);
    const [image, setImage] = useState(question.image);
    const [answerType, setAnswerType] = useState(question.answer_type);
    const [marks, setMarks] = useState(question.marks);

    const questionRef = useRef(null);

    const toast = useToast();

    useEffect(() => {
        questionRef.current.scrollIntoView({ behaviour: "smooth" });
    }, []);

    useEffect(() => {
        if (isDragging && questions.length == 1) {
            toast({
                title: "Only One Question",
                description: "No other questions",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        }
    }, [isDragging]);

    useEffect(() => {
        setQuestions(state => {
            let questions = [...state];

            questions = questions.map(q => {
                if (q.id == question.id) {
                    q = {
                        ...q,
                        question: title,
                        image: image,
                        answer_type: answerType,
                        marks: marks
                    };
                }
                return q;
            });

            return questions;
        });
    }, [title, image, answerType, marks]);

    // options states
    const [options, setOptions] = useState([...question.options]);

    useEffect(() => {
        setQuestions(state => {
            let questions = [...state];

            questions = questions.map(q => {
                if (q.id == question.id) {
                    return {
                        ...q,
                        options: options
                    };
                }
                return q;
            });

            return questions;
        });
    }, [options]);

    return (
        <Box
            padding={4}
            backgroundColor="white"
            borderRadius="10px"
            marginTop={5}
        >
            <Stack marginBottom={2}>
                <div
                    {...provided.dragHandleProps}
                    style={{ margin: "auto", transform: "rotate(90deg)" }}
                >
                    <Icon name="drag-handle" size="20px" />
                </div>
                <FormLabel fontWeight="bold">Question</FormLabel>
                <Textarea
                    value={title}
                    row
                    onChange={e => setTitle(e.target.value)}
                    ref={questionRef}
                    placeholder="Question"
                />
                <Divider />
                {isDragging ? null : (
                    <>
                        <QuestionImage image={image} setImage={setImage} />
                        <Divider />
                        <FormLabel fontWeight="bold">Marks</FormLabel>
                        <NumberInput
                            value={marks}
                            onChange={value => {
                                if (value < 1) return;
                                setMarks(value);
                            }}
                            min={1}
                            max={100}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Divider />
                        <FormLabel fontWeight="bold">Question Type</FormLabel>
                        <Select
                            onChange={e => setAnswerType(e.target.value)}
                            width={["100%", "100%", "50%", "40%"]}
                        >
                            {question.answer_type == "multiple_choice" ? (
                                <option value="multiple_choice">
                                    Multiple Choice
                                </option>
                            ) : question.answer_type == "checkboxes" ? (
                                <option value="checkboxes">Check Boxes</option>
                            ) : question.answer_type == "short_paragraph" ? (
                                <option value="short_paragraph">
                                    Short Paragraph
                                </option>
                            ) : question.answer_type == "long_paragraph" ? (
                                <option value="long_paragraph">
                                    Long Paragraph
                                </option>
                            ) : null}
                            {question.answer_type != "multiple_choice" ? (
                                <option value="multiple_choice">
                                    Multiple Choice
                                </option>
                            ) : null}
                            {question.answer_type != "checkboxes" ? (
                                <option value="checkboxes">Check Boxes</option>
                            ) : null}
                            {question.answer_type != "short_paragraph" ? (
                                <option value="short_paragraph">
                                    Short Pararaph
                                </option>
                            ) : null}
                            {question.answer_type != "long_paragraph" ? (
                                <option value="long_paragraph">
                                    Long Paragraph
                                </option>
                            ) : null}
                        </Select>
                        <Divider />
                        <Heading size="sm">Options</Heading>
                        <Divider />
                        <Options
                            options={options}
                            answerType={answerType}
                            setOptions={setOptions}
                            question={question}
                            questions={questions}
                            setDeletedOptions={setDeletedOptions}
                        />
                        <Divider />
                        <BottomBar
                            question={question}
                            setQuestions={setQuestions}
                            questions={questions}
                            setDeletedQuestions={setDeletedQuestions}
                            setDeletedOptions={setDeletedOptions}
                            options={options}
                        />
                    </>
                )}
            </Stack>
        </Box>
    );
};

export default Question;
