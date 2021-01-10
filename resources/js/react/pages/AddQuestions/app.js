import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { theme as customTheme } from "@chakra-ui/core";

import AddQuestions from './Components/AddQuestions/AddQuestions';

function App() {

    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <AddQuestions />
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById("add_questions")) {
    ReactDOM.render(<App />, document.getElementById("add_questions"));
}
