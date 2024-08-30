import {View, Text, Modal, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';
import AppButton from './AppButton';
import AppPrimaryButton from './AppPrimaryButton';

const AppModal = ({
  isModalVisible = false,
  titleLeftButton = 'title1',
  titileRightButton = 'title2',
  onleftButtonClick,
  onRightButtonCLick,
  onRequestClose,
  buttonLoading = false,
  heading = 'titile missing',
  headingFontSize = 18,
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
              marginTop: 25,
              textAlign: 'center',
            }}>
            {heading}
          </Text>
          <View style={styles.buttonContainer}>
            <AppButton
              onPress={onleftButtonClick}
              height={45}
              width={'40%'}
              backgroundColor={AppColors.white}
              title={titleLeftButton}
              titleColor={AppColors.black}
              style={{borderWidth: 1.5, borderColor: AppColors.black}}
            />
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
export default AppModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
  },
  heading: {
    backgroundColor: AppColors.white,
    width: '100%',
    height: 160,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
