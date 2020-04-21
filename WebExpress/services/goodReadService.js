const axios = require('axios');
const xml2Js = require('xml2js');
const debug = require('debug')('app:goodReadService');

const parser = xml2Js.Parser({ explicitArray: false });

function goodReadService() {
  function getById(bookId) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=${process.env.GOODREAD_API_KEY}`)
        .then((res) => {
          parser.parseStringPromise(res.data).then((result, err) => {
            if (err) {
              debug('Error occured in parsing api', err);
              reject(err);
            }
            resolve(result.GoodreadsResponse.book);
          });
        }).catch((err) => {
          debug('Error occured in calling book read api', err);
          reject(err);
        });
    });
  }

  function searchBooks(queryTerm) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/search/index.xml?key=${process.env.GOODREAD_API_KEY}&q=${queryTerm}&search[field]=title&result-end=50`)
        .then((res) => {
          parser.parseStringPromise(res.data).then((result, err) => {
            if (err) {
              debug('Error occured in parsing api ', err);
              reject(err);
            }
            resolve(result.GoodreadsResponse.search.results.work);
          });
        }).catch((err) => {
          debug('Error occured in calling books api', err);
          reject(err);
        });
    });
  }

  return {
    getById,
    searchBooks,
  };
}

module.exports = goodReadService();
