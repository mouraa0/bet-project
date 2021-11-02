import Link from 'next/link';

export default function NavBar() {
    return (
        <> 
            <nav className='flex items-center flex-wrap bg-blue-500 p-3'>
                <Link href='/' >
                    <a className='inline-flex items-center p-2 mr-4' >
                        <span className='text-xl text-white font-bold uppercase tracking-wide'>BetProject</span>
                    </a>
                </Link>
                <div className='hidden w-full lg:inline-flex lg:flex-grow lg:w-auto'>
                    <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto'>
                        <Link href='/'>
                            <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:text-blue-700' >
                                Home
                            </a>
                        </Link>
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
                    </div>
                </div>
            </nav>
        </>
    );
}
