import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useFetchProfileData } from '../api/hooks';
import { extractToken } from '../../services/fetchService/tokenUtils';
import { setUserData } from '../../store/user/actions';

const FetchUserData = async () => {
  const dispatch = useDispatch();
  const { call: fetchProfileData } = useFetchProfileData();

  const getUserData = useCallback(async () => {
    const token = extractToken();
    if (token) {
      const userData = await fetchProfileData();
      dispatch(setUserData(userData));
    }
  }, [dispatch, fetchProfileData]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
};

export default FetchUserData;
