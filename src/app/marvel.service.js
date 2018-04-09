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
    return this.$q((resolve, reject) => resolve(this.goldenAgeResults));
  }

  buildGoldenAge(query) {
    console.log('Building Golden Age Results');
    const { start, end } = query;
    const goldenStart = '1939';
    const goldenEnd = '1955';
    return this.$http.get(this.buildDateCall(`${goldenStart}-${start}`, `${goldenEnd}-${end}`))
      .then((res) => {
        this.goldenAgeResults = this.buildIssues(res.data.data.results);
        return this.goldenAgeResults;
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

  buildIssues(issues) {
    const results = issues.map((issue) => {
      const pubCode = issue.dates[0].date;
      const pubDate = pubCode.substr(5, 5);
      const pubYear = pubCode.substr(0, 4);
      const img = issue.images[0];
      let imgUrl = null;
      if (img) imgUrl = `${img.path}/portrait_incredible.${img.extension}`;

      return {
        title: issue.title,
        url: issue.urls[0].url,
        description: issue.description,
        pubYear,
        pubDate,
        pubCode,
        image: imgUrl,
      };
    });
    return results;
  }

  filterResults(date1, date2, toBeFiltered) {
    const results = toBeFiltered.filter(issue => issue.pubDate >= date1 && issue.pubDate <= date2);
    return results;
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
