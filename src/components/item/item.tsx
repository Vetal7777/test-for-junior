import styles from './item.module.css';
import {QuestionI} from "../../models/state";
import {useAppSelector} from "../../hooks/redux";
import {useDispatch} from "react-redux";
import {questionSlice} from "../../store/reduces/questionsSlice";
import API from "../../utils/API";


export default function Item({item,index}: { item:QuestionI ,index:number | string}):JSX.Element{
    const dispatch = useDispatch();
    const checked = useAppSelector(state => state.checked);
    const testing = useAppSelector(state => state.testing);
    function onDelete(){
        API.delete('questions/' + item.id)
            .then(response => {
                if(response.status === 200){
                    dispatch(questionSlice.actions.deleteSuccess(item.id))
                }else{
                    dispatch(questionSlice.actions.failed);
                }
            })
    }
    return (
        <>
            <div className={`${styles.container} ${!testing && styles.testing}`}>
                <span
                    className={styles.number}
                    children={index}
                />
                <div className={styles.item}>
                    {!testing && (
                        <button
                            className={styles.delete}
                            onClick={() => onDelete()}
                        >
                            <span className={styles.line}/>
                        </button>
                    )}
                    <div className={styles.content}>
                        <span
                            className={styles.question}
                            children={item.question}
                        />
                        {checked && <span
                            className={styles.answer}
                            children={item.answer}
                        />}
                        {testing && <textarea
                            disabled={checked}
                            className={styles.textarea}
                            placeholder={'Answer'}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}