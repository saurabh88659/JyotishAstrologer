import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import AppText from '../../../libComponents/AppText';
import {Image} from 'react-native-animatable';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {AppColors, keyboardType} from '../../../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {
  addBankDetails,
  editBankDetails,
} from '../../../base/features/MainApiServices/MainApiServices';
import {BASE_URL} from '../../../base/commonServices';

const BankDetails = ({navigation, route}) => {
  const BankRouteData = route?.params?.details;
  console.log('BankRouteData------', BankRouteData);

  //bank---
  const [name, setName] = useState(
    BankRouteData ? BankRouteData.bank_account_name : '',
  );
  const [nameError, setNameError] = useState('');

  const [bankName, setBankName] = useState(
    BankRouteData ? BankRouteData.bank_name : '',
  );
  const [bankNameError, setBankNameError] = useState('');

  const [accountNumber, setAccountNumber] = useState(
    BankRouteData ? BankRouteData.bank_account_number : '',
  );
  const [accountNumberError, setAccountNumberError] = useState('');

  const [ifscCode, setIfscCode] = useState(
    BankRouteData ? BankRouteData.ifsc_code : '',
  );
  const [ifscCodeError, setIfscCodeError] = useState('');

  const [passbook, setPassbook] = useState('');
  const [passbookError, setPassbookError] = useState('');
  const [passbookUrl, setPassbookUrl] = useState(
    BankRouteData ? BASE_URL + BankRouteData?.attachment : '',
  );
  const [buttonLoading, setButtonLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const numberRegex = /^\d+$/;

    if (!name?.trim()) {
      setNameError('Account holder name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!accountNumber) {
      setAccountNumberError('Account Number is required');
      isValid = false;
    } else if (!numberRegex?.test(accountNumber)) {
      setAccountNumberError('Account Number must be a number');
      isValid = false;
    } else {
      setAccountNumberError('');
    }

    if (!bankName?.trim()) {
      setBankNameError('Bank name is required');
      isValid = false;
    } else {
      setBankNameError('');
    }

    if (!ifscCode?.trim()) {
      setIfscCodeError('IFSC code is required');
      isValid = false;
    } else {
      setIfscCodeError('');
    }

    if (!passbookUrl?.trim()) {
      setPassbookError('Attachment is required');
      isValid = false;
    } else {
      setPassbookError('');
    }
    return isValid;
  };

  const uploadPassBookPicture = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: true,
    })
      .then(image => {
        //    console.log('image===>', image);
        setPassbook(image);
        setPassbookUrl(image.path);
      })
      .catch(error => {
        //    console.log('Error selecting image: ', error);
      });
  };

  const HandleFormData = async () => {
    let formData = new FormData();
    formData.append('bank_account_name', name);
    formData.append('bank_account_number', accountNumber);
    formData.append('bank_name', bankName);
    formData.append('ifsc_code', ifscCode);
    var filename = passbook?.path?.replace(/^.*[\\\/]/, '');
    {
      passbook &&
        formData.append('attachment', {
          name: filename,
          type: passbook?.mime,
          uri:
            Platform.OS === 'android'
              ? passbook?.path
              : passbook?.path.replace('file://', ''),
        });
    }
    return formData;
  };

  const handleAddBankDetails = async () => {
    setButtonLoading(true);
    const formData = await HandleFormData();
    const res = await addBankDetails(formData);
    console.log('res of addBankDetails=======', res);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Bank details saved successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      navigation.goBack();
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const handleEditBankDetails = async () => {
    setButtonLoading(true);
    const formData = await HandleFormData();
    const object = {id: BankRouteData?.id, body: formData};
    const res = await editBankDetails(object);
    //     console.log('res of editBankDetails=======', res);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Bank details updated successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      navigation.goBack();
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const submit = () => {
    if (validateForm()) {
      if (BankRouteData) {
        //    console.log('edit');
        handleEditBankDetails();
      } else {
        //    console.log('add');
        handleAddBankDetails();
      }
    }
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader
        screen={BankRouteData ? 'Change Bank Details' : 'Add Bank Details'}
        isDrawer={false}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: '15%'}}>
        <View style={{flex: 1, paddingVertical: 15}}>
          <AppTextInputBottomLine
            labelText="Account holder name"
            placeholder="Enter account holder name"
            value={name}
            onChangeText={setName}
            maxLength={25}
            validationError={nameError}
          />
          <AppTextInputBottomLine
            labelText="Accunt number"
            placeholder="Enter account number"
            value={accountNumber?.toString()}
            onChangeText={setAccountNumber}
            maxLength={25}
            keyboardType={keyboardType.phonePad}
            validationError={accountNumberError}
          />

          <AppTextInputBottomLine
            labelText="Bank name"
            placeholder="Enter bank name"
            value={bankName}
            onChangeText={setBankName}
            maxLength={25}
            validationError={bankNameError}
            //     keyboardType={keyboardType.phonePad}
          />
          <AppTextInputBottomLine
            labelText="IFSC code"
            placeholder="Enter IFSC code"
            value={ifscCode}
            onChangeText={setIfscCode}
            maxLength={25}
            validationError={ifscCodeError}
            //   keyboardType={keyboardType.phonePad}
          />
          <View style={{marginHorizontal: 12, marginTop: 20}}>
            <AppText style={{fontSize: 16, fontWeight: '500'}}>
              Attachment
            </AppText>
            <TouchableOpacity
              onPress={uploadPassBookPicture}
              style={{
                height: 110,
                width: 90,
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {passbookUrl ? (
                <Image
                  source={{
                    uri: passbookUrl,
                  }}
                  style={{height: '100%', width: '100%', borderRadius: 5}}
                />
              ) : (
                <AppIcon
                  type={Icons.AntDesign}
                  name="plus"
                  color={AppColors.dark_gray}
                  size={32}
                />
              )}
            </TouchableOpacity>
            {passbookError && (
              <Text style={{color: AppColors.red, fontSize: 14}}>
                {passbookError}
              </Text>
            )}
          </View>
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

export default BankDetails;

const styles = StyleSheet.create({});
