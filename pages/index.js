import clientPromise from '../lib/mongodb'
import BetCard from '../components/BetCard';

export default function Home(props) {  
    const notStartedGameList = props.gamesData;

    return (
      <div className='flex grid grid-cols-1 p-2 self-center'>
        {notStartedGameList.map((game, key) => {
          return (
            <div className='mt-10' key={key}>
              <BetCard gameData={game} />
            </div>
          );  
        })
        }
      </div>
    );  
}

export async function getServerSideProps(context) {
  const client = await clientPromise
  const isConnected = await client.isConnected()
  const notStartedGamesListData = await fetch('http://localhost:3000/api/getdbgames', {});
  const notStartedGamesList = await notStartedGamesListData.json();

  return {
    props: { 
      isConnected,
      gamesData: notStartedGamesList,
    },
  }
};
