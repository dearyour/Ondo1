import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../module';
import { userActions } from '../slice/user';

export default function useUser() {
    const dispatch = useDispatch();
    const count = useSelector((state:RootState) => state.user.count);
    //토큰
    const data = useSelector<RootState, string | null>
    ((state:RootState) => state.user.data)
    
    const plus = useCallback(() => {
        dispatch(userActions.getKakaoKey());
    }, [dispatch]);


    return { count, plus ,data };
}