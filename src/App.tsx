import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import styles from './App.module.css';
import './App.css'
import Homepage from "./components/homepage/homepage";
import {setupStore} from "./store/store";
import {Provider} from "react-redux";
import Test from "./components/test/test";
import CreateNewQuestion from "./components/create-new-question/create-new-question";
import Control from "./components/control/control";

export default function App() {
    const store = setupStore();
    return (
      <>
          <Provider store={store}>
              <div className={styles.container}>
                  <Routes>
                      <Route path={'/'} element={<Dashboard/>}>
                          <Route index element={<Homepage/>}/>
                          <Route path={'test'} element={<Test/>}/>
                          <Route path={'create-new-question'} element={<CreateNewQuestion/>}/>
                          <Route path={'control'} element={<Control/>}/>
                      </Route>
                  </Routes>
              </div>
          </Provider>
      </>
    );
}