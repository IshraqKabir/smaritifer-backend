import { Icon } from "@chakra-ui/core";
import React from "react";

const CloneQuestion = ({ question, setQuestions }) => {
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

            // get the index of the current question
            let index = 0;
            questions.forEach((q, i) => {
                if (q.id == question.id) {
                    index = i;
                }
            });

            // clone the question after the cloned question
            questions.splice(index + 1, 0, {
                ...question,
                id: `item-${highestID + 1}`
            });

            return questions;
        });
    };

    return (
        <Icon
            name="copy"
            onClick={handleClick}
            marginRight={2}
            color="blue.500"
            cursor="pointer"
            size="25px"
        />
    );
};

export default CloneQuestion;
