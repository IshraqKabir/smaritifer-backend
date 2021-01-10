import { Button } from "@chakra-ui/core";
import React, { useState } from "react";

import post from "../../../../../CustomFunctions/post";
import url from "../../../../../url";

const Save = ({ questions }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        // to get the total request count
        // i.e. total questions and options in the whole state
        let requestsCount = questions.reduce((before, current) => {
            return before + current.options.length;
        }, questions.length);

        let requestsDone = 0;

        questions.reverse().map(async question => {
            let fd = new FormData();

            fd.append("question", question.question);
            if (question.image) {
                fd.append("image_id", question.image.id);
            }
            fd.append("marks", question.marks);
            fd.append("answer_type", question.answer_type);

            let callBack = response => {
                console.log(response.data);
                requestsDone++;
                if (requestsCount == requestsDone) {
                    setIsLoading(false);
                    window.location.href = `${url}/quiz/${quiz.id}/questions`;
                    console.log("done");
                }

                // options
                question.options.reverse().forEach(async option => {
                    let fd = new FormData();

                    if (option.title) {
                        fd.append("title", option.title);
                    }
                    if (option.image) {
                        fd.append("image_id", option.image.id);
                    }
                    fd.append("is_right", option.is_right ? 1 : 0);

                    await post(
                        `${url}/api/question/${response.data.id}/option/store`,
                        fd,
                        response => {
                            console.log(response.data);
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
            };

            let errorCallBack = error => {
                console.log(error);
            };

            await post(
                `${url}/api/quiz/${quiz.id}/question/store`,
                fd,
                callBack,
                errorCallBack
            );
        });
    };

    return (
        <Button
            variantColor="green"
            onClick={handleClick}
            size="sm"
            isLoading={isLoading}
        >
            Save
        </Button>
    );
};

export default Save;
