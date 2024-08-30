import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import {AppColors} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
// import WalletPaymentDetailsCard from '../../../components/WalletPaymentDetailsCard';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import {
  getEarings,
  getWaitList,
  getWallet,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppLoder from '../../../libComponents/AppLoader';
import {formatToRupees} from '../../../utils/CommonFun';
import {useSelector} from 'react-redux';
import AppButton from '../../../libComponents/AppButton';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [walletData, setWalletData] = useState('');
  const [screenLoading, setScreenLoading] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  const [refresh, setRefresh] = useState(false);
  const [dataLoder, setDataLoder] = useState(false);
  const isFocused = useIsFocused();

  // date nhi aa rhi
  //   {
  //    "astro_charge":4318338,
  //    "astrologer":{
  //       "School_college_university":"null",
  //       "address":"A-16   KH-16 ADHYAPAK NAGAR ,NANGLOI WEST DELHI ADHYAPAK NAGAR Punjabi Bagh West Delhi India 110041",
  //       "age":null,
  //       "bio":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
  //       "call":true,
  //       "call_time":"08:03:24",
  //       "category_names":[
  //          "Health",
  //          "financial",
  //          null
  //       ],
  //       "certificate_of_astrology":"/media/Hiring_DevBack-End.pdf",
  //       "charges_per_min":40,
  //       "charges_per_min_approved":false,
  //       "chat":true,
  //       "chat_time":"01:20:15",
  //       "country":"India",
  //       "created_at":"2024-04-25T09:57:26Z",
  //       "degree":"null",
  //       "emergency_call":true,
  //       "emergency_chat":false,
  //       "facebook":"",
  //       "form_where_learn_astrologer":"null",
  //       "free_mins":-118,
  //       "gender":"Male",
  //       "highest_qualification":"null",
  //       "id":142,
  //       "instagram":"",
  //       "is_verified":true,
  //       "language":"English, hindi",
  //       "linkdin":"",
  //       "name":"NAMAN GARG",
  //       "offer_price":20,
  //       "profile_picture":"/media/70ce9db6-f469-4d4f-87d0-4bb50731a547.jpg",
  //       "profile_picture1":null,
  //       "profile_picture2":null,
  //       "profile_picture3":null,
  //       "profile_picture4":null,
  //       "specialization":"vedic,tarot,vastu",
  //       "state":"Delhi",
  //       "top_astrologer":{
  //          "astrologer_name":null,
  //          "celebrity":true,
  //          "created_at":"2024-05-27T09:29:39Z",
  //          "from_date":null,
  //          "id":727,
  //          "payment_done":false,
  //          "price":717,
  //          "price_celebrity":100,
  //          "price_rising_star":2000,
  //          "price_top_choice":3000,
  //          "rising_star":false,
  //          "to_date":null,
  //          "top_choice":true,
  //          "updated_at":"2024-06-01T03:30:05.737983Z",
  //          "user":61
  //       },
  //       "total_number_of_call_chat_with_user":98765,
  //       "total_number_of_min_chat_with_user":9143,
  //       "total_number_of_orders":311,
  //       "updated_at":"2024-06-27T12:53:08.211076Z",
  //       "user":"+919999999991",
  //       "video_call":true,
  //       "video_call_time":"08:03:24",
  //       "website":"",
  //       "years_of_experience":7,
  //       "youtube_channel":""
  //    },
  //    "ended_at":"2024-06-08T07:54:53.113904Z",
  //    "id":783,
  //    "started_at":"2024-06-08T07:49:31.770682Z",
  //    "user":{
  //       "city_state_address":"",
  //       "created_at":"2024-06-06T18:11:21.011377Z",
  //       "current_address":"",
  //       "date_of_birth":"",
  //       "first_free":true,
  //       "full_name":"Ashish",
  //       "gender":null,
  //       "id":980,
  //       "pincode":null,
  //       "place_of_birth":"",
  //       "profile_picture":null,
  //       "time_of_birth":"",
  //       "updated_at":"2024-06-12T12:39:55.435195Z",
  //       "user":"+917595994860",
  //       "user_gender":null
  //    }
  // }

  useEffect(() => {
    if (userData) {
      // handleGetWallet();
      handleGetEarings();
    }
  }, [userData]);

  // const handleGetWallet = async () => {
  //   setScreenLoading(true);
  //   const res = await getWallet();
  //   console.log('res of getWallet===', res.data);
  //   if (res.success) {
  //     setWalletData(res.data);
  //     setScreenLoading(false);
  //   } else {
  //     setWalletData([]);
  //     setScreenLoading(false);
  //   }
  // };

  const handleGetEarings = async () => {
    setScreenLoading(true);
    const res = await getEarings(userData.id);
    console.log(
      'res of getEarings======================################################3',
      // JSON.stringify(res.data),
      res.data,
    );
    if (res.success) {
      setWalletData(res.data);
      setScreenLoading(false);
    } else {
      setWalletData([]);
      setScreenLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefresh(true);
    const res = await getEarings(userData.id);
    if (res.success) {
      setWalletData(res.data);
      setRefresh(false);
    } else {
      setWalletData([]);
      setRefresh(false);
    }
  };
  const switchData = type => {
    setDataLoder(true);
    setActiveTab(type);
    setTimeout(() => {
      setDataLoder(false);
    });
  };

  const WalletPaymentDetailsCard = ({item}) => {
    console.log('item=====', item);
    const start = new Date(item.started_at);
    const end = new Date(item.ended_at);
    // console.log('start---##', item.started_at);
    // console.log('end---##', item.ended_at);
    const durationMs = end - start;
    const time = Math.ceil(durationMs / 60000);
    return (
      <View
        style={{
          backgroundColor: AppColors.white,
          marginTop: 15,
          elevation: 6,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}>
        {/* <AppText style={{marginBottom: 3, color: AppColors.primary}}>
          Chat
        </AppText> */}
        <AppText style={{color: AppColors.dark_gray, marginBottom: 3}}>
          #{item.id}
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}>
          <AppText style={{fontSize: 15, width: '60%'}}>
            {activeTab == 'chat' ? 'Chat' : 'Call'} with {item?.user?.full_name}{' '}
            for {time} mintues
          </AppText>
          <AppText style={{color: 'green'}}>
            +{formatToRupees(item.astro_charge)}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}>
          <AppText style={{width: 150}}>UserId : {item?.user?.id}</AppText>
          <AppText style={{color: AppColors.dark_gray}}>
            {moment(item.started_at).format('DD MMM YY, hh:mm A')}
            {/* 24 apr 24,02:16 PM */}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader canBack={true} screen={'Wallet'} />
      {screenLoading ? (
        <AppLoder />
      ) : (
        <>
          <View style={{paddingHorizontal: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: AppColors.white,
                marginTop: 20,
              }}>
              <View
                style={{
                  height: 70,
                  width: '49%',
                  paddingVertical: 10,
                  elevation: 6,
                  backgroundColor: AppColors.white,
                  borderRadius: 10,
                  paddingHorizontal: 12,
                }}>
                <AppText style={{fontSize: 14, fontWeight: 'bold'}}>
                  Lifetime Earning
                </AppText>
                <AppText
                  style={{
                    fontSize: 15,
                    color: 'green',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  {formatToRupees(walletData?.lifetime_earning)}
                </AppText>
              </View>
              <View
                style={{
                  height: 70,
                  width: '49%',
                  paddingVertical: 10,
                  elevation: 6,
                  backgroundColor: AppColors.white,
                  borderRadius: 10,
                  paddingHorizontal: 12,
                }}>
                <AppText style={{fontSize: 14, fontWeight: 'bold'}}>
                  Monthly Earning
                </AppText>
                <AppText
                  style={{
                    fontSize: 15,
                    color: 'green',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  {formatToRupees(walletData?.monthly_earning)}
                </AppText>
              </View>
            </View>
            {/* weekly--------------------------- */}
            <View
              style={{
                height: 70,
                width: '100%',
                paddingVertical: 10,
                elevation: 6,
                backgroundColor: AppColors.white,
                borderRadius: 10,
                paddingHorizontal: 12,
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'red',
              }}>
              <View>
                <AppText style={{fontSize: 14, fontWeight: 'bold'}}>
                  Today's Earning
                </AppText>
                <AppText
                  style={{
                    fontSize: 15,
                    color: 'green',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  {formatToRupees(walletData?.today_earning)}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'green',
                }}>
                {/* <View style={{alignItems: 'center', marginRight: 15}}>
                  <AppText
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: AppColors.darkYellow,
                    }}>
                    Rank
                  </AppText>
                  <AppText
                    style={{
                      fontSize: 15,
                      color: 'green',
                      fontWeight: 'bold',
                      marginTop: 5,
                    }}>
                    8724
                  </AppText>
                </View> */}
                {/* <AppIcon
                  type={Icons.Entypo}
                  name="chevron-thin-right"
                  color={AppColors.dark_gray}
                  size={23}
                /> */}
              </View>
            </View>

            {/* weekly--------------------------- */}
            {/* <View
              style={{
                height: 70,
                width: '100%',
                paddingVertical: 10,
                elevation: 6,
                backgroundColor: AppColors.white,
                borderRadius: 10,
                paddingHorizontal: 12,
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'red'/,
                alignItems: 'center',
              }}>
              <View style={{width: '45%'}}>
                <AppText style={{fontSize: 14, fontWeight: 'bold'}}>
                  Available Balance
                </AppText>
                <AppText
                  style={{
                    fontSize: 15,
                    color: 'green',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  ₹0
                </AppText>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  marginRight: 15,
                  width: '45%',
                  // backgroundColor: 'green',
                }}>
                <AppText
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    // color: AppColors.,
                  }}>
                  Payable Amount
                </AppText>
                <AppText
                  style={{
                    fontSize: 15,
                    color: 'green',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  ₹0
                </AppText>
              </View>

              <AppIcon
                type={Icons.Entypo}
                name="chevron-thin-right"
                color={AppColors.dark_gray}
                size={23}
              />
            </View> */}
            <View
              style={{
                backgroundColor: AppColors.white,
                marginTop: 15,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <AppButton
                onPress={() => switchData('chat')}
                style={{
                  borderRadius: 0,
                  backgroundColor:
                    activeTab == 'chat' ? AppColors.primary : AppColors.white,
                  borderWidth: activeTab == 'chat' ? 0 : 1,
                }}
                titleColor={
                  activeTab == 'chat' ? AppColors.white : AppColors.black
                }
                title="CHAT"
                width={'49%'}
              />

              <AppButton
                onPress={() => {
                  switchData('call');
                }}
                style={{
                  borderRadius: 0,
                  backgroundColor:
                    activeTab == 'call' ? AppColors.primary : AppColors.white,
                  borderWidth: activeTab == 'call' ? 0 : 1,
                }}
                titleColor={
                  activeTab == 'call' ? AppColors.white : AppColors.black
                }
                title="CALL"
                width={'49%'}
              />
            </View>

            <View
              style={{
                height: 0.6,
                backgroundColor: AppColors.dark_gray,
                marginTop: 15,
              }}></View>
          </View>

          {dataLoder ? (
            <AppLoder />
          ) : (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: '17%',
              }}
              data={activeTab == 'chat' ? walletData.chat : walletData.call}
              renderItem={WalletPaymentDetailsCard}
              keyExtractor={item => item.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => onRefresh()}
                />
              }
            />
          )}
        </>
      )}
    </AppContainer>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
