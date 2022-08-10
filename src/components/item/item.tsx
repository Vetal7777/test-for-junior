import styles from './item.module.css';
import {QuestionI} from "../../models/state";
import {useAppSelector} from "../../hooks/redux";
import {useDispatch} from "react-redux";
import {questionSlice} from "../../store/reduces/questionsSlice";
import API from "../../utils/API";
import React, { useState } from 'react';
import { EditModeI } from '../../models/control';


export default function Item({item,index}: { item:QuestionI ,index:number | string}):JSX.Element{
    const [editMode, setEditMode] = useState<EditModeI>({
        question: false,
        answer: false,
    })
    const [itemState, setItemState] = useState<QuestionI>(item)
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
                                children={itemState.question}
                            />
                        )}
                        {
                            editMode.question && (
                                <textarea
                                    autoFocus={true}  
                                    onChange={(event) => setItemState({...itemState,question: event.target.value})}
                                    onBlur={() => {
                                        dispatch(questionSlice.actions.fetch);
                                        API.put('questions/' + itemState.id, itemState)
                                            .then(response => {
                                                const success = response.status >= 200 && response.status < 300;
                                                success ? dispatch(questionSlice.actions.putSuccess(response.data)) : dispatch(questionSlice.actions.failed);
                                            })
                                        setEditMode({...editMode,question: false})
                                    }}
                                    className={styles.textarea}
                                    value={itemState.question}
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
                                    children={itemState.answer}
                                />
                        )}
                        {
                            editMode.answer && (
                                <textarea
                                    autoFocus={true}  
                                    onChange={(event) => setItemState({...itemState,answer: event.target.value})}
                                    onBlur={() => {
                                        dispatch(questionSlice.actions.fetch);
                                        API.put('questions/' + itemState.id, itemState)
                                            .then(response => {
                                                const success = response.status >= 200 && response.status < 300;
                                                success ? dispatch(questionSlice.actions.putSuccess(response.data)) : dispatch(questionSlice.actions.failed);
                                            })
                                        setEditMode({...editMode,answer: false})
                                    }}
                                    className={styles.textarea}
                                    value={itemState.answer}
                                />
                            )
                        }
                        {testing && <textarea
                            autoFocus
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