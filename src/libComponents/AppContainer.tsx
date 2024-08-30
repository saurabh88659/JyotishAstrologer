import {ImageBackground, View, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { AppColors } from '../utils/constants'
import { useSelector } from 'react-redux'

interface CustomViewProps extends ViewProps{
     style:ViewStyle
}
const AppContainer:React.FC<CustomViewProps> = ({style,children,}) => {
     const isDark:boolean = useSelector((state:any) => state.auth.isDark);
  return (
    <View style={[{backgroundColor: isDark?AppColors.black:AppColors.white,flex:1} ,style]}>
    {children}
    </View>
  )
};
export default AppContainer;

