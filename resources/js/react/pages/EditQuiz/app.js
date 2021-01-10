import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { theme as customTheme } from "@chakra-ui/core";

import EditQuiz from './EditQuiz';

console.log(quiz)

function App() {

    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <EditQuiz />
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById("edit_quiz")) {
    ReactDOM.render(<App />, document.getElementById("edit_quiz"));
}
