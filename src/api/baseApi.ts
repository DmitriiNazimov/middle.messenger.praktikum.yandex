import HTTPTransport from '../utils/HTTP/HTTPTransport';

export default abstract class BaseAPI {
  http: HTTPTransport;

  constructor(pathName: string) {
    this.http = new HTTPTransport(pathName);
  }
}
