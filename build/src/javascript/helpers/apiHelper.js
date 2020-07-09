import { fightersDetails, fighters } from './mockData';
const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';
const useMockAPI = false;
async function callApi(endpoint, method) {
    const url = API_URL + endpoint;
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
async function fakeCallApi(endpoint) {
    let response = endpoint === 'fighters.json' ? fighters.map(fighter => getFighterById(fighter._id)) : getFighterById(endpoint);
    return new Promise((resolve, reject) => {
        setTimeout(() => (response ? resolve(response) : reject(Error('Failed to load'))), 500);
    });
}
function getFighterById(endpoint) {
    const start = endpoint.lastIndexOf('/');
    const end = endpoint.lastIndexOf('.json');
    const id = endpoint.substring(start + 1, end);
    const fighter = fightersDetails.find(it => it._id === id);
    return fighter;
}
export { callApi, getFighterById };