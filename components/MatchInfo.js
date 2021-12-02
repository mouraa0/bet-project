import styles from './MatchInfo.module.css'
import Button from './UI/Button';

const MatchInfo = (props) => {
    return (
        <div className={styles.container} >
            <div className={styles.container__date} >
                {props.date}
            </div>
            <div className={styles.container__hour} >
                {props.hour}
            </div>
            <div className={styles.container__vs} >
                VS
            </div>
            <Button onClick={props.buttonHandler}>Bet!</Button>
        </div>
    );
};

export default MatchInfo;
