import axios from 'axios';
import * as URLs from "../constants/URLs";

export const checkOnline = () => {
  return axios.get(URLs.PING_URL) 
    .then(()=> true)
    .catch(()=> true);  
} 

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
