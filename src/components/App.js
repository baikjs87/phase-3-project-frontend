import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import NavBar from "./NavBar"

function App() {
  const [location, setLocation] = useState()
  console.log(location)

  useEffect(() => {
    fetch("http://localhost:9292/locations")
    .then((r) => r.json())
    .then((data) => setLocation(data));
   }, [])
 
  

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
