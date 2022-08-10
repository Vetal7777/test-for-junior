import styles from './item.module.css';
import {QuestionI} from "../../models/state";
import {useAppSelector} from "../../hooks/redux";
import {useDispatch} from "react-redux";
import {questionSlice} from "../../store/reduces/questionsSlice";
import API from "../../utils/API";
import React, { useState } from 'react';
import { EventType } from '@testing-library/react';


export default function Item({item,index}: { item:QuestionI ,index:number | string}):JSX.Element{
    const [editMode, setEditMode] = useState<{answer: Boolean; question: Boolean;}>({
        question: false,
        answer: false,
    })
    const dispatch = useDispatch();
    const checked = useAppSelector(state => state.checked);
    const testing = useAppSelector(state => state.test.testing);
    function onDelete(){
        API.delete('questions/' + item.id)
            .then(response => {
                if(response.status >= 200 && response.status < 300){
                    dispatch(questionSlice.actions.deleteSuccess(item.id))
                }else{
                    dispatch(questionSlice.actions.failed);
                }
            })
    }
    return (
        <>
            <div className={`${styles.container} ${testing && styles.testing}`}>
                <span
                    className={styles.number}
                    children={index}
                />
                <div className={styles.item}>
                    <div className={styles.content}>
                        {!editMode.question && (
                            <span
                                onClick={!testing ? () => setEditMode({...editMode,question: true}) : undefined}
                                className={styles.question}
                                children={item.question}
                            />
                        )}
                        {
                            editMode.question && (
                                <textarea
                                    onChange={(event) => {
                                        dispatch(questionSlice.actions.fetch);
                                        API.put('questions/' + item.id, {...item,question: event.target.value})
                                            .then(response => {
                                                if(response.status >= 200 && response.status < 300){
                                                    dispatch(questionSlice.actions.putSuccess(response.data));
                                                }
                                                else{
                                                    dispatch(questionSlice.actions.failed);
                                                }
                                            })
                                    }}
                                    onBlur={() => setEditMode({...editMode,question: false})}
                                    className={styles.textarea}
                                    autoFocus
                                    value={item.question}
                                />
                            )
                        }
                        {   
                            !editMode.answer &&
                            (checked || !testing) && 
                            (
                                <span
                                onClick={!testing ? () => setEditMode({...editMode,answer: true}) : undefined}
                                    className={styles.answer}
                                    children={item.answer}
                                />
                        )}
                        {
                            editMode.answer && (
                                <textarea
                                    onChange={(event) => {
                                        dispatch(questionSlice.actions.fetch);
                                        API.put('questions/' + item.id, {...item,answer: event.target.value})
                                            .then(response => {
                                                if(response.status >= 200 && response.status < 300){
                                                    dispatch(questionSlice.actions.putSuccess(response.data));
                                                }
                                                else{
                                                    dispatch(questionSlice.actions.failed);
                                                }
                                            })
                                    }}
                                    onBlur={() => setEditMode({...editMode,answer: false})}
                                    className={styles.textarea}
                                    autoFocus
                                    value={item.answer}
                                />
                            )
                        }
                        {testing && <textarea
                            disabled={checked}
                            className={styles.textarea}
                            placeholder={'Answer'}
                        />}
                    </div>
                </div>
                {!testing && (
                    <button 
                        className={styles.delete}
                        onClick={onDelete}
                    >
                        <span className={styles.line}/>
                        <span className={styles.line}/>
                    </button>
                )}
            </div>
        </>
    )
}