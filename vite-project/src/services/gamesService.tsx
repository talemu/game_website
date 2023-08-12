import create from "./http-service";

export interface GameData {
  name: string;
  background_image: string;
  results: any;
  parent_platforms: any[];
}

export interface GamePlatforms {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export default create("/games");
