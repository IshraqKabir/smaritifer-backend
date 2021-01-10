import { Box, Checkbox } from "@chakra-ui/core";
import React from "react";

const isFeatured = ({ formik }) => {
    return (
        <Box>
            <Checkbox
                variantColor="green"
                defaultIsChecked
                value={formik.values.is_featured}
                onChange={formik.onChange}
                name="is_featured"
            >
                Featured
            </Checkbox>
        </Box>
    );
};

export default isFeatured;
