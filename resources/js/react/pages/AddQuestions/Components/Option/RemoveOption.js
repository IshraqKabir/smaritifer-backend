import { Icon } from "@chakra-ui/core";
import React from "react";
import deleteImageRequest from "../../../../CustomFunctions/deleteImageRequest";

const RemoveOption = ({ option, setOptions, questions, setImage }) => {
    const handleClick = () => {
        setImage("");
        if (option.image) {
            const deleteCallBack = response => {};

            const deleteErrorCallBack = error => {};

            deleteImageRequest(
                option.image,
                questions,
                deleteCallBack,
                deleteErrorCallBack
            );
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
