import { useSelector as _useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../redux/root-reducer';

const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

export default useSelector;
