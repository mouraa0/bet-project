import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function Profile(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [myProfile, setMyProfile] = useState(false);
    const router = useRouter();
    const profileId = router.query.userid;
    const { userData } = props;

    useEffect(() => {
        getSession().then(session => {
            setIsLoading(false);
            if (session) {
                const userId = session.user.name._id;
                if (profileId === userId) {
                    setMyProfile(true);
                }
            }
        })
    }, [])

    if (!userData) {
        return <p>Loading...</p>
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (myProfile) {
        return <div>Welcome, {userData.username}</div>
    } else {
        return <div>Welcome to {userData.username} profile!</div>
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    const profileId = await params.userid; 
    const res = await fetch(
            'http://localhost:3000/api/getuserdata',
            {
                body: JSON.stringify({
                    id: profileId
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
    );

    const userData = await res.json();

    return {
        props: {
            userData,
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { userid: ''}}
        ],
        fallback: true
    };
}
