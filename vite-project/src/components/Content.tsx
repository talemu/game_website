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

const SelectDiv = styled.div`
  padding: 0em 1em 0em 0em;
  width: 15em;
`;

const SelectOption = styled.option``;

interface Props {
  darkMode: Boolean;
  searchQuery: string;
  genreData: {
    id: number;
    name: string;
    games: any[];
  };
}

const Content = ({ darkMode, searchQuery, genreData }: Props) => {
  const [platformsResponse, setplatformsResponse] =
    useState<PlatformParentItem[]>();
  const [error, setError] = useState<String>("");
  const [show, setShow] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  useEffect(() => {
    const { request, cancel } = platformsService.getAll();
    if (!platformsResponse) {
      request
        .then((response: Response) => {
          console.log("found2");
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
    setSelectedPlatform(item);
  };

  return (
    <>
      {show ? (
        <ContentDiv style={darkMode ? darkModeBackground : lightModeBackground}>
          <Header>
            {genreData ? <span>{genreData.name} </span> : null}Games
          </Header>
          <SelectsDiv>
            <SelectDiv>
              <Select
                onChange={(item) => handleSelectedPlatform(item.target.value)}
                style={
                  darkMode
                    ? darkModeBackgroundSelect
                    : lightModeBackgroundSelect
                }
                size="sm"
              >
                <SelectOption
                  value="all"
                  style={
                    darkMode ? darkModeBackgroundSelect : lightModeBackground
                  }
                >
                  All Platforms
                </SelectOption>
                {platformsResponse?.map((item: PlatformParentItem) => (
                  <SelectOption
                    key={item.id}
                    value={item.slug}
                    style={
                      darkMode ? darkModeBackgroundSelect : lightModeBackground
                    }
                  >
                    {item.name}
                  </SelectOption>
                ))}
              </Select>
            </SelectDiv>
            <SelectDiv>
              <Select
                style={
                  darkMode
                    ? darkModeBackgroundSelect
                    : lightModeBackgroundSelect
                }
                size="sm"
              >
                <SelectOption
                  value="relevance"
                  style={
                    darkMode
                      ? darkModeBackgroundSelect
                      : lightModeBackgroundSelect
                  }
                >
                  Order by: Relevance
                </SelectOption>
              </Select>
            </SelectDiv>
          </SelectsDiv>
          <Games
            searchQuery={searchQuery}
            genreData={genreData}
            selectedPlatform={selectedPlatform}
          />
        </ContentDiv>
      ) : (
        <EmptyDiv></EmptyDiv>
      )}
    </>
  );
};

export default Content;
