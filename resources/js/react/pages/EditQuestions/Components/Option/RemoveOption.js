import { Icon } from "@chakra-ui/core";
import React from "react";

const RemoveOption = ({
    option,
    setOptions,
    setImage,
    setDeletedOptions
}) => {
    const handleClick = () => {
        setImage("");

        if (option.id.split("-")[0] != "new") {
            setDeletedOptions(options => [
                ...options,
                parseInt(option.id.split("-")[option.id.split("-").length - 1])
            ]);
        }

        setOptions(options => options.filter(o => o.id != option.id));
    };

    return (
        <Icon
            name="close"
            marginLeft={2}
            cursor="pointer"
            color="red.500"
            onClick={handleClick}
            marginBottom="auto"
            marginLeft="auto"
        />
    );
};

export default RemoveOption;
