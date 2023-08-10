import apiClient from "./api.client";

//This class will work as a generic service file for http requests from the api
class HTTPService {
  endpoint: string;

  //constructor takes string endpoint extension
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  //gets all objects from the api request
  getAll<T>() {
    //Abort Controller handles user cancels
    const controller = new AbortController();
    //api request
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const create = (endpoint: string) => new HTTPService(endpoint);

export default create;
