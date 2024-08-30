import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../utils/constants';
import AppText from './AppText';
import AppIcon, {Icons} from './AppIcon';
import {Icon} from 'react-native-vector-icons/Icon';

const AppChatHeader = ({
  isDrawer = true,
  screen,
  isIcon = true,
  isTimer = false,
  oninfoPress,
  isInfoButton = true,
  isEndButton = true,
  onEndButton,
  isDot = true,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: AppColors.lightYellow,
        flexDirection: 'row',
        elevation: 2,
        paddingHorizontal: 15,
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
          }}>
          {isIcon &&
            (isDrawer ? (
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={{
                  height: '100%',
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <AppIcon
                  type={Icons.FontAwesome}
                  name={'bars'}
                  color={AppColors.black}
                  size={21}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: '100%',
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <AppIcon
                  type={Icons.AntDesign}
                  name={'arrowleft'}
                  color={AppColors.black}
                  size={22}
                />
              </TouchableOpacity>
            ))}
          <View style={{}}>
            <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
              <AppText
                style={{
                  color: AppColors.black,
                  fontSize: 19,
                  fontWeight: 'bold',
                }}>
                {screen}
              </AppText>
              {isDot && (
                <AppIcon
                  type={Icons.Octicons}
                  name="dot-fill"
                  color="green"
                  size={18}
                />
              )}
            </View>
            {isTimer}
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: 25, alignItems: 'center'}}>
        {isInfoButton && (
          <TouchableOpacity
            onPress={oninfoPress}
            style={styles.ifnoButtonContainer}>
            <AppIcon
              type={Icons.Entypo}
              name="info-with-circle"
              color={AppColors.black}
              size={28}
            />
          </TouchableOpacity>
        )}
        {isEndButton && (
          <TouchableOpacity
            onPress={onEndButton}
            style={styles.endButtonContainer}>
            <AppText style={styles.endButtonText}>END</AppText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default AppChatHeader;

const styles = StyleSheet.create({
  endButtonContainer: {
    backgroundColor: AppColors.red,
    height: 30,
    width: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderRightWidth: 1.2,
    borderLeftWidth: 1.2,
  },
  endButtonText: {
    color: AppColors.lightYellow,
    fontSize: 13,
    fontWeight: 'bold',
  },
  ifnoButtonContainer: {
    // backgroundColor: AppColors.white,
    // height: 30,
    // width: 30,
    // borderRadius: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1.3,
    // borderColor: AppColors.black,
  },
});
