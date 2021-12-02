import Image from 'next/image';

const TeamInfo = (props) => {
    return (
        <>
            <div className='m-6 py-12 bg-white rounded shadow border w-48'>
                <div className='flex justify-center' >
                    <Image 
                        src={props.logo}
                        alt={props.name}
                        width={100}
                        height={100}
                    />
                </div>
                    <h4 className='flex text-3x1 font-bold mb-2 mt-2 justify-center'>{props.name}</h4>
                    <p className='flex justify-center text-sm font-bold text-green-700' >{props.odds}</p>
            </div>
        </>
    );
};

export default TeamInfo;
