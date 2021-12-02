import Image from 'next/image';
import TeamInfo from './TeamInfo';
import Button from './UI/Button';

const BetCard = (props) => {
    const { awayTeam, homeTeam, date, odds } = props.gameData;
    const formDate = new Date(date).toLocaleDateString();

    const buttonHandler = () => {
        console.log('works')
    };

    return (
        <div className='flex justify-center bg-gray-200 rounded w-auto h-auto px-4 py-0'>
            <TeamInfo logo={awayTeam.logo} name={awayTeam.name} odds={odds.away} />
            <div className='my-24'>
                <p className='flex justify-center'>{formDate}</p>
                <p className='flex justify-center'>VS</p>
                <h5 className='flex justify-center font-bold'>{odds.draw}</h5>
                <div className='flex justify-center'>
                    <Button onClick={buttonHandler}>Bet!</Button>
                </div>
            </div>
            <TeamInfo logo={homeTeam.logo} name={homeTeam.name} odds={odds.home} />
        </div>
    );
};

export default BetCard;
