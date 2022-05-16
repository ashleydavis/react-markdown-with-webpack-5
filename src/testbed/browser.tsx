import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactMarkdown from 'react-markdown';

function App() {
    return (
        <div>
            <ReactMarkdown># Hello, *world*!</ReactMarkdown>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
