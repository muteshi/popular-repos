import axios from "axios";
import { baseUrl } from "../config.json";

//get repositories from github
export function getRepositories() {
  return axios.get(`${baseUrl}/repositories`);
}

export function getRepositoryStars(url) {
  return axios.get(url);
}

export function getRepository(url) {
  return axios.get(url);
}
