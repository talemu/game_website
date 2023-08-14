import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import genresService, { Genre } from "../services/genresService";
import {
  EmptyDiv,
  darkModeBackground,
  lightModeBackground,
} from "../styles/themes";
import { Response } from "../services/http-service";

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

interface Props {
  darkMode: Boolean;
  genreCallback: any;
}

const SideNavBar = ({ darkMode, genreCallback }: Props) => {
  interface Response {
    data: any;
  }

  const [response, setResponse] = useState<Response>();
  const [error, setError] = useState<String>("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
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
          setShow(true);
          // setData(response.data);
        })
        .catch((err: Error) => setError(err.message));
    }
  }, [response]);

  const handleGenreSelect = (item: Genre) => {
    const data = item;
    genreCallback(data);
  };

  const AllGenres = {
    id: 0,
    name: "",
    image_background:
      "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/05/best-free-pc-games-fortnite.jpg",
    games: [],
  };

  return (
    <>
      {show ? (
        <div>
          {error !== "" ? <p>{error}</p> : <div></div>}
          <SideNav style={darkMode ? darkModeBackground : lightModeBackground}>
            <SideNavHeader>Genres</SideNavHeader>
            <SideBarUL>
              <SideBarItemDiv
                key={"all"}
                onClick={() => handleGenreSelect(AllGenres)}
              >
                {" "}
                <Image src={AllGenres.image_background} />
                <SideBarLI>All </SideBarLI>
              </SideBarItemDiv>
              {results.map((item: Genre) => (
                <SideBarItemDiv
                  key={item.id}
                  onClick={() => handleGenreSelect(item)}
                >
                  <Image src={item.image_background} />
                  <SideBarLI>{item.name}</SideBarLI>
                </SideBarItemDiv>
              ))}
            </SideBarUL>
          </SideNav>
        </div>
      ) : (
        <EmptyDiv></EmptyDiv>
      )}
    </>
  );
};

export default SideNavBar;
