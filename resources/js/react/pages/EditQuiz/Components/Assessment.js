import { Box, Checkbox } from "@chakra-ui/core";
import React from "react";

const Assessment = ({ assessment, setAssessment }) => {
    return (
        <Box>
            <Checkbox
                variantColor="green"
                value={assessment}
                onChange={e => setAssessment(!assessment)}
                name="assessment"
            >
                Assessment
            </Checkbox>
        </Box>
    );
};

export default Assessment;
