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

const StartAt = ({ date, setDate, hour, setHour, min, setMin }) => {
    return (
        <Box>
            <FormLabel htmlFor="title" fontWeight="bold">
                Start At
            </FormLabel>
            <Box>
                <Flex alignItems="center" flexWrap="wrap">
                    <Box>
                        <Text>Date: </Text>
                        <Input
                            as={DatePicker}
                            selected={date}
                            onChange={date => {
                                if (!date) return;
                                setDate(date);
                            }}
                        />
                    </Box>
                    <Box>
                        <Text>Hour: </Text>
                        <NumberInput
                            value={hour}
                            onChange={e => setHour(e)}
                            defaultValue={0}
                            min={0}
                            max={24}
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
                </Flex>
            </Box>
        </Box>
    );
};

export default StartAt;
