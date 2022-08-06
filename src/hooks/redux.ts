import {RootState} from "../models/state";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;