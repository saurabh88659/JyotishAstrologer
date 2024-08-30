import React, {useState} from 'react';
import {View, Text, Image, Modal, StyleSheet} from 'react-native';

import {
  DrawerContent,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {AppColors, routes} from '../../utils/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppIcon, {Icons} from '../../libComponents/AppIcon';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../../redux/auth.reducer';
import AppModal from '../../libComponents/AppModal';
import {BASE_URL} from '../../base/commonServices';

const CustomDrawerContent = props => {
  const userData = useSelector(state => state.auth.userData);
  // console.log('user data at drawer', userData);

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Logout function----
  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(setLoggedIn(false));
    setIsLogoutModalVisible(false);
  };

  return (
    <>
      <View style={{backgroundColor: AppColors.lightYellow}}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.Profile)}
            activeOpacity={0.7}
            style={styles.profileIconContainer}>
            {userData?.profile_picture ? (
              <Image
                style={styles.profileImage}
                source={{uri: BASE_URL + userData.profile_picture}}
              />
            ) : (
              <AppIcon
                type={Icons.Ionicons}
                name="person-circle-outline"
                size={65}
                color={AppColors.dark_gray}
              />
            )}
          </TouchableOpacity>
          <View style={{gap: 4, alignItems: 'center'}}>
            <Text style={styles.userNameText}>{userData?.name || '-'}</Text>
            <Text style={{color: AppColors.black}}>
              {'+91-' + userData?.phone_no?.slice(3) || '-'}
            </Text>
          </View>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <View
          style={{flex: 1, backgroundColor: AppColors.white, marginTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => setIsLogoutModalVisible(!isLogoutModalVisible)}
        style={{marginBottom: 25, marginLeft: 20, paddingVertical: 10}}>
        <View style={{flexDirection: 'row'}}>
          <AppIcon
            type={Icons.MaterialIcons}
            name="logout"
            size={25}
            color="black"
          />
          <Text style={{fontSize: 17, marginLeft: 7, color: 'black'}}>
            Logout
          </Text>
        </View>
      </TouchableOpacity>
      <AppModal
        titleLeftButton="Cancel"
        titileRightButton="Logout"
        heading="Are You sure you want to logout?"
        isModalVisible={isLogoutModalVisible}
        onleftButtonClick={() => setIsLogoutModalVisible(!isLogoutModalVisible)}
        onRightButtonCLick={() => handleLogout()}
        onRequestClose={() => setIsLogoutModalVisible(!isLogoutModalVisible)}
      />
    </>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconContainer: {
    height: 70,
    width: 70,
    borderRadius: 40,
    backgroundColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppColors.white,
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: AppColors.white,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.primary,
    letterSpacing: 5,
  },
});
