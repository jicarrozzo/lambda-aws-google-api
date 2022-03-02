import { Client, PlaceAutocompleteType } from "@googlemaps/google-maps-services-js";

export namespace Places {


  export const get = async (key: string, placeId: string, fields: string[] = []) => {
    const client = new Client({});

    try {
      const response = await client
        .placeDetails({
          params: {
            place_id: placeId,
            key,
            fields
          }
        });
      return response.data.result;

    } catch (error) {
      throw error;
    }
  }

  export const autocomplete = async (key: string, input: string) => {
    const client = new Client({});

    try {
      const response = await client
        .placeAutocomplete({
          params: {
            input,
            key,
            types: PlaceAutocompleteType.regions
          },
        });
      return response.data.predictions;

    } catch (error) {
      throw error;
    }
  }

}