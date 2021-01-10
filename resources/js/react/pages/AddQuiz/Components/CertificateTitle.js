import { Box, FormLabel, Input, Text } from "@chakra-ui/core";
import React from "react";

const CertificateTitle = ({ formik }) => {
    return (
        <Box>
            <FormLabel htmlFor="certificate_title" fontWeight="bold">Certificate Title</FormLabel>
            <Input
                id="certificate_title"
                name="certificate_title"
                placeholder="Certificate Title"
                value={formik.values.certificate_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.certificate_title && formik.errors.certificate_title ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    {formik.errors.certificate_title}
                </Text>
            ) : null}
        </Box>
    );
};

export default CertificateTitle;
