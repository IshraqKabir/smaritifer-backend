import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper
} from "@chakra-ui/core";

const EndAt = ({ hour, setHour, min, setMin, second, setSecond }) => {
    return (
        <Box>
            <FormLabel htmlFor="duration" fontWeight="bold">Duration</FormLabel>
            <Box>
                <Flex alignItems="center" flexWrap="wrap">
                    <Box>
                        <Text>Hour: </Text>
                        <NumberInput
                            value={hour}
                            onChange={e => setHour(e)}
                            defaultValue={0}
                            min={0}
                            max={100}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box>
                        <Text>Min: </Text>
                        <NumberInput
                            value={min}
                            onChange={e => setMin(e)}
                            defaultValue={0}
                            min={0}
                            max={60}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                    <Box>
                        <Text>Second: </Text>
                        <NumberInput
                            value={second}
                            onChange={e => setSecond(e)}
                            defaultValue={0}
                            min={0}
                            max={60}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default EndAt;
