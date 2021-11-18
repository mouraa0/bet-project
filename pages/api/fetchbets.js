import axios from 'axios';
import cron from 'node-cron';

export default async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api-basketball.p.rapidapi.com/odds',
        params: {league: '12', season: '2021-2022', bookmaker: '3', bet: '1'},
        headers: {
          'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
          'x-rapidapi-key': '956c8784bemsh98a97cadaff4dd2p12f979jsna9c01ecaa7e5'
        }
      };
      // cron.schedule('0 0/30 * 1/1 * ? *', () => {
        axios(options).then(function (response) {
          console.log(res.send(response.data));
        }).catch(function (error) {
          console.error(error);
      });
      // });
};
