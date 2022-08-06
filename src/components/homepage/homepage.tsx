import styles from './homepage.module.css';
import {NavLink} from "react-router-dom";
import homeLinks from "../../shared/consts/homeLinks";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {questionSlice} from "../../store/reduces/questionsSlice";

export default function Homepage():JSX.Element{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(questionSlice.actions.testing(false))
    },[])
    return (
        <>
            <div className={styles.container}>
                {
                    homeLinks.map((link,index) => (
                        <NavLink
                            key={index}
                            className={styles.item}
                            to={link.link}
                        >
                            <span children={link.title}/>
                        </NavLink>
                    ))
                }
            </div>
        </>
    )
}