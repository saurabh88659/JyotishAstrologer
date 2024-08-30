import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../../../libComponents/AppText';
import {AppColors, routes} from '../../../utils/constants';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {
  getOffer,
  toggleOffer,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../../libComponents/AppLoader';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import AppModal from '../../../libComponents/AppModal';

const Offer = ({navigation}) => {
  const [OfferData, setOfferData] = useState([1, 2, 2, 2, 2, 2, 2]);
  const [screenLoading, setScreenLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const [deletOfferId, setDeleteOfferId] = useState('');
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);
  const [isDeleteOfferModalVisible, setIsDeleteOfferModalVisible] =
    useState(false);

  useEffect(() => {
    if (isFocused) {
      handleGetOffers();
    }
  }, [isFocused]);

  const handleGetOffers = async () => {
    setScreenLoading(true);
    const res = await getOffer();
    console.log('res of getOffer---', res);
    if (res.success) {
      setOfferData(res.data.data);
      setScreenLoading(false);
    } else {
      setOfferData([]);
      setScreenLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefresh(true);
    const res = await getOffer();
    if (res.success) {
      setOfferData(res.data.data);
      setRefresh(false);
    } else {
      setOfferData([]);
      setRefresh(false);
    }
  };

  const HandeToggleOffer = async (id, active) => {
    const data = {
      offerId: id,
      body: {active: active},
    };
    const res = await toggleOffer(data);
    if (res.success) {
      ToastAndroid.show(
        'Offer Activated!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  const HandeDeleteOffer = async () => {
    setDeleteModalButtonLoading(true);
    const data = {
      offerId: deletOfferId,
      body: {delete: true},
    };
    const res = await toggleOffer(data);
    if (res.success) {
      setDeleteModalButtonLoading(false);
      setIsDeleteOfferModalVisible(false);
      onRefresh();
      ToastAndroid.show(
        'Offer Deleted!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      setIsDeleteOfferModalVisible(false);
      setDeleteModalButtonLoading(false);
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  const OfferCard = ({item}) => {
    console.log('item---', item);
    const [isofferActive, setIsofferActive] = useState(item.active);
    return (
      <View
        key={refresh}
        style={{
          width: '100%',
          paddingBottom: 15,
          paddingTop: 10,
          elevation: 6,
          backgroundColor: AppColors.white,
          marginTop: 15,
          borderRadius: 6,
        }}>
        <View style={{paddingHorizontal: 15}}>
          <View
            style={{
              justifyContent: 'flex-end',
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignContent: 'center',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.Create_Offer, {editOfferData: item})
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
                setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible),
                  setDeleteOfferId(item.id);
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <AppText
              style={[
                styles.cardText,
                {fontWeight: 'bold', color: AppColors.black},
              ]}>
              Offer Name :{' '}
              <AppText
                style={[
                  styles.cardText,
                  {fontWeight: 'bold', color: AppColors.secondary},
                ]}>
                {item?.offer_name || '-'}
              </AppText>
            </AppText>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              thumbColor={isofferActive ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={() => {
                setIsofferActive(!isofferActive),
                  HandeToggleOffer(item.id, !isofferActive);
              }}
              value={isofferActive}
            />
          </View>
          <AppText
            style={[
              styles.cardText,
              {fontWeight: 'bold', color: AppColors.black},
            ]}>
            Display Name :{' '}
            <AppText
              style={[styles.cardText, {fontWeight: 'bold', color: 'green'}]}>
              {item?.display_name || '-'}
            </AppText>
          </AppText>
          <AppText style={[styles.cardText, {fontWeight: 'bold'}]}>
            Percentage off :{' '}
            <AppText
              style={[styles.cardText, {fontWeight: 'bold', color: 'green'}]}>
              {item?.percentage_off + '%' || '-'}
            </AppText>
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader screen={'Offers'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          {Array.isArray(OfferData) && OfferData.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: '13%',
              }}
              data={OfferData}
              renderItem={({item}) => <OfferCard item={item} />}
              keyExtractor={item => item.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => onRefresh()}
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
        onPress={() => navigation.navigate(routes.Create_Offer)}
        height={50}
        title={'ADD OFFER'}
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
        heading="Sure you want to delete offer?"
        isModalVisible={isDeleteOfferModalVisible}
        onleftButtonClick={() =>
          setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible)
        }
        onRightButtonCLick={() => HandeDeleteOffer()}
        onRequestClose={() =>
          setIsDeleteOfferModalVisible(!isDeleteOfferModalVisible)
        }
      />
    </AppContainer>
  );
};

export default Offer;

const styles = StyleSheet.create({
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
  cardText: {
    fontSize: 16,
  },
});
