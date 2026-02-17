import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";
import { BrowserRouter,Routes, Route} from "react-router-dom";

function App() {
 
  
  return (

          <BrowserRouter> 
              <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/dashboard" element={<Dashboard/> } />
              </Routes> 
          </BrowserRouter>    

          );
}

export default App;
