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
  games: any[];
}

function App() {
  const [count, setCount] = useState(0);
  const [darkModeToggle, setDarkModeToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreData, setGenreData] = useState<GenreData>({
    id: 0,
    name: "",
    games: [],
  });

  useEffect(() => {}, [darkModeToggle]);

  const handleSearchCallback = (search: string) => {
    setSearchQuery(search);
  };

  const handleGenreCallback = (data: GenreData) => {
    const newGenreData = {
      ...genreData,
      id: data.id,
      name: data.name,
      games: data.games,
    };
    setGenreData(newGenreData);
  };

  return (
    <>
      <NavBar
        darkMode={darkModeToggle}
        searchQueryCallback={handleSearchCallback}
        onSelectItem={() => {
          setDarkModeToggle(!darkModeToggle);
        }}
      />
      <SBandContentBody>
        <SideNavBar
          darkMode={darkModeToggle}
          genreCallback={handleGenreCallback}
        />
        <Content
          darkMode={darkModeToggle}
          searchQuery={searchQuery}
          genreData={genreData}
        />
      </SBandContentBody>
    </>
  );
}

export default App;
