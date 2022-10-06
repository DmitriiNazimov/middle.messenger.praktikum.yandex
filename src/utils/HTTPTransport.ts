/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
enum METHOD {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        PATCH = 'PATCH',
        DELETE = 'DELETE'
}

type Options = {
    method?: METHOD;
    headers?: { [key: string]: string };
    data?: {};
    timeout?: number;
};

function queryStringify(data: {}): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return Object.entries(data).map(([key, value]) => `${key}=${value}&`).join('').slice(0, -1);
}

class HTTPTransport {
  public get(url:string, options: Options): Promise<XMLHttpRequest> {
    let urlWithParams;

    if (options.data && Object.keys(options.data).length) {
      urlWithParams = `${url}?${queryStringify(options.data)}`;
    }

    return this.request(urlWithParams ?? url, { ...options, method: METHOD.GET }, options.timeout);
  }

  public post(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  public put(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  public delete(url:string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }

  // eslint-disable-next-line class-methods-use-this
  private request(url: string, options: Options, timeout: number = 5000): Promise<XMLHttpRequest> {
    const { method, data, headers = {} } = options;

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

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as any);
      }
    });
  }
}
