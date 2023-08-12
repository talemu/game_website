import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import SideNavBar from "./components/SideNavBar";
import Content from "./components/Content";
import styled from "styled-components";

const SBandContentBody = styled.div`
  display: flex;
`;

interface GenreData {
  id: number;
  name: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [darkModeToggle, setDarkModeToggle] = useState(false);
  const [genreData, setGenreData] = useState({
    genreId: 0,
    genreName: "",
  });

  useEffect(() => {}, [darkModeToggle]);

  const handleGenreCallback = (data: GenreData) => {
    const newGenreData = {
      ...genreData,
      genreId: data.id,
      genreName: data.name,
    };
    setGenreData(newGenreData);
  };

  return (
    <>
      <NavBar
        darkMode={darkModeToggle}
        onSelectItem={() => {
          setDarkModeToggle(!darkModeToggle);
        }}
      />
      <SBandContentBody>
        <SideNavBar
          darkMode={darkModeToggle}
          genreCallback={handleGenreCallback}
        />
        <Content darkMode={darkModeToggle} genreData={genreData} />
      </SBandContentBody>
    </>
  );
}

export default App;
