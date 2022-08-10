import styles from './dashboard.module.css';
import {NavLink, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {questionSlice} from "../../store/reduces/questionsSlice";
import API from "../../utils/API";

export default function Dashboard():JSX.Element{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(questionSlice.actions.fetch());
        API.get('questions')
            .then(response => {
                if(response.status >= 200 && response.status < 300){
                    dispatch(questionSlice.actions.getSuccess(response.data));
                }else{
                    dispatch(questionSlice.actions.failed);
                }
            })
        API.get('quality')
            .then(response => {
                if(response.status >= 200 && response.status < 300){
                    dispatch(questionSlice.actions.changeQuality(response.data[0].test));
                }else{
                    dispatch(questionSlice.actions.failed);
                } 
            })
    },[])
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <NavLink
                        to={'/'}
                        children={'Home'}
                        className={styles.link}
                    />
                </div>
                <Outlet/>
            </div>
        </>
    )
}