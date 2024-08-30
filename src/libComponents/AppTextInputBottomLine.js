import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import AppText from './AppText';
import {AppColors} from '../utils/constants';

const AppTextInputBottomLine = ({
  value,
  placeholder,
  onChangeText,
  labelText = 'Enter label',
  style,
  keyboardType,
  validationError = '',
  maxLength,
  editable = true,
  ref,
  autoFocus,
}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          paddingHorizontal: 12,
          marginTop: 15,
          // backgroundColor: 'red',
          height: 90,
        },
        style,
      ]}>
      <AppText style={{fontSize: 16, fontWeight: '500'}}>{labelText}</AppText>
      <TextInput
        autoFocus={autoFocus}
        ref={ref}
        keyboardType={keyboardType}
        editable={editable}
        maxLength={maxLength}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={AppColors.dark_gray}
        style={{
          fontSize: 16,
          color: AppColors.black,
          borderBottomWidth: 1,
          borderBottomColor: validationError
            ? AppColors.red
            : AppColors.primary,
        }}
      />
      {validationError && (
        <Text style={{color: AppColors.red, fontSize: 14}}>
          {validationError}
        </Text>
      )}
    </View>
  );
};

export default AppTextInputBottomLine;

const styles = StyleSheet.create({});
