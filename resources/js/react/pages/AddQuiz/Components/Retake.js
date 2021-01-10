import { Box, Checkbox } from "@chakra-ui/core";
import React from "react";

const Retake = ({ formik }) => {
    return (
        <Box>
            <Checkbox
                variantColor="green"
                defaultIsChecked
                value={formik.values.retake}
                onChange={formik.onChange}
                name="retake"
            >
                Retake
            </Checkbox>
        </Box>
    );
};

export default Retake;
