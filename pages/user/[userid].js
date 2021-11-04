import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function Profile(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [myProfile, setMyProfile] = useState(false);
    const router = useRouter();
    const profileId = router.query.userid;
    let text;

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

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (myProfile) {
        text = `Welcome, ${props.userData.username}!`
    } else {
        text = `Welcome to ${props.userData.username} profile!`
    }

    return <div>{text}</div>
}

export async function getStaticProps(context) {
    const { params } = context;
    const profileId = await params.userid; 
    const res = await fetch(
            'http://localhost:3000/api/getdata',
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
            { params: { userid: '6183c34cb04c673b28756d66'}}
        ],
        fallback: true
    };
}