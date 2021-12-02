const Button = ({children, onClick, type, className}) => {
    return (
        <button 
            onClick={onClick}
            type={type} 
            className={`${className} mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} 
        >
            {children}
        </button>
    );
};

export default Button;
