import React, { useEffect, useState } from "react";
import styled from "styled-components";
import gamesService, {
  GameData,
  GamePlatforms,
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
import { Tooltip } from "@chakra-ui/react";

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

interface Props {
  genreData: any;
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

const Games = ({ genreData }: Props) => {
  //   const [response, setResponse] = useState<Response>();
  const [results, setResults] = useState<GameData[]>();

  useEffect(() => {
    const { request, cancel } = gamesService.getAll();
    request
      .then((response: Response) => {
        const newResults = (response.data as { results: GameData[] }).results;
        setResults(newResults);
      })
      .catch((err) => console.log(err));
  }, [genreData]);

  const handlePlatforms = (item: GameData) => {
    const newItem = (item as { parent_platforms: GamePlatforms[] })
      .parent_platforms;

    const rating = Math.round(item.rating * 20);
    console.log(item);
    return (
      <PlatformDiv>
        {newItem.map((element, index) => (
          <PlatformDivInner>
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
    // {newItem.map((item) => item.platform.name)}
  };

  return (
    <GamesDiv>
      {results?.map((item) => (
        <GameCardDiv>
          <GameImage src={item.background_image}></GameImage>
          <GameContent>
            {handlePlatforms(item)}
            <NameDiv>{item.name}</NameDiv>
          </GameContent>
        </GameCardDiv>
      ))}
    </GamesDiv>
  );
};

export default Games;
