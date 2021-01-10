import { Flex, FormLabel, Switch } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";

const Featured = ({ quiz }) => {
    const [isChecked, setIsChecked] = useState(quiz.is_featured);

    const handleChange = () => {



        setIsChecked(!isChecked);
    };

    return (
        <Flex alignItems="center" justifyContent="center">
            <Switch
                value={isChecked == 1 ? true : false}
                defaultIsChecked={isChecked == 1 ? true : false}
                size="sm"
                color="teal"
                id="active"
                marginRight={1}
                onChange={handleChange}
            />
            <FormLabel htmlFor="active" align="center" fontSize="xs">
                Featured
            </FormLabel>
        </Flex>
    );
};

export default Featured;
