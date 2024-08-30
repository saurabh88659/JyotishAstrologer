import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/constants';
import AppStatusBar from './AppStatusBar';
import AppIcon, {Icons} from './AppIcon';

const AppPermissionModal = ({
  isModalVisible = false,
  onRequestClose,
  heading,
  onPress,
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
          <Text
            style={{
              fontSize: 16,
              color: AppColors.black,
              //     fontWeight: 'bold',
              marginTop: 15,
              textAlign: 'center',
            }}>
            {heading}
          </Text>
          <TouchableOpacity
            onPress={onPress}
            style={{
              height: 40,
              backgroundColor: '#1e90ff',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 25,
              borderRadius: 4,
            }}>
            <Text
              style={{
                color: AppColors.white,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Open settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default AppPermissionModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 50,
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
    borderRadius: 5,
    //     alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    paddingBottom: 25,
  },
});
