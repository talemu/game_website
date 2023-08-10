import React, { ChangeEvent, useState } from "react";
import { Input, InputGroup, Switch } from "@chakra-ui/react";
import { styled } from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";

//styled components
const Nav = styled.div`
  height: 3em;
  display: flex;
  overflow: hidden;
  margin: 0em;
  width: 100%;
`;

const WebsiteLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3em;
`;

const NavSearch = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  display: flex;
`;

const ModeDiv = styled.div`
  width: 10em;
  display: flex;
  font-size: 1em;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  white-space: nowrap;
  flex-direction: column;
  align-items: center;
`;

const SearchIconDiv = styled.div`
  padding: 0em 1em;
`;

const Button = styled.button``;

//color styles
const lightModeBackground = {
  "background-color": "white",
};

const darkModeBackground = {
  "background-color": "#35155D",
};

const lightModeColor = {
  color: "black",
  "font-color": "black",
};

const darkModeColor = {
  color: "white",
  "font-color": "white",
};

interface Props {
  currentMode: Boolean;
  onSelectItem: () => void;
}

const NavBar = ({ currentMode, onSelectItem }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  //Function to handle Search Change

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  //Function to handle Search Submit

  const handleSearch = () => {
    console.log(searchQuery);
  };

  return (
    <Nav style={currentMode ? darkModeBackground : lightModeBackground}>
      <WebsiteLogo onClick={() => (location.href = "/")}>
        <StarIcon
          boxSize={5}
          style={currentMode ? darkModeColor : lightModeColor}
        />
      </WebsiteLogo>
      <NavSearch>
        <InputGroup width="95%">
          <Input
            onChange={(event) => handleSearchChange(event)}
            id="search"
            placeholder="Search"
            width="100%"
            background="#cdd9e5"
          />
          <Button onClick={handleSearch}>
            <SearchIconDiv>
              <SearchIcon boxSize={5} />
            </SearchIconDiv>
          </Button>
        </InputGroup>
      </NavSearch>
      <ModeDiv>
        Dark Mode
        <Switch size="md" id="dark-mode" onChange={() => onSelectItem()} />
      </ModeDiv>
    </Nav>
  );
};

export default NavBar;