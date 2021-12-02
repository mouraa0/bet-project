import TeamInfo from './TeamInfo';
import MatchInfo from './MatchInfo';
import styles from './BetCard.module.css'

const BetCard = (props) => {
    const { awayTeam, homeTeam, date, odds, gameId } = props.gameData;
    const formDate = new Date(date).toLocaleDateString();
    const formHour = new Date(date).toLocaleTimeString();

    const buttonHandler = () => {
        console.log('works')
    };

    return (
        <div className={styles.container}>
            <TeamInfo logo={awayTeam.logo} name={awayTeam.name} odds={odds.away} />
            <MatchInfo date={formDate} hour={formHour} gameId={gameId} />
            <TeamInfo logo={homeTeam.logo} name={homeTeam.name} odds={odds.home} />
        </div>
        
        
        // <div className='flex justify-center bg-gray-200 rounded w-auto h-auto px-4 py-0'>
        //     <TeamInfo logo={awayTeam.logo} name={awayTeam.name} odds={odds.away} />
        //     <div className='my-24'>
        //         <p className='flex justify-center'>{formDate}</p>
        //         <p className='flex justify-center'>VS</p>
        //         <h5 className='flex justify-center font-bold'>{odds.draw}</h5>
        //         <div className='flex justify-center'>
        //             <Button onClick={buttonHandler}>Bet!</Button>
        //         </div>
        //     </div>
        //     <TeamInfo logo={homeTeam.logo} name={homeTeam.name} odds={odds.home} />
        // </div>
    );
};

export default BetCard;
