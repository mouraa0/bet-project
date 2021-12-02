import Image from 'next/image';
import styles from './TeamInfo.module.css';

const TeamInfo = (props) => {
    return (
        <>
            <div className={styles.cont}>
                <div className={styles.cont__img}>
                    <Image 
                        src={props.logo}
                        alt={props.name}
                        width={100}
                        height={100}
                    />
                </div>
                <div className={styles.cont__name}>
                    {props.name}
                </div>
                <div className={styles.cont__odds}>
                    {props.odds}
                </div>
            </div>
        </>
        
        
        // <>
        //     <div className='m-6 py-12 bg-white rounded shadow border w-48'>
        //         <div className='flex justify-center' >
        //             <Image 
        //                 src={props.logo}
        //                 alt={props.name}
        //                 width={100}
        //                 height={100}
        //             />
        //         </div>
        //             <h4 className='flex text-3x1 font-bold mb-2 mt-2 justify-center'>{props.name}</h4>
        //             <p className='flex justify-center text-sm font-bold text-green-700' >{props.odds}</p>
        //     </div>
        // </>
    );
};

export default TeamInfo;
