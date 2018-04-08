import md5 from 'md5';
import credentials from '../credentials.json';

class MarvelService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
    this.time = new Date().getTime();
    this.baseUrl = 'https://gateway.marvel.com//v1/public/';
    this.goldenAgeResults = [];
  }
  getComicsByDateRange(query) {
    if (this.goldenAgeResults.length === 0) {
      return this.buildGoldenAge(query);
    }
    console.log('Did not have to build');
    return this.$q(() => this.goldenAgeResults);
  }
  buildGoldenAge(query) {
    console.log('Building Golden Age Results');
    const { start, end } = query;
    const goldenStart = '1939';
    const goldenEnd = '1955';
    return this.$http.get(this.buildDateCall(`${goldenStart}-${start}`, `${goldenEnd}-${end}`))
      .then((res) => {
        console.log('Done building', res);
        this.goldenAgeResults = res;
        return res;
      });
  }
  buildDateCall(date1, date2) {
    const timeStamp = new Date().getTime();
    const { PUB_KEY, PRIV_KEY } = credentials;
    const hash = md5(`${timeStamp}${PRIV_KEY}${PUB_KEY}`);
    const callParams = 'comics?format=comic&formatType=comic&noVariants=true&issueNumber=1&orderBy=onsaleDate';
    const dateParams = `&dateRange=${date1}%2C${date2}`;
    const callAuth = `&apikey=${PUB_KEY}&ts=${timeStamp}&hash=${hash}`;
    const fullUrl = `${this.baseUrl}${callParams}${dateParams}${callAuth}`;
    return fullUrl;
  }
}

export default MarvelService;

// I want these dates from this age

// see if we have results stored for that age
// if we do, send them to be filtered
// if we don't, go get them, then check again

// take all the age's results
// filter them by dates provided

// send filtered results back
