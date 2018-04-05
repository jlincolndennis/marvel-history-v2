import md5 from 'md5';
import credentials from '../credentials.json';

class MarvelService {
  constructor($http) {
    this.$http = $http;
    this.time = new Date().getTime();
  }
  getFirstTime() {
    return this.time;
  }
  getSecondTime() {
    return this.time;
  }
  getComicsByDateRange() {
    const timeStamp = new Date().getTime();
    const baseUrl = 'https://gateway.marvel.com//v1/public/';
    const PUB_KEY = credentials.pubKey;
    const PRIV_KEY = credentials.privKey;
    const hash = md5(`${timeStamp}${PRIV_KEY}${PUB_KEY}`);

    const fullUrl = `${baseUrl}/comics?format=comic&formatType=comic&noVariants=true&dateRange=2015-01-01%2C2015-12-31&issueNumber=1&orderBy=onsaleDate&apikey=${PUB_KEY}&ts=${timeStamp}&hash=${hash}`;

    return this.$http.get(fullUrl);
    // return console.log(fullUrl);
  }
}

export default MarvelService;
