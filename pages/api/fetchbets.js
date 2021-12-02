import axios from 'axios';
import cron from 'node-cron';
import cronTime from "cron-time-generator"
import gameDataTreatment from '../../lib/gameDataTreatment';

export default async (req, res) => {
    const key = process.env.RAPIDKEY

    const options = {
        method: 'GET',
        url: 'https://api-basketball.p.rapidapi.com/odds',
        params: {league: '12', season: '2021-2022', bookmaker: '3', bet: '1'},
        headers: {
          'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
          'x-rapidapi-key': key
        }
      };

    // cron.schedule(cronTime.every(30).minutes(), () => {
      axios(options).then(function (response) {
        gameDataTreatment(response.data.response);
        console.log('working!');
      }).catch(function (error) {
        console.error(error);
      });
    // });
};
