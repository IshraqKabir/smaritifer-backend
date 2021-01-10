import { Button } from "@chakra-ui/core";
import React from "react";

const AddQuestion = ({ setQuestions }) => {
    const handleClick = () => {
        setQuestions(state => {
            let questions = [...state];

            // ********** start **********
            // for finding out the highest id possible
            // so that no duplication of id occurs
            let highestID = questions.length;

            questions.forEach(question => {
                let questionID = parseInt(question.id.replace(/[^0-9]/g, ""));

                if (questionID > highestID) {
                    highestID = questionID;
                }
            });
            // ********** end **********

            questions.push({
                question: "",
                marks: 1,
                answer_type: "multiple_choice",
                image: "",
                id: `item-${highestID + 1}`,
                options: [
                    {
                        title: "",
                        image: "",
                        is_right: true,
                        id: "item-1"
                    }
                ]
            });

            return questions;
        });
    };

    return (
        <Button variantColor="blue" onClick={handleClick} size="sm">
            Add Question
        </Button>
    );
};

export default AddQuestion;
