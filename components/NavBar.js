import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

export default function NavBar(props) {
    const [session, loading] = useSession();
    if (session) {
        const profileURL = `/user/${session.user.name._id}`
    }
    
    return (
        <> 
            <nav className='flex items-center flex-wrap bg-blue-500 p-3'>
                <Link href='/' >
                    <a className='inline-flex items-center p-2 mr-4' >
                        <span className='text-xl text-white font-bold tracking-wide'>BetProject</span>
                    </a>
                </Link>
                <div className='hidden w-full lg:inline-flex lg:flex-grow lg:w-auto'>
                    <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto'>
                        <Link href='/'>
                            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:text-blue-700' >
                                Home
                            </a>
                        </Link>
                        {!session && !loading && (
                            <>
                                <Link href='/login'>
                                    <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:text-blue-700' >
                                        Login
                                    </a>
                                </Link>
                                <Link href='/signup'>
                                    <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:text-blue-700' >
                                        SignUp
                                    </a>
                                </Link>
                            </>
                        )}
                        {session && (
                            <>
                                <Link href={profileURL}>
                                    <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:text-blue-700' >
                                        Profile
                                    </a>
                                </Link>
                                <a onClick={() => signOut()} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:text-blue-700' >
                                        Logout
                                </a>
                            </>
                        )}
                        
                    </div>
                </div>
            </nav>
        </>
    );
}
