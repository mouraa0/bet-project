export default function Card({ children }) {
    return(
        <div className='flex bg-white border rounded rounded-t-none shadow-lg h-auto w-9/12 pb-20 justify-center'>
            {children}
        </div>
    );
}
