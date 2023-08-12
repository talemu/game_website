import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Select, background } from "@chakra-ui/react";
import platformsService, {
  PlatformParentItem,
} from "../services/platformsService";
import {
  EmptyDiv,
  darkModeBackground,
  darkModeBackgroundSelect,
  lightModeBackground,
  lightModeBackgroundSelect,
} from "../styles/themes";
import Games from "./Games";
import { Response } from "../services/http-service";

const ContentDiv = styled.div`
  width: 100%;
  padding: 0.5em 1em;
  display: block;
  text-align: left;
`;

const Header = styled.div`
  font-family: Copperplate;
  font-size: 5em;
`;

const SelectsDiv = styled.div`
  display: flex;
`;

const SelectPlatform = styled.select`
  width: 10em;
  height: 2em;
  border-radius: 0.25em;
  background: adjusted by mode;
`;

const SelectOrder = styled.select`
  width: 12em;
  height: 2em;
  border-radius: 0.25em;
  background: adjusted by mode;
`;

const SelectDiv = styled.div`
  padding: 0em 1em;
`;

interface Props {
  darkMode: Boolean;
  genreData: {
    genreId: number;
    genreName: string;
  };
}

const Content = ({ darkMode, genreData }: Props) => {
  const [platformsResponse, setplatformsResponse] =
    useState<PlatformParentItem[]>();
  const [error, setError] = useState<String>("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const { request, cancel } = platformsService.getAll();
    if (!platformsResponse) {
      request
        .then((response: Response) => {
          const newResults = (
            response.data as { results: PlatformParentItem[] }
          ).results;
          setplatformsResponse(newResults);
          setShow(true);
        })
        .catch((err) => console.log(error));
    }
  }, [darkMode]);

  const handleSelectedPlatform = (item: string) => {
    console.log(item);
  };

  return (
    <>
      {show ? (
        <ContentDiv style={darkMode ? darkModeBackground : lightModeBackground}>
          <Header>
            {genreData ? <span>{genreData.genreName} </span> : null}Games
          </Header>
          <SelectsDiv>
            <SelectPlatform
              onChange={(item) => handleSelectedPlatform(item.target.value)}
              style={
                darkMode ? darkModeBackgroundSelect : lightModeBackgroundSelect
              }
            >
              <option value="all">All Platforms</option>
              {platformsResponse?.map((item: PlatformParentItem) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </SelectPlatform>
            <SelectDiv>
              <SelectOrder
                style={
                  darkMode
                    ? darkModeBackgroundSelect
                    : lightModeBackgroundSelect
                }
              >
                <option value="relevance">Order by: Relevance</option>
              </SelectOrder>
            </SelectDiv>
          </SelectsDiv>
          <Games genreData={genreData} />
        </ContentDiv>
      ) : (
        <EmptyDiv></EmptyDiv>
      )}
    </>
  );
};

export default Content;
