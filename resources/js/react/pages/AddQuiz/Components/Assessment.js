import { Box, Checkbox } from "@chakra-ui/core";
import React from "react";

const Assessment = ({ formik }) => {
    return (
        <Box>
            <Checkbox
                variantColor="green"
                value={formik.values.assessment}
                onChange={formik.onChange}
                name="assessment"
            >
                Assessment
            </Checkbox>
        </Box>
    );
};

export default Assessment;
