import React, { useEffect, useState } from "react";
import styled from "styled-components";
import gamesService, {
  GameData,
  GamePlatforms,
  containsString,
} from "../services/gamesService";
import { Response } from "../services/http-service";
import { PlatformParentItem } from "../services/platformsService";
import { icons } from "../icons/videoGameIcons";
import MySVG from "../icons/playstation-icon.svg";
import {
  RatingDivGreen,
  RatingDivRed,
  RatingDivYellow,
} from "../styles/themes";
import { Spinner, Tooltip } from "@chakra-ui/react";

const GamesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;

const GameCardDiv = styled.div`
  border: solid;
  width: 12em;
  margin: 1em 1em 0em 0em;
`;

const GameImage = styled.img`
  padding: 0em;
  width 20em;
  height: 8em;
  object-fit: cover;
`;

const GameContent = styled.div`
  width: 12em;
  height: 5em;
  padding: 0.25em;
`;

const PlatformDiv = styled.div`
  display: flex;
  padding-right: 0.4em;
`;

const PlatformDivInner = styled.div``;

const PlatformSpan = styled.span``;

const PlatformImage = styled.img`
  width: 1.5em;
  padding: 0em 0.1em;
`;

const SpinnerDiv = styled.div`
  padding: 1em;
  width: 5em;
  height: 5em;
`;

interface Props {
  searchQuery: string;
  genreData: any;
  selectedPlatform: string;
}

const RatingDiv = styled.div`
  padding: 0em 0.25em;
  margin-left: auto;
  align-items: center;
`;

const NameDiv = styled.div`
  text-align: left;
  padding: ;
`;

const Games = ({ searchQuery, genreData, selectedPlatform }: Props) => {
  //genreIds gameId
  const [results, setResults] = useState<GameData[]>();
  const genreIds = genreData.games.map((item: { id: any }) => item.id);
  const [emptySearch, setEmptySearch] = useState(false);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setSpin(true);
    setEmptySearch(false);
    const { request, cancel } = gamesService.getAll();
    request
      .then((response: Response) => {
        console.log(genreData);
        var newResults = (response.data as { results: GameData[] }).results;
        if (searchQuery != "") {
          newResults = newResults.filter((item) => {
            return containsString(item, searchQuery);
          });
        }
        if (genreData.name != "") {
          newResults = newResults.filter((item) => {
            return genreIds.includes(item.id);
          });
        }
        if (selectedPlatform != "all") {
          newResults = newResults.filter((item) => {
            const parent_platforms = item.parent_platforms;
            const platforms = parent_platforms.map(
              (item) => item.platform.slug
            );
            return platforms.includes(selectedPlatform);
          });
        }
        {
          newResults.length == 0 ? (console.log(), setEmptySearch(true)) : null;
        }
        setResults(newResults);
        setSpin(false);
      })
      .catch((err) => console.log(err));
  }, [searchQuery, genreData, selectedPlatform]);

  const handlePlatforms = (item: GameData) => {
    const newItem = (item as { parent_platforms: GamePlatforms[] })
      .parent_platforms;

    const rating = Math.round(item.rating * 20);
    return (
      <PlatformDiv>
        {newItem.map((element, index) => (
          <PlatformDivInner key={index}>
            {index < 3 ? (
              <Tooltip label={element.platform.name}>
                <PlatformImage
                  src={icons[element.platform.slug]}
                ></PlatformImage>
              </Tooltip>
            ) : (
              <PlatformSpan>
                {index == 3 ? (
                  <PlatformImage src={icons["plus"]}></PlatformImage>
                ) : (
                  <PlatformDivInner />
                )}
              </PlatformSpan>
            )}
          </PlatformDivInner>
        ))}
        <RatingDiv
          style={
            rating >= 90
              ? RatingDivGreen
              : rating >= 70
              ? RatingDivYellow
              : RatingDivRed
          }
        >
          {rating}
        </RatingDiv>
      </PlatformDiv>
    );
  };

  return (
    <>
      {emptySearch ? (
        <GamesDiv>Sorry there are no games that fit your search</GamesDiv>
      ) : (
        <GamesDiv>
          {!spin ? (
            <GamesDiv>
              {results?.map((item) => (
                <GameCardDiv key={item.name}>
                  <GameImage src={item.background_image}></GameImage>
                  <GameContent>
                    {handlePlatforms(item)}
                    <NameDiv>{item.name}</NameDiv>
                  </GameContent>
                </GameCardDiv>
              ))}
            </GamesDiv>
          ) : (
            <SpinnerDiv>
              <Spinner size="xl" />
            </SpinnerDiv>
          )}
        </GamesDiv>
      )}
    </>
  );
};

export default Games;
