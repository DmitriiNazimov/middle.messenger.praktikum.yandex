/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
enum Method {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        PATCH = 'PATCH',
        DELETE = 'DELETE'
}

type Options = {
    method?: Method;
    headers?: Record<string, string>;
    data?: {};
    timeout?: number;
};

class HTTPTransport {
  public get(url:string, options: Options): Promise<XMLHttpRequest> {
    let urlWithParams;

    if (options.data && Object.keys(options.data).length) {
      urlWithParams = `${url}?${this.queryStringify(options.data)}`;
    }

    return this.request(urlWithParams ?? url, { ...options, method: Method.GET });
  }

  public post(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Method.POST });
  }

  public put(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Method.PUT });
  }

  public delete(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Method.DELETE });
  }

  // eslint-disable-next-line class-methods-use-this
  private request(url: string, options: Options): Promise<XMLHttpRequest> {
    const { method, data, headers = {}, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        throw new Error('Method must be specified');
      }

      xhr.open(method, url);

      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);
      xhr.onabort = () => reject(new Error(`aborted query to ${url}`));
      xhr.onerror = () => reject(new Error(`HTTP query to ${url}`));
      xhr.ontimeout = () => reject(new Error(`query to ${url} timed out ${timeout} ms`));

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as any);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private queryStringify(data: {}): string {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    return Object.entries(data).map(([key, value]) => `${key}=${value}&`).join('').slice(0, -1);
  }
}
