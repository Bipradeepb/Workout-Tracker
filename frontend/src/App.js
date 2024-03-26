import React from "react";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Update from "./Pages/Update.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import { useAuthContext } from "./hooks/useAuthContext.jsx";

function App() {

  const {user}=useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={(!user)?<Login/>:<Navigate to="/home"/>}/>
            <Route path="/signup" element={(!user)?<SignUp/>:<Navigate to="/home"/>}/>
            <Route path="/home" element={user?<Home/>:<Navigate to="/"/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
