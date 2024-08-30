import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';
import AppButton from './AppButton';
import AppPrimaryButton from './AppPrimaryButton';
import AppHeader from './AppHeader';
import AppStatusBar from './AppStatusBar';
import AppIcon, {Icons} from './AppIcon';
import {Icon} from 'react-native-vector-icons/Icon';
import {scheduleFlushOperations} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';

const AppInfoModal = ({
  isModalVisible = false,
  onRequestClose,
  heading = 'titile missing',
  headingFontSize = 18,
  onCancel,
}) => {
  return (
    <Modal
      visible={isModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onRequestClose}>
      <AppStatusBar backgroundColor={'rgba(0, 0, 0, 0.8)'} />
      <View style={styles.mainContainer}>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={() => onCancel()}
            style={{
              alignSelf: 'flex-end',
              width: 50,
              alignItems: 'flex-end',
              position: 'absolute',
              right: 10,
              top: 10,
            }}>
            <AppIcon
              type={Icons.Entypo}
              name="cross"
              color={AppColors.black}
              size={20}
            />
          </TouchableOpacity>
          <AppIcon
            type={Icons.MaterialCommunityIcons}
            name="information"
            color={'#ffd700'}
            size={40}
            style={{alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: headingFontSize,
              color: AppColors.black,
              //     fontWeight: 'bold',
              marginTop: 15,
              textAlign: 'center',
            }}>
            {heading}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default AppInfoModal;

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
    backgroundColor: AppColors.lightYellow,
    width: '100%',
    borderRadius: 5,
    //     alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 25,
  },
});
