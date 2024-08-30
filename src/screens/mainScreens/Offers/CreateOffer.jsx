import {StyleSheet, Text, View, ScrollView, ToastAndroid} from 'react-native';
import React from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {
  editOffer,
  submitOffer,
} from '../../../base/features/MainApiServices/MainApiServices';
import {keyboardType} from '../../../utils/constants';

const CreateOffer = ({navigation, route}) => {
  const editOfferData = route?.params?.editOfferData;
  // console.log('edit edit Offer route Data---', editOfferData);
  const [offer_name, setOffer_name] = React.useState(
    editOfferData ? editOfferData?.offer_name : '',
  );
  const [offer_nameError, setOffer_nameError] = React.useState('');

  const [display_name, setDisplay_name] = React.useState(
    editOfferData ? editOfferData?.display_name : '',
  );
  const [display_nameError, setDisplay_nameError] = React.useState('');
  const [percentage_off, setPercentage_off] = React.useState(
    editOfferData ? editOfferData?.percentage_off : '',
  );
  const [percentage_offError, setPercentage_offError] = React.useState('');
  const [buttonLoading, setbuttonLoading] = React.useState(false);

  const validateForm = () => {
    let isValid = true;
    const numberRegex = /^\d+$/;
    const percentageOffRegex = /^(100|[1-9]?[0-9])$/;

    if (!offer_name?.trim()) {
      setOffer_nameError('Offer name is required');
      isValid = false;
    } else {
      setOffer_nameError('');
    }

    if (!display_name?.trim()) {
      setDisplay_nameError('Display name is required');
      isValid = false;
    } else {
      setDisplay_nameError('');
    }

    if (!percentage_off?.trim()) {
      setPercentage_offError('Percentage off is required');
      isValid = false;
    } else if (!percentageOffRegex?.test(percentage_off)) {
      setPercentage_offError(
        'Percentage of must be a number between 0 and 100',
      );
      isValid = false;
    } else {
      setPercentage_offError('');
    }

    return isValid;
  };

  const handlSubmitOffer = async () => {
    setbuttonLoading(true);
    const data = {
      offer_name: offer_name,
      display_name: display_name,
      percentage_off: percentage_off,
    };
    const res = await submitOffer(data);
    // console.log('res of submitOffer------------', res.data);
    if (res.success) {
      setbuttonLoading(false);
      navigation.goBack();
      ToastAndroid.show(
        'Offer Created Successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      setbuttonLoading(false);
      ToastAndroid.show(
        'Oops! Something went wrong!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  const handlEditOffer = async () => {
    setbuttonLoading(true);
    const data = {
      offerId: editOfferData.id,
      body: {
        offer_name: offer_name,
        display_name: display_name,
        percentage_off: percentage_off,
        active: editOfferData.active,
      },
    };
    const res = await editOffer(data);
    if (res.success) {
      setbuttonLoading(false);
      navigation.goBack();
      ToastAndroid.show(
        'Offer Edited Successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      setbuttonLoading(false);
      ToastAndroid.show(
        'Oops! Something went wrong!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  const submit = () => {
    if (validateForm()) {
      if (editOfferData) {
        handlEditOffer();
      } else {
        handlSubmitOffer();
      }
    }
  };

  return (
    <AppContainer>
      <AppHeader
        isDrawer={false}
        screen={editOfferData ? 'Edit Offer' : 'Add Offer'}
      />
      <ScrollView contentContainerStyle={{paddingBottom: '15%'}}>
        <View style={{flex: 1, paddingVertical: 15}}>
          <AppTextInputBottomLine
            labelText="Offer name"
            placeholder="Enter offer name"
            value={offer_name}
            onChangeText={setOffer_name}
            maxLength={50}
            validationError={offer_nameError}
          />
          <AppTextInputBottomLine
            labelText="Display name"
            placeholder="Enter Display name"
            value={display_name}
            onChangeText={setDisplay_name}
            maxLength={70}
            validationError={display_nameError}
          />
          <AppTextInputBottomLine
            keyboardType={keyboardType.phonePad}
            labelText="Percentage off"
            placeholder="Enter percentage off"
            value={percentage_off?.toString()}
            onChangeText={setPercentage_off}
            maxLength={3}
            validationError={percentage_offError}
          />
        </View>
      </ScrollView>

      <AppPrimaryButton
        onPress={() => submit()}
        buttonLoading={buttonLoading}
        height={50}
        title={'SUBMIT'}
        mainContainerStyle={{
          borderRadius: 0,
          position: 'absolute',
          bottom: 0,
        }}
        style={{borderRadius: 0}}
      />
    </AppContainer>
  );
};

export default CreateOffer;

const styles = StyleSheet.create({});
