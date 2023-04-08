const chakram = require('chakram');
const expect = chakram.expect;

describe('each request should return a status code of 200', () => {
  it('get request for products should have status code of 200', () => {
    return chakram
              .get('http://localhost:3000/products')
              .then((result) => {
                expect(result).to.have.status(200);
              })
  })
  it('get request for a specific product should have status code of 200', () => {
    return chakram
              .get('http://localhost:3000/products/1')
              .then((result) => {
                expect(result).to.have.status(200);
              })
  })
  // it('get request for a product style should have status code of 200', () => {
  //   return chakram
  //             .get('http://localhost:3000/products/1/styles')
  //             .timeout(5000)
  //             .then((result) => {
  //               expect(result).to.have.status(200);
  //             })
  // })
  it('get request for a related item should have status code of 200', () => {
    return chakram
              .get('http://localhost:3000/products/1/related')
              .then((result) => {
                expect(result).to.have.status(200);
              })
  })
})