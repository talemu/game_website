import create from "./http-service";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export interface data {}

export default create("/genres");
