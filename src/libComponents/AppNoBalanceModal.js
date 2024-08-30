import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';
import AppButton from './AppButton';
import AppPrimaryButton from './AppPrimaryButton';

const AppNoBalanceModal = ({
  isModalVisible = false,
  titileRightButton = 'title',
  onRightButtonCLick,
  onRequestClose,
  buttonLoading = false,
  heading = '',
  subHeading = '',
  headingFontSize = 18,
  subHeadingFontSize = 17,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}>
      <View style={styles.mainContainer}>
        <View style={styles.heading}>
          <Text
            style={{
              fontSize: headingFontSize,
              color: AppColors.black,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {heading}
          </Text>
          <Text
            style={{
              fontSize: subHeadingFontSize,
              color: AppColors.black,
              fontWeight: 'bold',
              marginTop: 15,
              textAlign: 'center',
              marginBottom: 20,
            }}>
            {subHeading}
          </Text>
          <View style={styles.buttonContainer}>
            <AppPrimaryButton
              buttonLoading={buttonLoading}
              onPress={onRightButtonCLick}
              height={45}
              width={'40%'}
              title={titileRightButton}
              style={{borderRadius: 6}}
              mainContainerStyle={{borderRadius: 6}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default AppNoBalanceModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
  },
  heading: {
    backgroundColor: AppColors.white,
    width: '90%',
    //     height: 250,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});
