import { Box, Checkbox } from "@chakra-ui/core";
import React from "react";

const isFeatured = ({ is_featured, set_is_featured }) => {
    return (
        <Box>
            <Checkbox
                variantColor="green"
                defaultIsChecked
                value={is_featured}
                onChange={e => set_is_featured(!is_featured)}
                name="is_featured"
            >
                Featured
            </Checkbox>
        </Box>
    );
};

export default isFeatured;
