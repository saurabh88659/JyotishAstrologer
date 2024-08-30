import {
  ActivityIndicator,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {AppColors} from '../utils/constants';

interface AppLoaderProp extends ViewProps {
  style?: StyleProp<ViewStyle>;
  size: number;
}
const AppLoder: React.FunctionComponent<AppLoaderProp> = ({
  style,
  size = 33,
}) => {
  const isDark: boolean = useSelector((state: any) => state.auth.isDark);
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDark ? AppColors.black : AppColors.white,
        },
        style,
      ]}>
      <ActivityIndicator
        size={size}
        // color={isDark ? AppColors.white : AppColors.black}
        color={AppColors.primary}
      />
    </View>
  );
};

export default AppLoder;
