import React, {useContext} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from '../utils/constants';
import AppIcon from './AppIcon';
import {loginContext} from '../screens/authScreens/Login';

const AppTextInput = ({
  value,
  placeholder,
  onChangeText,
  labelText = 'Enter label',
  IconType,
  Iconsize,
  Iconname,
  Iconcolor,
  style,
  keyboardType,
  validationError = '',
  maxLength,
  showPasswordIcon = true,
  onEyePress,
  secureTextEntry,
  height = 100,
  editable = true,
  isNumber = false,
  autoFocus = false,
  ref,
}) => {
  const {} = useContext(loginContext);
  return (
    <View style={[styles.container, {...style}, {height: height}]}>
      <Text style={{fontSize: 15, color: AppColors.black, fontWeight: '600'}}>
        {labelText}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: validationError ? AppColors.red : AppColors.gray,
            borderWidth: validationError ? 1 : 0,
            backgroundColor: '#fff',
          },
        ]}>
        {isNumber && (
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 5,
              borderRightWidth: 1,
              marginRight: 5,
              borderRightColor: AppColors.dark_gray,
            }}>
            <Text style={{color: AppColors.black, fontSize: 15}}>+ 91</Text>
          </View>
        )}
        <TextInput
          ref={ref}
          autoFocus={autoFocus}
          // keyboardType='default'
          backgroundColor={AppColors.white}
          editable={editable}
          keyboardType={keyboardType}
          // keyboardType="phone-pad"
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={AppColors.dark_gray}
          maxLength={maxLength}
          style={[
            styles.input,
            {color: AppColors.black, paddingLeft: isNumber ? 0 : 15},
          ]}
          secureTextEntry={secureTextEntry}
        />
        {showPasswordIcon && (
          <TouchableOpacity onPress={onEyePress}>
            <AppIcon
              Type={IconType}
              name={Iconname}
              size={Iconsize}
              color={Iconcolor}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {validationError && (
        <Text style={styles.errorText}>{validationError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 100,
    width: '100%',
  },

  labelText: {
    fontSize: 15,
    color: AppColors.black,
    fontWeight: '600',
  },
  inputContainer: {
    borderRadius: 5,
    // borderWidth: 1,
    marginTop: '2%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  icon: {
    // marginRight: 10,
    // marginLeft: 15,
    paddingHorizontal: 15,
    // backgroundColor: "red"
  },

  input: {
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    color: AppColors.black,
  },
  errorText: {
    fontSize: 13,
    color: AppColors.red,
  },
});

export default AppTextInput;
