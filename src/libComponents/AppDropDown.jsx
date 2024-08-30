import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {AppColors} from '../utils/constants';

const AppDropDown = ({
  valueField = 'label',
  labelField = 'labelField',
  search = false,
  labelText = 'Role',
  data = [],
  value,
  onBlur,
  onFocus,
  onChange,
  placeholder = '--Select Role',
  height = 100,
  searchPlaceholder = 'Search...',
  style,
  disable = false,
  validationError = '',
}) => {
  return (
    <View style={[styles.container, {height: height}, {...style}]}>
      <Text
        style={{
          fontSize: 16,
          color: AppColors.black,
          fontWeight: '600',
          marginBottom: '1%',
        }}>
        {labelText}
      </Text>
      <View
        style={{borderBottomWidth: 1, borderBottomColor: AppColors.primary}}>
        <Dropdown
          disable={disable}
          style={{
            height: 48,
            //   paddingLeft: 15,
            borderRadius: 5,
            //   paddingHorizontal: 8,
            // elevation: 5,
            // backgroundColor: AppColors.black,
          }}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={{fontSize: 16, color: AppColors.black}}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={{color: AppColors.black}}
          //    containerStyle={{backgroundColor: AppColors.yellow}}
          activeColor={AppColors.lightYellow}
          data={data}
          search={search}
          maxHeight={300}
          labelField={labelField}
          valueField={valueField}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </View>
      {validationError && (
        <Text style={{color: AppColors.red, fontSize: 14, marginTop: 5}}>
          {validationError}
        </Text>
      )}
    </View>
  );
};

export default AppDropDown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 10,
    // backgroundColor: appColors.WHITE,
    //     height: 150,
    //     backgroundColor: 'red',
  },
  dropdown: {
    height: 48,
    paddingLeft: 15,
    borderRadius: 5,
    paddingHorizontal: 8,
  },

  icon: {
    marginRight: 5,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  placeholderStyle: {
    fontSize: 16,
    color: AppColors.dark_gray,
  },

  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
