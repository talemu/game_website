import React from "react";
import styled from "styled-components";

const SideNav = styled.div`
  background-color: red;
  font-family: Copperplate;
  height: 100%;
  width: 12em;
`;

const SideNavHeader = styled.div`
  padding: 1em 1em;
  font-size: 2em;
  text-align: left;
`;

//color styles
const darkModeBackground = {
  "background-color": "white",
  color: "black",
  "font-color": "black",
};

const lightModeBackground = {
  "background-color": "#35155D",
  color: "white",
  "font-color": "white",
};

interface Props {
  darkMode: Boolean;
}

const SideNavBar = ({ darkMode }: Props) => {
  return (
    <>
      <SideNav style={darkMode ? darkModeBackground : lightModeBackground}>
        <SideNavHeader>Genres</SideNavHeader>
      </SideNav>
    </>
  );
};

export default SideNavBar;
