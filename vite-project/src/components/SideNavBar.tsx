import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import genresService, { Genre } from "../services/genresService";

//styled components
const SideNav = styled.div`
  backgroundcolor: red;
  font-family: Copperplate;
  height: 100%;
  width: 12em;
`;

const SideNavHeader = styled.div`
  padding: 1em 1em;
  font-size: 2em;
  text-align: left;
`;

const SideBarUL = styled.div`
  list-style-type: none;
  text-align: left;
  padding: 0em 2em;
`;

const SideBarItemDiv = styled.button`
  display: flex;
  padding: 0.25em 0em;
  border: none;

  &:hover {
    text-decoration: underline;
    font-weight: bold;
    border: none;
  }

  &:focus-visible {
    border-color: none;
  }
`;

const SideBarLI = styled.li`
  padding: 0em 1em;
  text-align: left;
`;

const Image = styled.img`
  width: 2em;
  height: 2em;
  object-fit: cover;
  border-radius: 0.25em;
`;

//color styles
const darkModeBackground = {
  backgroundColor: "white",
  color: "black",
  fontColor: "black",
};

const lightModeBackground = {
  backgroundColor: "#35155D",
  color: "white",
  fontColor: "white",
};

interface Props {
  darkMode: Boolean;
}

const SideNavBar = ({ darkMode }: Props) => {
  interface Response {
    data: unknown;
  }

  const [response, setResponse] = useState<Response>();
  const [error, setError] = useState<String>("");
  const [results, setResults] = useState([]);
  // const [data, setData] = useState<Data>();

  useEffect(() => {
    const { request, cancel } = genresService.getAll();
    //if statement prevents repeated, unintentional response
    if (!response?.data) {
      request
        .then((response: Response) => {
          setResponse(response);
          const newResults = (response.data as { results: never[] }).results;
          setResults(newResults);
          // setData(response.data);
        })
        .catch((err: Error) => setError(err.message));
    }
  }, [response]);

  const handleGenreSelect = (item: Genre) => {
    console.log(item);
  };

  return (
    <>
      {error !== "" ? <p>{error}</p> : <div></div>}
      <SideNav style={darkMode ? darkModeBackground : lightModeBackground}>
        <SideNavHeader>Genres</SideNavHeader>
        <SideBarUL>
          {results.map((item: Genre) => (
            <SideBarItemDiv onClick={() => handleGenreSelect(item)}>
              <Image src={item.image_background} />
              <SideBarLI key={item.id}>{item.name}</SideBarLI>
            </SideBarItemDiv>
          ))}
        </SideBarUL>
      </SideNav>
    </>
  );
};

export default SideNavBar;
