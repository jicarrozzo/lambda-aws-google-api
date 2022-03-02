import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Response } from './models/system.model';
import { Errors } from './services/helpers/errors.resource';
import { env } from 'process';
import { Places } from './services/places.service';

const key = env.googleApiKey;

/**
 * Returns the 
 * @returns `Response` obj with item if exists
 */
export const get: APIGatewayProxyHandler = async (event, _context) => {
  try {
    if (event.pathParameters.placeid == null || event.pathParameters.placeid == '') { throw { statusCode: 400, message: Errors.Error_001 }; }
    try {
      const data = await Places.get(key, event.pathParameters.placeid);

      return new Response(200, { status: 200, message: 'success', data });
    } catch (error) {
      return new Response(200, { status: 200, message: 'success', error });
    }
  } catch (error) {
    return new Response(200, { status: error.statusCode, message: error.message, error });
  }
}

/**
 * 
 * @returns 
 */
export const autocomplete: APIGatewayProxyHandler = async (event, _context) => {
  try {
    if (event.pathParameters.input == null || event.pathParameters.input == '') { throw { statusCode: 400, message: Errors.Error_001 }; }
    try {
      const data = await Places.autocomplete(key, event.pathParameters.input);

      return new Response(200, { status: 200, message: 'success', data });
    } catch (error) {
      return new Response(200, { status: 200, message: 'success', error });
    }
  } catch (error) {
    return new Response(200, { status: error.statusCode, message: error.message, error });
  }
}

