import { useRouter } from 'next/dist/client/router';
import { getSession } from 'next-auth/client';

export default function GamePage(props) {
    const router = useRouter();
    const gameId = router.query.userid;
    const { gameData } = props;
    
    return (<div></div>);
}

export async function getStaticProps(context) {
    const { params } = context;
    const gameId = await params.gameid;
    const res = await fetch(
        'http://localhost:3000/api/getgamebyid',
        {
            body: JSON.stringify({
                id: gameId
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }
    );

    const gameData = await res.json();

    return {
        props: {
            gameData,
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { userid: '' }}
        ],
        fallback: true
    }
}