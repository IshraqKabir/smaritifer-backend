import {
    Box,
    FormLabel,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/core";
import React from "react";

const PassingPercentage = ({ passingPercentage, setPassingPercentage }) => {
    return (
        <Box>
            <FormLabel htmlFor="title" fontWeight="bold">
                Passing Percentage
            </FormLabel>
            <NumberInput
                value={passingPercentage}
                onChange={setPassingPercentage}
                min={0}
                max={100}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {passingPercentage > 100 ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Passing percentage can not be more than 100
                </Text>
            ) : null}
            {passingPercentage < 0 ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Passing percentage can not be less than 0
                </Text>
            ) : null}
        </Box>
    );
};

export default PassingPercentage;
