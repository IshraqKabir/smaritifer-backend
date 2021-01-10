import { Box, Checkbox } from "@chakra-ui/core";
import React from "react";

const Retake = ({ retake, setRetake }) => {
    return (
        <Box>
            <Checkbox
                variantColor="green"
                value={retake}
                onChange={e => setRetake(!retake)}
                name="assessment"
            >
                Retake
            </Checkbox>
        </Box>
    );
};

export default Retake;
