import React from "react";

import { Box, Stack } from "@chakra-ui/core";
import Featured from "./Featured";

const Info = ({ quiz }) => {
    return (
        <Stack align="center">
            <Featured quiz={quiz} />
        </Stack>
    );
};

export default Info;
