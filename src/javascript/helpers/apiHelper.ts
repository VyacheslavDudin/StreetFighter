import { fighterType } from './../../../customTypes';
import { fightersDetails, fighters } from './mockData';

const API_URL: string = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';
const useMockAPI: boolean = false;

type fightersResult = fighterType[] | fighterType;
  


async function callApi(endpoint: string, method: string): Promise<fightersResult> {
  const url: string = API_URL + endpoint;
  const options = {
    method,
  };

  return useMockAPI
    ? fakeCallApi(endpoint)
    : fetch(url, options)
        .then(response => (response.ok ? response.json() : Promise.reject(Error('Failed to load'))))
        .then(result => JSON.parse(atob(result.content)))
        .catch(error => {
          throw error;
        });
}

async function fakeCallApi(endpoint: string): Promise<typeof response>{
  let response = endpoint === 'fighters.json' ? fighters.map(fighter => getFighterById(fighter._id)) : getFighterById(endpoint);
  return new Promise((resolve, reject) => {
    setTimeout(() => (response ? resolve(response) : reject(Error('Failed to load'))), 500);
  });
}

function getFighterById(endpoint: string) {
  const start: number = endpoint.lastIndexOf('/');
  const end: number = endpoint.lastIndexOf('.json');
  const id: string = endpoint.substring(start + 1, end);
  const fighter: fighterType = fightersDetails.find(it => it._id === id)!;
  return fighter;
}

export { callApi, getFighterById };
