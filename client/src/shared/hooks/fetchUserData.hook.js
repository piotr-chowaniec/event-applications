import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useFetchProfileData } from '../api/hooks';
import { extractToken } from '../../services/fetchService/tokenUtils';
import { setUserData } from '../../store/user/actions';
import routes from '../../routes';

const FetchUserData = async () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { call: fetchProfileData } = useFetchProfileData();

  const getUserData = useCallback(async () => {
    const token = extractToken();
    if (token) {
      const userData = await fetchProfileData();
      dispatch(setUserData(userData));
      history.push(routes.APPLICATION.PATH);
    }
  }, [dispatch, fetchProfileData, history]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
};

export default FetchUserData;
