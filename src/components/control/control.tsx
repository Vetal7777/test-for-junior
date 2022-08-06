import styles from  './control.module.css';
import List from "../list/list";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {questionSlice} from "../../store/reduces/questionsSlice";

export default function Control():JSX.Element{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(questionSlice.actions.check(true));
        dispatch(questionSlice.actions.testing(false));
    },[])
    return (
        <>
            <div className={styles.container}>
                <h2 children={'Questions'}/>
                <div className={styles.control}>
                    <List/>
                </div>
            </div>
        </>
    )
}