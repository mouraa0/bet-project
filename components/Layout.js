import Card from "./Card";
import NavBar from "./NavBar";

export default function Layout({ children }) {
    return (
        <div className='bg-purple-400 min-h-screen h-auto'>
            <NavBar />
            <div className='flex justify-center'>
                <Card>{children}</Card>
            </div>
        </div>
    );
}
