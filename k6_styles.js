import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '1ms', target: 100 },
    { duration: '20s', target: 0 },
  ],
}

export default function () {
  http.batch([
    {method: 'GET', url: 'http://3.88.14.36/products'},
    {method: 'GET', url: 'http://54.205.107.230/products/1'},
    {method: 'GET', url: 'http://54.205.107.230/products/1/styles'},
    {method: 'GET', url: 'http://54.205.107.230/products/1/related'}
  ])
  sleep(1);
}
