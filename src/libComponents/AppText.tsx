import React ,{useContext}from 'react';
import { Text, TextStyle, TextProps ,StyleProp} from 'react-native';
import { AppColors } from '../utils/constants';
import { useSelector } from 'react-redux';

interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  color?: string;
  numberOfLines?:number;
}

const AppText: React.FC<CustomTextProps> = ({
  style,
  children,
  fontSize = 16,
  numberOfLines
}) => {
  const isDark:boolean = useSelector((state:any) => state.auth.isDark);
  return (
    <Text
    numberOfLines={numberOfLines}
      style={[{
        fontSize: fontSize,
        color:isDark?AppColors.white:AppColors.black ,
      }, style]}>
      {children}
    </Text>
  );
};

export default AppText;


