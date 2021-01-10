import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { theme as customTheme } from "@chakra-ui/core";

import Quizzes from "./Quizzes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <DndProvider backend={HTML5Backend}>
                <Quizzes />
            </DndProvider>
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById("quizzes")) {
    ReactDOM.render(<App />, document.getElementById("quizzes"));
}
