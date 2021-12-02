import { useState } from 'react';
import Button from '../components/UI/Button';

export default function SignUp() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        fetch(
            '/api/auth/signup',
            {
                body: JSON.stringify({
                    username: enteredUsername,
                    email: enteredEmail,
                    password: enteredPassword
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )
        setEnteredUsername('');
        setEnteredEmail('');
        setEnteredPassword('');
    };

    return (
        <div className='flex flex-col'>
            <h1 className='text-center mt-6'>SignUp</h1>
            <form onSubmit={submitHandler} className='flex flex-col mt-4'>
                <label htmlFor='username'>Username</label>
                <input
                    className='border-2 border-gray-300 shadow rounded w-80 py-2 px-3 focus:outline-none focus:shadow-outline focus:border-black'
                    type='username'
                    id='username'
                    value={enteredUsername}
                    onChange={(event) => {setEnteredUsername(event.target.value)}}
                />
                <label htmlFor='email' className='mt-2'>Email</label>
                <input
                    className='border-2 border-gray-300 shadow rounded w-80 py-2 px-3 focus:outline-none focus:shadow-outline focus:border-black'
                    type='email'
                    id='email'
                    value={enteredEmail}
                    onChange={(event) => {setEnteredEmail(event.target.value)}}
                />
                <label htmlFor='password' className='mt-2' >Password</label>
                <input
                    className='border-2 border-gray-300 shadow rounded w-80 py-2 px-3 focus:outline-none focus:shadow-outline focus:border-black'
                    type='password'
                    id='password'
                    value={enteredPassword}
                    onChange={(event) => {setEnteredPassword(event.target.value)}}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
}
