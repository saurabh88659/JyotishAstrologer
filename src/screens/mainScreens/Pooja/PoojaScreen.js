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
  deletePooja,
  getPooja,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../../libComponents/AppLoader';
import {AppColors, routes} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';
import {BASE_URL} from '../../../base/commonServices';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppModal from '../../../libComponents/AppModal';

const PoojaScreen = ({navigation}) => {
  const [PoojaData, setPoojaData] = React.useState([]);
  const [screenLoading, setScreenLoading] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);
  const [isDeleteOfferModalVisible, setIsDeleteOfferModalVisible] =
    useState(false);
  const [PoojaId, setPoojaId] = useState('');

  useEffect(() => {
    if (isFocused) {
      handleGetPooja();
    }
  }, [isFocused]);

  const handleGetPooja = async () => {
    setScreenLoading(true);
    const res = await getPooja();
    console.log('getPooja======', JSON.stringify(res));
    if (res.success) {
      setScreenLoading(false);
      //  setPoojaData([1, 2, 3, 3]);
      setPoojaData(res.data.data);
    } else {
      setScreenLoading(false);
      setPoojaData([]);
    }
  };

  const OnRefresh = async () => {
    setRefresh(true);
    const res = await getPooja();
    if (res.success) {
      ToastAndroid.show(
        'Pooja deleted successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setRefresh(false);
      setPoojaData(res.data.data);
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setRefresh(false);
      setPoojaData([]);
    }
  };

  const HandeDeletePooja = async () => {
    setDeleteModalButtonLoading(true);
    const res = await deletePooja(PoojaId);
    console.log('res of deletePooja---', res.data);
    if (res.success) {
      OnRefresh();
      setDeleteModalButtonLoading(false);
      setIsDeleteOfferModalVisible(false);
    } else {
      setIsDeleteOfferModalVisible(false);
      setDeleteModalButtonLoading(false);
    }
  };

  const PoojaCard = ({item, index}) => {
    console.log('item---', item);
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
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <AppText
              style={{
                fontWeight: '600',
                width: '82%',
                // backgroundColor: 'red',
              }}>
              Pooja Name :{' '}
              <AppText
                style={{
                  fontWeight: '600',
                  color: AppColors.primary,
                }}>
                {item.title || '-'}
              </AppText>
            </AppText>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routes.Add_Pooja, {EditPoojaData: item})
                }
                hitSlop={30}>
                <AppIcon
                  size={17}
                  type={Icons.FontAwesome5}
                  name="edit"
                  color={AppColors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible),
                    setPoojaId(item.id);
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
            {moment(item.date).format('DD MMM YY')} {item.time}
          </AppText>
          <AppText style={{textAlign: 'justify'}}>
            Price:{' '}
            <AppText style={{color: AppColors.primary}}>
              ₹{item?.price || '-'}
            </AppText>
          </AppText>
          <AppText style={{textAlign: 'justify'}}>
            Seats : {item.seats || '-'}
          </AppText>
          <AppText style={{textAlign: 'justify'}}>
            Description : {item.description || '-'}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'My Pooja'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          {Array.isArray(PoojaData) && PoojaData.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: '17%',
              }}
              data={PoojaData}
              renderItem={PoojaCard}
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
        onPress={() => navigation.navigate(routes.Add_Pooja)}
        // buttonLoading={buttonLoading}
        height={50}
        title={'ADD POOJA'}
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
        heading="Sure you want to delete pooja?"
        isModalVisible={isDeleteOfferModalVisible}
        onleftButtonClick={() =>
          setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible)
        }
        onRightButtonCLick={() => HandeDeletePooja()}
        onRequestClose={() =>
          setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible)
        }
      />
    </AppContainer>
  );
};

export default PoojaScreen;

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
