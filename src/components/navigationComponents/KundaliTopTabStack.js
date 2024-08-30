import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {AppColors, routes} from '../../utils/constants';
import Lagna from '../../screens/mainScreens/KundaliScreens/Lagna';
import Navamsa from '../../screens/mainScreens/KundaliScreens/Navamsa';
import Transit from '../../screens/mainScreens/KundaliScreens/Transit';
import Dasha from '../../screens/mainScreens/KundaliScreens/Dasha';
import Basic from '../../screens/mainScreens/KundaliScreens/Basic';
import AppHeader from '../../libComponents/AppHeader';
import Planetdetails from '../../screens/mainScreens/KundaliScreens/Planetdetails';
import Manglikdosh from '../../screens/mainScreens/KundaliScreens/Manglikdosh';
import Pitradosh from '../../screens/mainScreens/KundaliScreens/Pitradosh';
import Panchang from '../../screens/mainScreens/KundaliScreens/Panchang';

const TopTabArr = [
  {name: routes.Basic, component: Basic},
  {name: routes.Planetdetails, component: Planetdetails},
  {name: routes.Panchang, component: Panchang},
  {name: routes.Manglikdosh, component: Manglikdosh},
  {name: routes.Pitradosh, component: Pitradosh},
  // {name: routes.Lagna, component: Lagna},
  // {name: routes.Navamsa, component: Navamsa},
  // {name: routes.Transit, component: Transit},
  // {name: routes.Dasha, component: Dasha},
];

const KundaliTopTabStack = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <AppHeader isDrawer={false} screen={'Kundali'} />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: {width: 'auto'},
          tabBarLabelStyle: {
            fontSize: 15.5,
            textTransform: 'none',
            fontWeight: '800',
          },
          tabBarIndicatorStyle: {backgroundColor: AppColors.primary, height: 3},
        }}>
        {TopTabArr.map(({name, component}) => {
          return <Tab.Screen name={name} component={component} />;
        })}
      </Tab.Navigator>
    </>
  );
};

export default KundaliTopTabStack;
