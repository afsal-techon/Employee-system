import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

    useEffect(() => {
    AOS.init({
      duration: 350,      // animation duration
      easing: "ease-out", // easing
      once: true,         // animate only once
    });
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
