import styles from  './control.module.css';
import List from "../list/list";
import { useAppSelector } from '../../hooks/redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { questionSlice } from '../../store/reduces/questionsSlice';
import API from '../../utils/API';

export default function Control():JSX.Element{
    const [state,setState] = useState(false)
    const quality = useAppSelector(state => state.test.quality);
    const maxQuality = useAppSelector(state => state.questions.length);
    const dispatch = useDispatch();
    return (
        <>
            <div className={styles.container}>
                <h2 children={'Questions'}/>
                {!state &&(<>
                    <span
                        onClick={() => setState(true)}
                        className={styles.quality}
                        children={'Quality'}
                    />
                </>)}
                {state &&(<>
                    <input
                        onBlur={() => setState(false)}
                        autoFocus
                        onChange={event => {
                            +event.target.value <= maxQuality && API.put('quality/1',{id:1, test: event.target.value})
                                .then(response => {
                                    dispatch(questionSlice.actions.changeQuality(+response.data.test))
                                })
                        }}
                        type={'number'}
                        className={styles.quality}
                        value={quality}
                    />
                </>)}
                <div className={styles.control}>
                    <List/>
                </div>
            </div>
        </>
    )
}