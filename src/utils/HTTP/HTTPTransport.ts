import { queryStringify } from '../Helpers/myDash';
import { PATH, HEADERS } from '../../consts';

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export type Options = {
  method?: Method;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | string | FormData;
  timeout?: number;
  withCredentials?: boolean;
  id?: number;
};

export default class HTTPTransport {
  baseUrl: string;

  constructor(pathName?: string) {
    this.baseUrl = pathName ? PATH.baseurl + pathName : PATH.baseurl;
  }

  public get(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    let urlWithParams = url;

    if (options.data && Object.keys(options.data).length) {
      urlWithParams = `${url}?${queryStringify(options.data as Record<string, unknown>)}`;
    }

    return this.request(this.baseUrl + urlWithParams, { ...options, method: Method.GET });
  }

  public post(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(this.baseUrl + url, { ...options, method: Method.POST });
  }

  public put(url: string, options: Options | FormData = {}): Promise<XMLHttpRequest> {
    return this.request(this.baseUrl + url, { ...options, method: Method.PUT });
  }

  public delete(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(this.baseUrl + url, { ...options, method: Method.DELETE });
  }

  private request(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    const { method,
      data,
      headers = HEADERS.JSON,
      timeout = 2000,
      withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        throw new Error('Method must be specified');
      }

      xhr.open(method, url);

      xhr.timeout = timeout;

      xhr.onload = () => (xhr.status >= 300 ? reject(xhr) : resolve(xhr));
      xhr.onabort = () => reject(new Error(`aborted query to ${url}`));
      xhr.onerror = () => reject(new Error(`HTTP query to ${url}`));
      xhr.ontimeout = () => reject(new Error(`query to ${url} timed out ${timeout} ms`));

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        let outputData = data;

        if (headers['Content-Type'] === 'application/json') {
          outputData = JSON.stringify(data);
        }

        xhr.send(outputData as any);
      }
    });
  }
}
