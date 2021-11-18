import NsGame from '../models/nsGame';          // Not Started
import FtGame from '../models/ftGame';          // Finished
import ClGame from '../models/clGame';          // Closed for bets

const finishedGamesTreatment = (gameId, gameStatus, gameDate, awayTeam, homeTeam, score) => {
    const isGameInDb = ClGame.findGameById(gameId);

    if (isGameInDb) {
        payBets(gameId);
        ClGame.DeleteGameById(gameId);
        const ftGame = new FtGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
        
        return ftGame.save();
    }
};

const notStartedGamesTreatment = (gameId, gameStatus, gameDate, awayTeam, homeTeam, odds) => {
    const isGameInDb = NsGame.findGameById(gameId);

    if (!isGameInDb) {
        const nsGame = new NsGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, odds);
        
        return nsGame.save();
    } 
};

const closedGamesTreatment = (gameId, gameStatus, gameDate, awayTeam, homeTeam, score) => {
    const isGameInDb = ClGame.findGameById(gameId);

    if (!isGameInDb) {
        const clGame = new ClGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
        
        return clGame.save();
    } 
};

const drawNotFoundTreatment = (values) => {
    if (values.length === 3) {
        return {
            home: values[0].odd,
            draw: values[1].odd,
            away: values[2].odd,
        }
    } else {
        return {
            home: values[0].odd,
            draw: null,
            away: values[1].odd,
        }
    }
}

const gameDataTreatment = (gamesData) => {
    for (let i = 0; i < gamesData.length; i++) {
        const gameId = gamesData[i].game.id;
        const gameStatus = gamesData[i].game.status.short;
        const gameDate = gamesData[i].game.date;
        const awayTeam = gamesData[i].game.teams.away;
        const homeTeam = gamesData[i].game.teams.home;
        const score = gamesData[i].game.scores;
        const odds = drawNotFoundTreatment(gamesData[i].bookmakers[0].bets[0].values);



        if (gameStatus === 'FT' || gameStatus === 'AOT') {
            finishedGamesTreatment(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
            
            continue;
        } else if (gameStatus === 'NS') {
            notStartedGamesTreatment(gameId, gameStatus, gameDate, awayTeam, homeTeam, odds);
            
            continue;
        } else if (gameStatus) {
            closedGamesTreatment(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
            
            continue;
        }
    }
};

export default gameDataTreatment;
