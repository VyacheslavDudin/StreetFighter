import { fighterType } from './../../../customTypes';
import { callApi, getFighterById } from '../helpers/apiHelper';

class FighterService {
  async getFighters(): Promise<fighterType[]> {
    try {
      const endpoint: string = 'fighters.json';
      const apiResult = <fighterType[]>(await callApi(endpoint, 'GET'));

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id: string) {
    try {
      const endpoint: string = `details/fighter/${id}.json`;
      const apiResult = await getFighterById(endpoint);

      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
