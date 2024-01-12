import './App.css';
import { Button } from "./Button";
import { Link, Outlet } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Link to={"/"}>home</Link>
            <br />
            <Link to={"/about"}>about</Link>

            <h1>App</h1>
            <p className="error">App contenttttt</p>

            <Button text="Click me" onClick={() => alert('hello')} />

            <Outlet />
        </div>
    );
}

export default App;