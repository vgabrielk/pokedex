import axios from 'axios';
const version = 'v2'
const pokeApiUrl = `https://pokeapi.co/api/${version}/`
const api = axios.create({
    baseURL: pokeApiUrl,
    headers: {
        Accept: 'application/json'
    }
})

export { api, pokeApiUrl };