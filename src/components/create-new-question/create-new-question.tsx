import styles from './create-new-question.module.css';
import {useState} from "react";
import {NewQuestionI} from "../../models/state";
import {useDispatch} from "react-redux";
import {questionSlice} from "../../store/reduces/questionsSlice";
import API from "../../utils/API";
import {useAppSelector} from "../../hooks/redux";
import { set } from 'immer/dist/internal';

export default function CreateNewQuestion():JSX.Element{
    const [state,setState] = useState<NewQuestionI>({
        question: '',
        answer: ''
    })
    const questions = useAppSelector(state => state.questions);
    const dispatch = useDispatch();
    function createNewQuestion(){
        dispatch(questionSlice.actions.fetch);
        API.post('questions',{...state,id: Math.round(Math.random() * 100000) + ''})
            .then(response => {
                if(response.status >= 200 && response.status < 300){
                    dispatch(questionSlice.actions.postSuccess(response.data))
                }
                else{
                    dispatch(questionSlice.actions.failed);
                }
            })
        setState({
            question: '',
            answer: ''
        })
    }
    return (
        <>
            <div className={styles.container}>
                <h2 children={'Create new question'}/>
                <div className={styles.create}>
                    <form
                        onSubmit={event => {event.preventDefault()}}
                        className={styles.form}
                    >
                        <textarea
                            placeholder={'Question'}
                            onChange={event => setState({...state, question: event.target.value})}
                            value={state.question}
                            className={styles.textarea}
                        />
                        <textarea
                            placeholder={'Answer'}
                            onChange={event => setState({...state, answer: event.target.value})}
                            value={state.answer}
                            className={styles.textarea}
                        />
                        <button
                            disabled={Object.values(state).some(elem => elem.trim() === '')}
                            className={styles.button}
                            children={'Create'}
                            onClick={() => createNewQuestion()}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}