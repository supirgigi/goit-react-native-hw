import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import useRoute from '../../routes/router';
import { authStateChangeUser } from '../../redux/auth/authOperations';

const Main = ({ onReady }) => {
  const { stateChange } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer onReady={onReady}>{routing}</NavigationContainer>;
};

export default Main;
