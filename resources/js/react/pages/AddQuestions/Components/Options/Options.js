import React from "react";

import { Box } from "@chakra-ui/core";

import MultipleChoice from "../Option/MultipleChoice/MultipleChoice";
import Checkboxes from "../Option/Checkboxes/Checkboxes";
import ShortParagraph from "../Option/ShortParagraph/ShortParagraph";
import LongParagraph from "../Option/LongParagraph/LongParagraph";

import AddOption from "../Option/AddOption";

const Options = ({ options, setOptions, answerType, question, questions }) => {
    return (
        <Box>
            {answerType == "multiple_choice" ? (
                <MultipleChoice
                    question={question}
                    options={options}
                    setOptions={setOptions}
                    questions={questions}
                />
            ) : answerType == "checkboxes" ? (
                <Checkboxes
                    options={options}
                    setOptions={setOptions}
                    question={question}
                    questions={questions}
                />
            ) : answerType == "short_paragraph" ? (
                <ShortParagraph options={options} setOptions={setOptions} />
            ) : answerType == "long_paragraph" ? (
                <LongParagraph options={options} setOptions={setOptions} />
            ) : null}
            {["multiple_choice", "checkboxes"].includes(answerType) ? (
                <AddOption setOptions={setOptions} />
            ) : null}
        </Box>
    );
};

export default Options;
