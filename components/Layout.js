import Card from "./Card";
import NavBar from "./NavBar";

export default function Layout({ children }) {
    return (
        <div className=' min-h-screen h-auto'>
            <NavBar />
            <div className='flex justify-center'>
                {children}
            </div>
        </div>
    );
}
