//Хуки диспатча и селектора, чтобы не типизировать в каждом месте

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootStateType, AppDispatchType } from '../store/index';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
