import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppText from '../../../libComponents/AppText';
import {AppColors, routes} from '../../../utils/constants';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getBankDetails} from '../../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../../libComponents/AppLoader';
import {useIsFocused} from '@react-navigation/native';
import {Image} from 'react-native-animatable';
import {BASE_URL} from '../../../base/commonServices';

const BankDetails = ({navigation}) => {
  const isFocused = useIsFocused();
  const [bankDetails, setBankDetails] = useState('');
  const [screenLoading, setScreenLoading] = useState('');

  useEffect(() => {
    if (isFocused) {
      handleGetBankDetails();
    }
  }, [isFocused]);

  const handleGetBankDetails = async () => {
    setScreenLoading(true);
    const res = await getBankDetails();
    console.log('res of getBankDetails', res.data.data);
    if (res.success) {
      setScreenLoading(false);
      setBankDetails(res.data.data[0]);
    } else {
      setScreenLoading(false);
      setBankDetails('');
    }
  };

  const BankDetailsCard = ({
    tableKey,
    value,
    ValueColor = AppColors.black,
    ValueStyle,
    isPressable = false,
    onPress,
  }) => {
    return (
      <View style={styles.BankDetailsCardMainContainer}>
        <AppText style={{fontSize: 16, fontWeight: '700', marginLeft: 8}}>
          {tableKey}
        </AppText>
        <TouchableOpacity disabled={!isPressable} onPress={onPress}>
          <AppText
            style={[
              {
                fontSize: 16,
                fontWeight: '700',
                marginLeft: 8,
              },
              {...ValueStyle},
              {color: ValueColor},
            ]}>
            {value}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'Bank Details'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          <View style={styles.followerCountContainer}>
            <AppText style={styles.followerText}>
              Admin will take upto 7 days to complete add or change bank details
              request.
            </AppText>
          </View>
          {bankDetails ? (
            <View style={{marginTop: '10%'}}>
              <BankDetailsCard
                tableKey={'Name'}
                value={bankDetails?.bank_account_name || '-'}
              />
              <BankDetailsCard
                tableKey={'Account number'}
                value={bankDetails?.bank_account_number || '-'}
              />
              <BankDetailsCard
                tableKey={'Bank Name'}
                value={bankDetails?.bank_name || '-'}
              />
              <BankDetailsCard
                tableKey={'IFSC Code'}
                value={bankDetails?.ifsc_code || '-'}
              />
              <BankDetailsCard
                onPress={() =>
                  navigation.navigate(routes.View_Image_Screen, {
                    data: BASE_URL + bankDetails?.attachment,
                  })
                }
                ValueStyle={{textDecorationLine: 'underline'}}
                tableKey={'Attachment'}
                value={'View'}
                ValueColor="black"
                isPressable={true}
              />
              <BankDetailsCard
                tableKey={'Status'}
                value={bankDetails.status ? 'APPROVED' : 'PENDING'}
                ValueColor={bankDetails.status ? 'green' : AppColors.yellow}
              />
            </View>
          ) : (
            <View style={styles.noBankDeatilsAvaibleContainer}>
              <AppText style={styles.noBankDeatilsAvaibleText1}>
                You haven't added any bank details yet.
              </AppText>
              <AppText style={styles.noBankDeatilsAvaibleText2}>
                Please add your bank information to proceed.
              </AppText>
            </View>
          )}

          <AppPrimaryButton
            onPress={() => {
              navigation.navigate(routes.Add_Edit_Bank_Details, {
                details: bankDetails,
              });
            }}
            // buttonLoading={buttonLoading}
            height={50}
            title={bankDetails ? 'CHANGE BANK DETAILS' : 'ADD BANK DETAILS'}
            mainContainerStyle={{
              borderRadius: 0,
              position: 'absolute',
              bottom: 0,
            }}
            style={{borderRadius: 0}}
          />
        </>
      )}
    </AppContainer>
  );
};
export default BankDetails;

const styles = StyleSheet.create({
  followerCountContainer: {
    backgroundColor: AppColors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  followerText: {
    color: AppColors.white,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  BankDetailsCardMainContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 6,
    marginBottom: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noBankDeatilsAvaibleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  noBankDeatilsAvaibleText1: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '500',
    color: AppColors.black,
  },
  noBankDeatilsAvaibleText2: {
    textAlign: 'center',
    color: AppColors.dark_gray,
    fontSize: 16,
  },
});
