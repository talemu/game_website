import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);
  const [darkModeToggle, setDarkModeToggle] = useState(false);
  console.log(darkModeToggle);

  return (
    <>
      <NavBar
        onSelectItem={() => {
          setDarkModeToggle(!darkModeToggle);
        }}
      />
    </>
  );
}

export default App;
