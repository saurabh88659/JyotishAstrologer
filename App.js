import React from 'react';
import {Provider, useSelector} from 'react-redux';
import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';
import {store} from './src/app/store';
import InternetConnectivityWrapper from './src/base/features/InternetConnectivityWrapper';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NavigationService from './src/base/features/NavigationService';
import UserChatScreen from './src/screens/mainScreens/ChatScreens/UserChatScreen';

const App = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  return loggedIn ? <MainStack /> : <AuthStack />;
};

const AppWapper = () => {
  return (
    <Provider store={store}>
      <InternetConnectivityWrapper>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <GestureHandlerRootView style={{flex: 1}}>
            {/* <AppThemeProvider> */}
            <App />
            {/* <UserChatScreen /> */}
            {/* </AppThemeProvider> */}
          </GestureHandlerRootView>
        </NavigationContainer>
      </InternetConnectivityWrapper>
    </Provider>
  );
};

export default AppWapper;
