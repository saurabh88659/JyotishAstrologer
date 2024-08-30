import {NavigationActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.log('params--------------', params);
  _navigator.navigate(routeName, params);
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
};
