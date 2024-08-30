import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {
  deleteSupportMessage,
  getSupportChat,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../../libComponents/AppLoader';
import {AppColors, routes} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppModal from '../../../libComponents/AppModal';

const QuickChat = ({navigation}) => {
  const [supportChatData, setSupportChatData] = React.useState([]);
  const [screenLoading, setScreenLoading] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [
    deleteSupportChatModalButtonLoading,
    setDeleteSupportChatModalButtonLoading,
  ] = useState(false);
  const [
    isShowDeleteSupportChatModalVisible,
    setIsShowDeleteSupportChatModalVisible,
  ] = useState(false);

  const isFocused = useIsFocused();

  const [idDeleteSupportChat, setIdDeleteSupportChat] = useState('');

  useEffect(() => {
    if (isFocused) {
      handleGetSupportChat();
    }
  }, [isFocused]);

  const handleGetSupportChat = async () => {
    setScreenLoading(true);
    const res = await getSupportChat();
    console.log('getSupportChat======', JSON.stringify(res));
    if (res.success) {
      setScreenLoading(false);
      setSupportChatData(res.data.data);
    } else {
      setScreenLoading(false);
      setSupportChatData([]);
    }
  };

  const OnRefresh = async () => {
    setRefresh(true);
    const res = await getSupportChat();
    if (res.success) {
      setRefresh(false);
      setSupportChatData(res.data.data);
    } else {
      setRefresh(false);
      setSupportChatData([]);
    }
  };

  const HandeDeleteSupportMessage = async () => {
    setDeleteSupportChatModalButtonLoading(true);
    const res = await deleteSupportMessage(idDeleteSupportChat);
    if (res.success) {
      setDeleteSupportChatModalButtonLoading(false);
      setIsShowDeleteSupportChatModalVisible(false);
      OnRefresh();
      ToastAndroid.show(
        'Message Deleted successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      setIsShowDeleteSupportChatModalVisible(false);
      setDeleteModalButtonLoading(false);
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  const blogCard = ({item, index}) => {
    console.log('item---', item);
    return (
      <View
        key={index}
        style={{
          width: '100%',
          elevation: 6,
          backgroundColor: AppColors.white,
          borderRadius: 10,
          paddingBottom: 10,
          marginTop: 20,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignContent: 'center',
            marginBottom: 8,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.Add_Quick_Chat, {editChatData: item})
            }
            style={{
              width: 40,
              marginLeft: 10,
              alignItems: 'flex-end',
            }}>
            <AppIcon
              type={Icons.FontAwesome}
              name="edit"
              color={AppColors.black}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsShowDeleteSupportChatModalVisible(
                !isShowDeleteSupportChatModalVisible,
              );
              setIdDeleteSupportChat(item.id);
            }}
            style={{
              width: 30,
              alignItems: 'flex-end',
              marginLeft: 5,
            }}>
            <AppIcon
              type={Icons.AntDesign}
              name="delete"
              color={AppColors.black}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: AppColors.primary,
            paddingVertical: 8,
            borderRadius: 5,
            paddingHorizontal: 20,
          }}>
          <AppText style={{textAlign: 'justify', color: AppColors.white}}>
            {item?.message || '-'}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'Quick Chat'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          {Array.isArray(supportChatData) && supportChatData.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: '17%',
              }}
              data={supportChatData}
              renderItem={blogCard}
              keyExtractor={item => item.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => OnRefresh()}
                />
              }
            />
          ) : (
            <View style={styles.noDatContainer}>
              <AppText style={styles.noDataText}>No message available!</AppText>
            </View>
          )}
        </>
      )}

      <AppPrimaryButton
        onPress={() => navigation.navigate(routes.Add_Quick_Chat)}
        // buttonLoading={buttonLoading}
        height={50}
        title={'ADD QUICK CHAT'}
        mainContainerStyle={{
          borderRadius: 0,
          position: 'absolute',
          bottom: 0,
        }}
        style={{borderRadius: 0}}
      />

      <AppModal
        buttonLoading={deleteSupportChatModalButtonLoading}
        headingFontSize={18}
        titleLeftButton="Cancel"
        titileRightButton="Delete"
        heading="Sure you want to delete message?"
        isModalVisible={isShowDeleteSupportChatModalVisible}
        onleftButtonClick={() =>
          setIsShowDeleteSupportChatModalVisible(
            !isShowDeleteSupportChatModalVisible,
          )
        }
        onRightButtonCLick={() => HandeDeleteSupportMessage()}
        onRequestClose={() =>
          setIsShowDeleteSupportChatModalVisible(
            !isShowDeleteSupportChatModalVisible,
          )
        }
      />
    </AppContainer>
  );
};

export default QuickChat;

const styles = StyleSheet.create({
  followerCountContainer: {
    backgroundColor: AppColors.skyBlue,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  noDatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noDataText: {
    fontWeight: '600',
    color: AppColors.dark_gray,
    fontSize: 18,
  },
});
