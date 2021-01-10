import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { theme as customTheme } from "@chakra-ui/core";

import Questions from "./Questions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <DndProvider backend={HTML5Backend}>
                <Questions />
            </DndProvider>
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById("questions")) {
    ReactDOM.render(<App />, document.getElementById("questions"));
}
