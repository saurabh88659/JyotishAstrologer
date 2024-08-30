import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {
  deleteBlog,
  getBlogs,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../../libComponents/AppLoader';
import {AppColors, routes} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';
import {BASE_URL} from '../../../base/commonServices';
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppModal from '../../../libComponents/AppModal';

const BlogScreen = ({navigation}) => {
  const [blogData, setBlogData] = React.useState([]);
  const [screenLoading, setScreenLoading] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);
  const [isDeleteOfferModalVisible, setIsDeleteOfferModalVisible] =
    useState(false);
  const isFocused = useIsFocused();
  const [blogId, setblogId] = useState('');

  useEffect(() => {
    if (isFocused) {
      handleGetBlogs();
    }
  }, [isFocused]);

  const handleGetBlogs = async () => {
    setScreenLoading(true);
    const res = await getBlogs();
    console.log('getBlogs======', JSON.stringify(res));
    if (res.success) {
      setScreenLoading(false);
      setBlogData(res.data.data);
    } else {
      setScreenLoading(false);
      setBlogData([]);
    }
  };

  const OnRefresh = async () => {
    setRefresh(true);
    const res = await getBlogs();
    if (res.success) {
      setRefresh(false);
      setBlogData(res.data.data);
    } else {
      setRefresh(false);
      setBlogData([]);
    }
  };

  const HandeDeleteBlog = async () => {
    setDeleteModalButtonLoading(true);
    const res = await deleteBlog(blogId);
    // console.log('res of deleteBlog---', res.data);
    if (res.success) {
      OnRefresh();
      ToastAndroid.show(
        'Blog deleted successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setDeleteModalButtonLoading(false);
      setIsDeleteOfferModalVisible(false);
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setIsDeleteOfferModalVisible(false);
      setDeleteModalButtonLoading(false);
    }
  };

  const blogCard = ({item, index}) => {
    console.log('item---', item.description);
    return (
      <View
        key={index}
        style={{
          width: '100%',
          marginTop: 15,
          gap: 10,
          elevation: 6,
          backgroundColor: AppColors.white,
          borderRadius: 6,
          paddingBottom: 10,
        }}>
        <Image
          resizeMode="cover"
          source={{uri: BASE_URL + item.tumbnail}}
          style={{
            width: '100%',
            height: 170,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        />
        <View style={{gap: 5, paddingHorizontal: 12}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppText style={{fontWeight: '600', width: '80%'}}>
              {item?.title || '-'}
            </AppText>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routes.Add_Blog_Screen, {bolgData: item})
                }
                // hitSlop={30}
              >
                <AppIcon
                  size={22}
                  type={Icons.MaterialCommunityIcons}
                  name="notebook-edit-outline"
                  color={AppColors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible),
                    setblogId(item.id);
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
          </View>
          <AppText style={{textAlign: 'justify'}}>
            {item?.description || '-'}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'My Blog'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          {Array.isArray(blogData) && blogData.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: '17%',
              }}
              data={blogData}
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
              <AppText style={styles.noDataText}>No Data found!</AppText>
            </View>
          )}
        </>
      )}

      <AppPrimaryButton
        onPress={() => navigation.navigate(routes.Add_Blog_Screen)}
        // buttonLoading={buttonLoading}
        height={50}
        title={'ADD BLOG'}
        mainContainerStyle={{
          borderRadius: 0,
          position: 'absolute',
          bottom: 0,
        }}
        style={{borderRadius: 0}}
      />

      <AppModal
        buttonLoading={deleteModalButtonLoading}
        headingFontSize={18}
        titleLeftButton="Cancel"
        titileRightButton="Delete"
        heading="Sure you want to delete blog?"
        isModalVisible={isDeleteOfferModalVisible}
        onleftButtonClick={() =>
          setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible)
        }
        onRightButtonCLick={() => HandeDeleteBlog()}
        onRequestClose={() =>
          setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible)
        }
      />
    </AppContainer>
  );
};

export default BlogScreen;

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
