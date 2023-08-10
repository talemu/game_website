import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";

function App() {
  const [count, setCount] = useState(0);
  const [darkModeToggle, setDarkModeToggle] = useState(true);

  useEffect(() => {}, [darkModeToggle]);

  return (
    <>
      <NavBar
        darkMode={darkModeToggle}
        onSelectItem={() => {
          setDarkModeToggle(!darkModeToggle);
        }}
      />
      <SideNavBar darkMode={darkModeToggle} />
    </>
  );
}

export default App;
