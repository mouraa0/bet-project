import Layout from "../components/Layout";
import { useState } from "react";

export default function Login() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const submitHandler = async (event) => {
        event.preventDefault();

        // fetch(
        //     '/api/signup',
        //     {
        //         body: JSON.stringify({
        //             email: enteredEmail,
        //             password: enteredPassword,
        //         }),
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         method: 'POST'
        //     }
        // )

        setEnteredEmail('');
        setEnteredPassword('');

    };

    return (
        <Layout>
            <div className='flex flex-col'>
                <h1 className='text-center mt-6'>Login</h1>
                <form onSubmit={submitHandler} className='flex flex-col mt-4'>
                    <label htmlFor='email'>Email</label>
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
                    <button type='submit' className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' >Login</button>
                </form>
            </div>
        </Layout>
    );
}
