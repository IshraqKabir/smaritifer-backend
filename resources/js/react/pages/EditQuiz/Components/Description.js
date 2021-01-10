import { Box, FormLabel, Textarea, Text } from "@chakra-ui/core";
import React from "react";

const Description = ({ formik }) => {
    return (
        <Box>
            <FormLabel htmlFor="description" fontWeight="bold">Description</FormLabel>
            <Textarea
                id="description"
                name="description"
                placeholder="Enter Quiz Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    {formik.errors.description}
                </Text>
            ) : null}
        </Box>
    );
};

export default Description;
