import 'react-loading-skeleton/dist/skeleton.css'
import styles from './list.module.css';
import {useAppSelector} from "../../hooks/redux";
import Item from "../item/item";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function List():JSX.Element{
    const questions = useAppSelector( (state) => state.questions);
    const testing = useAppSelector(state => state.test.testing);
    const quality = useAppSelector(state => state.test.quality);
    const isLoading = useAppSelector(state => state.isLoading);
    const validatedQuestions = () => {
        if(testing){
            const testQuestions = [...questions]
                .sort(() => Math.random() - 0.5)
                .slice(0,quality)
            return testQuestions;
        }
        else{
            return questions;
        }
    }
    return (
        <>
            <div className={styles.container}>
                {!isLoading && validatedQuestions().map((question, index) => (
                        <Item
                            index={index + 1}
                            key={index}
                            item={question}
                        />
                    ))}
                {isLoading && new Array(10)
                    .fill(1)
                    .map((elem,index) => (
                    <div
                        key={index}
                        className={`${styles.container} ${styles.skeleton}`}
                    >
                        <Skeleton
                            className={`${styles.skeleton} ${styles.cycle}`}
                        />
                        <Skeleton
                            height={60}
                            className={styles.skeleton}
                        />
                        <Skeleton
                            height={60}
                            className={styles.skeleton}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}