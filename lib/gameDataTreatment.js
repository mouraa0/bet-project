import NotStartedGame from '../models/notStartedGame';          // Not Started
import FinishedGame from '../models/finishedGame';              // Finished
import ClosedGame from '../models/closedGame';                  // Closed for bets
import payBets from './payBets';
import Logos from '../models/logos';

const finishedGamesTreatment = async (gameId, gameStatus, gameDate, awayTeam, homeTeam, score) => {
    const isGameInFinishedDb = await FinishedGame.findGameById(gameId);
    if (!isGameInFinishedDb) {
        const isGameInClosedDb = await ClosedGame.findGameById(gameId);
        if(isGameInClosedDb) {
            payBets(gameId);
            await ClosedGame.deleteGameById(gameId);
        }
        const isGameInNotStartedDb = await NotStartedGame.findGameById(gameId);
        if(isGameInNotStartedDb) {
            payBets(gameId);
            await NotStartedGame.deleteGameById(gameId);
        }

        const ftGame = new FinishedGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
        
        return ftGame.save();
    }

    return;
};

const notStartedGamesTreatment = async (gameId, gameStatus, gameDate, awayTeam, homeTeam, odds) => {
    const isGameInNotStartedDb = await NotStartedGame.findGameById(gameId);

    if (!isGameInNotStartedDb) {
        const nsGame = new NotStartedGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, odds);
        
        return nsGame.save();
    }

    return;
};

const closedGamesTreatment = async (gameId, gameStatus, gameDate, awayTeam, homeTeam, score) => {
    const isGameInClosedDb = await ClosedGame.findGameById(gameId);



    if (!isGameInClosedDb) {
        const isGameInNotStartedDb = await NotStartedGame.findGameById(gameId);
        if (isGameInNotStartedDb) {
            await NotStartedGame.deleteGameById(gameId);
        }
        const clGame = new ClosedGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
        
        return clGame.save();
    }

    return;
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

const gameDataTreatment = async (gamesData) => {
    for (let i = 0; i < gamesData.length; i++) {
        const gameId = gamesData[i].game.id;
        const gameStatus = gamesData[i].game.status.short;
        const gameDate = gamesData[i].game.date;
        const awayTeamIncomplete = gamesData[i].game.teams.away;
        const homeTeamIncomplete = gamesData[i].game.teams.home;
        const score = gamesData[i].game.scores;
        const odds = drawNotFoundTreatment(gamesData[i].bookmakers[0].bets[0].values);

        const awayTeam = await Logos.getLogoCorrect(awayTeamIncomplete);
        const homeTeam = await Logos.getLogoCorrect(homeTeamIncomplete);

        if (gameStatus === 'FT' || gameStatus === 'AOT') {
            await finishedGamesTreatment(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
            // const ftGame = new FinishedGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, score)
            // ftGame.save();

            continue;
        } else if (gameStatus === 'NS') {
            await notStartedGamesTreatment(gameId, gameStatus, gameDate, awayTeam, homeTeam, odds);
            // const nsGame = new NotStartedGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, odds);
            // nsGame.save();
            
            continue;
        } else if (gameStatus) {
            await closedGamesTreatment(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
            // const clGame = new ClosedGame(gameId, gameStatus, gameDate, awayTeam, homeTeam, score);
            // clGame.save();
            
            continue;
        }
    }
};

export default gameDataTreatment;
