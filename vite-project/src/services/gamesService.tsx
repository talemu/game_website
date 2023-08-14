import create from "./http-service";

export interface GameData {
  id: number;
  name: string;
  background_image: string;
  results: any;
  parent_platforms: any[];
  rating: number;
}

export interface GamePlatforms {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export function containsString(obj: { [x: string]: any }, targetString: any) {
  for (const key in obj) {
    if (typeof obj[key] === "string" && obj[key].includes(targetString)) {
      return true;
    } else if (typeof obj[key] === "object") {
      if (containsString(obj[key], targetString)) {
        return true;
      }
    }
  }
  return false;
}

export default create("/games");
