import styles from './test.module.css';
import List from "../list/list";
import {useDispatch} from "react-redux";
import {questionSlice} from "../../store/reduces/questionsSlice";
import { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';

export default function Test():JSX.Element{
    const dispatch = useDispatch();
    dispatch(questionSlice.actions.testing(true));
    dispatch(questionSlice.actions.check(false));
    return (
        <>
            <div className={styles.container}>
                <h2 children={'Test'}/>
                <div className={styles.test}>
                    <List/>
                    <button
                        className={styles.check}
                        children={'Check'}
                        onClick={() => dispatch(questionSlice.actions.check(true))}
                    />
                </div>
            </div>
        </>
    )
}