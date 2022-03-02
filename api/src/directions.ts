import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Response } from './models/system.model';
import { Errors } from './services/helpers/errors.resource';
import { env } from 'process';
import { DestinationParams } from './models/destination.model';
import { DirectionsAPI } from './services/directions.service';

const key = env.googleApiKey;

/**
 * Returns the route between 2 points 
 * @returns `Response` obj with item if exists
 */
export const get: APIGatewayProxyHandler = async (event, _context) => {
  try {
    if (event.body == null || event.body == '') { throw { statusCode: 400, message: Errors.Error_000 }; }

    const data = await DirectionsAPI.get(key, JSON.parse(event.body) as DestinationParams);
    return new Response(200, { status: 200, message: 'success', data });
  } catch (error) {
    return new Response(200, { status: error.statusCode, message: error.message, error: error });
  }
}
