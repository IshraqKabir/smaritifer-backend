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

const serial = ({ serial, setSerial }) => {
    return (
        <Box>
            <FormLabel htmlFor="title" fontWeight="bold">
                Serial
            </FormLabel>
            <NumberInput
                value={serial}
                onChange={setSerial}
                min={1}
                max={serial_limit}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            {serial > serial_limit ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    There are a total of {serial_limit - 1} quiz{serial_limit > 2 ? 'zes' : ''}
                </Text>
            ) : null}
            {serial < 1 ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Serial can not be less than 1
                </Text>
            ) : null}
        </Box>
    );
};

export default serial;
