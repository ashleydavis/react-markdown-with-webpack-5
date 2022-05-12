import * as React from "react";
import * as ReactDOM from "react-dom";
const ReactMarkdown = require('react-markdown');

function App() {
    return (
        <div>
            <ReactMarkdown />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
