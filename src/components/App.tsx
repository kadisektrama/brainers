import React from "react";
import './App.css';
import { Button } from "./Button";

const App = () => {
    return (
        <div>
            <h1>App</h1>

            <p className="error">App content</p>

            <Button text="Click me" onClick={() => alert('hello')} />
        </div>
    );
}

export default App;