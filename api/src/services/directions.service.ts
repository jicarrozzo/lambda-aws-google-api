import { Client, TravelMode } from "@googlemaps/google-maps-services-js";
import { DestinationParams } from "../models/destination.model";

export namespace DirectionsAPI {

  export const get = async (key: string, data: DestinationParams) => {
    const client = new Client({});

    const waypoints = data.waypoints ?? [];
    try {
      const ret = await client
        .directions({
          params: {
            key,
            origin: `place_id:${data.origin}`,
            destination: `place_id:${data.destination}`,
            waypoints: waypoints.map(x => `place_id:${x}`),
            optimize: true,
            mode: TravelMode.driving
          }
        });

      return ret.data;

    } catch (error) {
      throw error;
    }
  }
}