import HTTPTransport from './HTTPTransport';

const http = new HTTPTransport('https://jsonplaceholder.typicode.com');

describe('utils/HTTPTransport', () => {
  it('should send GET request by XHR', (done) => {
    http
      .get('/users/1')
      .then(({ response }) => {
        if (!response.includes('"id"')) {
          done('Response is incorrect.');
          return;
        }

        done();
      })
      .catch(({ response }) => {
        done(response);
      });
  });

  it('should send POST request by XHR', (done) => {
    http
      .post('/users')
      .then(({ response }) => {
        if (!response.includes('"id"')) {
          done('Response is incorrect.');
          return;
        }

        done();
      })
      .catch(({ response }) => {
        done(response);
      });
  });

  it('should send PUT request by XHR', (done) => {
    http
      .put('/users/1')
      .then(({ response }) => {
        if (!response.includes('"id"')) {
          done('Response is incorrect.');
          return;
        }

        done();
      })
      .catch(({ response }) => {
        done(response);
      });
  });

  it('should send DELETE request by XHR', (done) => {
    http
      .delete('/users/1')
      .then(({ response }) => {
        if (!response.includes('{}')) {
          done('Response is incorrect.');
          return;
        }

        done();
      })
      .catch(({ response }) => {
        done(response);
      });
  });
});
