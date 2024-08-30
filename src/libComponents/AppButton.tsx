import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps
} from 'react-native';
import React from 'react';
import { AppColors } from '../utils/constants';

interface AppButtonProps extends TouchableOpacityProps { 
  buttonLoading?: boolean;
  title?: string;
  // onPress: () => void;
  style?: StyleProp<ViewStyle>;
  titleColor:string,
  width?: string | any;
  height?: number | any;
  backgroundColor?: any;
  loaderSize:number;
}


const AppButton: React.FC<AppButtonProps> = ({
  buttonLoading = false,
  title = 'title',
  titleColor=AppColors.white,
  // onPress,
  style,
  width = "40%",
  height = 38,
  backgroundColor = AppColors.primary,
  loaderSize=20,
  ...rest
}) => {
  return (
    <TouchableOpacity
      // onPress={onPress}
      {...rest}
      style={[
        styles.container,
        {
          width: width,
          height: height,
          backgroundColor: backgroundColor
        },
        style,
      ]}
    >
      {!buttonLoading ? (
        <Text style={{ color: titleColor, fontSize: 16, fontWeight: '800' }}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator color={AppColors.white} size={loaderSize} />
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});
