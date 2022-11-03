/* eslint-disable no-unused-vars */
import HTTPTransport, { Options as HttpOptions } from '../utils/HTTP/HTTPTransport';

export default abstract class BaseAPI {
  http: HTTPTransport;

  constructor(pathName: string) {
    this.http = new HTTPTransport(pathName);
  }
}
