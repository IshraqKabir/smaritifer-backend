import { Button } from "@chakra-ui/core";
import React from "react";
import deleteRequest from "../../../../../CustomFunctions/deleteRequest";
import post from "../../../../../CustomFunctions/post";
import url from "../../../../../url";

const Edit = ({ questions, deletedQuestions, deletedOptions }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        // to get the total request count
        // i.e. total questions and options in the whole state
        let requestsCount = questions.reduce((before, current) => {
            return before + current.options.length;
        }, questions.length + deletedQuestions.length + deletedOptions.length);

        let requestsDone = 0;

        // delete the deleted options from the database
        await deletedOptions.forEach((option, optionIndex) => {
            deleteRequest(
                `${url}/api/option/${option}/delete`,
                {},
                () => {
                    requestsDone++;
                    if (requestsCount == requestsDone) {
                        setIsLoading(false);
                        window.location.href = `${url}/quiz/${quiz.id}/questions`;
                        console.log("done");
                    }
                },
                () => {}
            );
        });

        // delete the deleted questions from the database
        await deletedQuestions.forEach((question, questionIndex) => {
            deleteRequest(
                `${url}/api/question/${question}/delete`,
                {},
                () => {
                    requestsDone++;
                    if (requestsCount == requestsDone) {
                        setIsLoading(false);
                        window.location.href = `${url}/quiz/${quiz.id}/questions`;
                        console.log("done");
                    }
                },
                () => {}
            );
        });

        questions.map(async (question, questionIndex) => {
            let questionID = question.id.split("-")[
                question.id.split("-").length - 1
            ];

            let callBack = response => {
                requestsDone++;
                if (requestsCount == requestsDone) {
                    setIsLoading(false);
                    window.location.href = `${url}/quiz/${quiz.id}/questions`;
                    console.log("done");
                }

                // options
                question.options.forEach(async (option, optionIndex) => {
                    let optionData = {
                        is_right: option.is_right,
                        serial: optionIndex + 1
                    };

                    if (option.title) {
                        optionData = {
                            ...optionData,
                            title: option.title
                        };
                    }

                    if (option.image) {
                        optionData = {
                            ...optionData,
                            image_id: parseInt(option.image.id)
                        };
                    }

                    let optionID = option.id.split("-")[
                        option.id.split("-").length - 1
                    ];

                    if (option.id.split("-")[0] == "new") {
                        console.log("new");
                        await post(
                            `${url}/api/question/${questionID}/option/store`,
                            optionData,
                            response => {
                                requestsDone++;
                                if (requestsCount == requestsDone) {
                                    setIsLoading(false);
                                    window.location.href = `${url}/quiz/${quiz.id}/questions`;
                                    console.log("done");
                                }
                            },
                            () => {}
                        );
                    } else {
                        await post(
                            `${url}/api/option/${optionID}/edit`,
                            optionData,
                            response => {
                                requestsDone++;
                                if (requestsCount == requestsDone) {
                                    setIsLoading(false);
                                    window.location.href = `${url}/quiz/${quiz.id}/questions`;
                                    console.log("done");
                                }
                            },
                            () => {}
                        );
                    }
                });
            };

            let questionData = {
                marks: question.marks,
                answer_type: question.answer_type,
                serial: questionIndex + 1
            };

            if (question.question) {
                questionData = {
                    ...questionData,
                    question: question.question
                };
            }

            if (question.image) {
                questionData = {
                    ...questionData,
                    image_id: parseInt(question.image.id)
                };
            }

            let errorCallBack = error => {
                console.log(error);
            };

            if (question.id.split("-")[0] == "new") {
                await post(
                    `${url}/api/quiz/${quiz.id}/question/store`,
                    questionData,
                    callBack,
                    errorCallBack
                );
            } else {
                await post(
                    `${url}/api/question/${questionID}/edit`,
                    questionData,
                    callBack,
                    errorCallBack
                );
            }
        });
    };

    return (
        <Button
            variantColor="green"
            onClick={handleClick}
            size="sm"
            isLoading={isLoading}
        >
            Edit
        </Button>
    );
};

export default Edit;
