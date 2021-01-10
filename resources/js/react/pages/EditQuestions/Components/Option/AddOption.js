import { Button } from "@chakra-ui/core";
import React from "react";

const AddOption = ({ setOptions }) => {
    const handleClick = () => {
        setOptions(state => {
            let options = [...state];

            // ********** start **********
            // for finding out the highest id possible
            // so that no duplication of id occurs
            let highestID = options.length;

            options.forEach(option => {
                let optionID = parseInt(option.id.replace(/[^0-9]/g, ""));

                if (optionID > highestID) {
                    highestID = optionID;
                }
            });
            // ********** end **********

            options.push({
                title: "",
                image: "",
                is_right: false,
                id: `new-item-${highestID + 1}`,
            });

            return options;
        });
    };

    return (
        <Button variantColor="green" onClick={handleClick}>
            Add Option
        </Button>
    );
};

export default AddOption;
