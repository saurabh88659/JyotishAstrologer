import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import {ScrollView} from 'react-native';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {AppColors, keyboardType} from '../../../utils/constants';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {useIsFocused} from '@react-navigation/native';
import AppText from '../../../libComponents/AppText';

const UpdatePhoneNumber = () => {
  const isFocused = useIsFocused();
  const inputRef = useRef();
  const [inputAutoFocus, setInputAutoFocus] = useState(true);

  useEffect(() => {
    if (isFocused) {
      setInputAutoFocus(true);
      inputRef?.current?.focus();
    }
  }, [isFocused]);

  return (
    <AppContainer>
      <AppHeader isDrawer={false} screen={'Update Phone Number'} />
      <View style={styles.followerCountContainer}>
        <AppText style={styles.followerText}>
          You will get call and alerts on these numbers
        </AppText>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: '15%', paddingHorizontal: 15}}>
        <View style={{flex: 1, paddingVertical: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppTextInputBottomLine
              autoFocus={inputAutoFocus}
              ref={inputRef}
              keyboardType={keyboardType.phonePad}
              style={{with: '80%'}}
              labelText="Primary Phone Numner"
              placeholder="Enter Primary Phone Numner"
              // value={offer_name}
              // onChangeText={setOffer_name}
              maxLength={25}
            />
          </View>
          <View>
            <AppTextInputBottomLine
              keyboardType={keyboardType.phonePad}
              labelText="Secondary Phone Number"
              placeholder="Enter Secondary Phone Number"
              // value={display_name}
              // onChangeText={setDisplay_name}
              maxLength={25}
            />
          </View>
        </View>
        <AppPrimaryButton
          // style={{marginTop: '10%'}}
          mainContainerStyle={{marginTop: '10%'}}
          height={55}
          title="Update Number"
        />
      </ScrollView>
    </AppContainer>
  );
};

export default UpdatePhoneNumber;
const styles = StyleSheet.create({
  followerCountContainer: {
    backgroundColor: AppColors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 7,
  },
  followerText: {
    color: AppColors.white,
    fontWeight: '700',
    fontSize: 14,
  },
});
