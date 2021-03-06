import { Textarea } from "@chakra-ui/core";
import React, { useState, useEffect } from "react";

const LongParagraph = ({ options, setOptions }) => {
    const [title, setTitle] = useState(options[0] ? options[0].title : "");

    useEffect(() => {
        setOptions([
            {
                id: options[0] ? options[0].id : "item-1",
                title: title,
                image: "",
                is_right: true
            }
        ]);
    }, [title]);

    return (
        <Textarea
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Option Title"
        />
    );
};

export default LongParagraph;
