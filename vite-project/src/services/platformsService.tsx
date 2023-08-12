import create from "./http-service";

export interface PlatformParentItem {
  id: number;
  name: string;
  slug: string;
  platforms: any[];
}

export default create("/platforms/lists/parents");
