import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { theme as customTheme } from "@chakra-ui/core";

import AddQuiz from './AddQuiz';

function App() {

    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <AddQuiz />
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById("add_quiz")) {
    ReactDOM.render(<App />, document.getElementById("add_quiz"));
}
