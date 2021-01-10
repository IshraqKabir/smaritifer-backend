import { Box, FormLabel, Input, Text } from "@chakra-ui/core";
import React from "react";

const Title = ({ formik }) => {
    return (
        <Box>
            <FormLabel htmlFor="title" fontWeight="bold">Title</FormLabel>
            
            <Input
                id="title"
                name="title"
                placeholder="Enter Quiz Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    {formik.errors.title}
                </Text>
            ) : null}
        </Box>
    );
};

export default Title;
