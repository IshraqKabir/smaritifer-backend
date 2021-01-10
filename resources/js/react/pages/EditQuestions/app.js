import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { theme as customTheme } from "@chakra-ui/core";

import EditQuestions from './Components/EditQuestions/EditQuestions';

function App() {

    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <EditQuestions />
        </ThemeProvider>
    );
}

export default App;

if (document.getElementById("edit_questions")) {
    ReactDOM.render(<App />, document.getElementById("edit_questions"));
}
