import type { UserWithId } from "./auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
  }
}

export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  name: string;
  description: string | null;
} & LatLongItem;

export type NominatimResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: 1543125;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: 8;
  importance: 0.82108616521785;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};
