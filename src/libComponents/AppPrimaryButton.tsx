import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient';
import { AppColors } from '../utils/constants';

interface GradientButtonProps extends TouchableOpacityProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  title?: string;
  style?: ViewStyle;
  children: React.ReactNode;
  height:number,
  width: number;
  buttonLoading: boolean;
  isTextTransform:boolean;
  loaderSize?: number;
  mainContainerStyle:ViewStyle
}
const AppPrimaryButton: React.FC<GradientButtonProps> = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  mainContainerStyle,
  title,
  children,
  width,
  height,
  loaderSize = 22,
  isTextTransform=false,
  buttonLoading=false,
  ...restProp


}) => {
  return (
    <TouchableOpacity
      style={[{
        width: width || '100%',
        borderRadius: 40,
        backgroundColor: 'red',
      },mainContainerStyle]}
      {...restProp}
      >
      <LinearGradient
        colors={['#AD1257', '#FEB747']}
        start={start}
        end={end}
        style={[styles.gradientContainer, style,{height:height}]}>
        {!buttonLoading ? (
          <Text style={[styles.buttonText,{textTransform:isTextTransform?'uppercase':'none'}]}>{title}</Text>
        ) : (
          <ActivityIndicator color={AppColors.white} size={loaderSize} />
        )}

      </LinearGradient>
    </TouchableOpacity>
  );
};


export default AppPrimaryButton;

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 40,
    // padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
