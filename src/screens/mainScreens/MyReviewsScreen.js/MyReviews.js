import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppText from '../../../libComponents/AppText';
import {AppColors} from '../../../utils/constants';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {
  deleteReview,
  getReviews,
  reviewReply,
} from '../../../base/features/MainApiServices/MainApiServices';
import {FlatList} from 'react-native';
import {RefreshControl} from 'react-native';
import AppLoader from '../../../libComponents/AppLoader';
import moment from 'moment';
import AppStarReview from '../../../libComponents/AppStarReview';
import {TextInput} from 'react-native-gesture-handler';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {BASE_URL} from '../../../base/commonServices';
import AppModal from '../../../libComponents/AppModal';

const MyReviews = () => {
  const [clickedStarButton, setClickedStarButton] = useState('');
  const [reviewArrData, setReviewArrData] = useState([]);
  const [forFilterReviewArrData, setForFilterReviewArrData] = useState([]);
  const [allReviewData, setAllReviewData] = useState('');
  const [refreshReviewData, setRefreshReviewData] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [recipientData, setRecipientData] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isDeleteReviewModalVisible, setIsDeleteReviewModalVisible] =
    useState(false);
  const [reviewDeleteData, setReviewDeleteData] = useState('');
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);
  // const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    handleGetReviews();
  }, []);

  const handleGetReviews = async () => {
    setScreenLoading(true);
    const res = await getReviews();
    console.log(
      'res of handleGetReviews==5555555555----------------',
      JSON.stringify(res),
    );
    if (res.success) {
      setScreenLoading(false);
      setAllReviewData(res.data);
      setReviewArrData(res.data.data);
      setForFilterReviewArrData(res.data.data);
    } else {
      setScreenLoading(false);
      setReviewArrData('');
      setReviewArrData([]);
      setForFilterReviewArrData([]);
    }
  };

  const OnRefresh = async () => {
    setRefreshReviewData(true);
    const res = await getReviews();
    // console.log('res of handleGetReviews==', JSON.stringify(res.data.data));
    if (res.success) {
      setRefreshReviewData(false);
      setAllReviewData(res.data);
      setReviewArrData(res.data.data);
      setForFilterReviewArrData(res.data.data);
    } else {
      setReviewArrData('');
      setReviewArrData([]);
      setForFilterReviewArrData([]);
      setRefreshReviewData(false);
    }
  };

  const handleReviewReply = async () => {
    setButtonLoading(true);
    const data = {
      id: recipientData?.id,
      body: {
        reply: replyMessage,
      },
    };
    const res = await reviewReply(data);
    if (res.success) {
      OnRefresh();
      setRecipientData('');
      setReplyMessage('');
      setButtonLoading(false);
      ToastAndroid.show(
        'Reply submitted!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setIsModalVisible(false);
    } else {
      setIsModalVisible(false);
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const handleReviewDelete = async () => {
    setDeleteModalButtonLoading(true);
    const data = {
      id: reviewDeleteData?.id,
      body: {
        delete: true,
      },
    };
    const res = await deleteReview(data);
    // console.log('res of deleteReview==', res);
    if (res.success) {
      setDeleteModalButtonLoading(false);
      setIsDeleteReviewModalVisible(false);
      OnRefresh();
      // setRecipientData('');
      setButtonLoading(false);
      ToastAndroid.show(
        'Review updated successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      setIsDeleteReviewModalVisible(false);
      setDeleteModalButtonLoading(false);
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    }
  };

  const getFilteredstarArr = star => {
    setScreenLoading(true);
    if (star == 'All') {
      setTimeout(() => {
        setForFilterReviewArrData(reviewArrData);
        setScreenLoading(false);
      }, 100);
    } else {
      const Arr = reviewArrData.filter((item, index) => item?.rating == star);
      // console.log('Arr-------------', Arr);
      setTimeout(() => {
        setForFilterReviewArrData(Arr);
        setScreenLoading(false);
      }, 100);
    }
  };

  const starArr = [
    {title: 'All'},
    {title: '5'},
    {title: '4'},
    {title: '3'},
    {title: '2'},
    {title: '1'},
  ];
  const colors = [
    '#ff6347',
    '#ffa500',
    '#00ced1',
    '#4682b4',
    '#800080',
    '#ff6347',
    '#ffa500',
    '#00ced1',
    '#4682b4',
    '#800080',
  ];

  const CardReview = ({item, index}) => {
    // console.log('item===1111111111', item);
    return (
      <View
        key={index}
        style={{
          width: '100%',
          backgroundColor: AppColors.white,
          elevation: 6,
          marginTop: 5,
          paddingHorizontal: 10,
          paddingVertical: 15,
        }}>
        {/* <View style={{marginBottom: 10}}>
          <AppText style={{fontWeight: 'bold', alignSelf: 'center'}}>
            Order ID : 14339993
          </AppText>
          <View style={{position: 'absolute', alignSelf: 'flex-end'}}>
            <AppIcon type={Icons.Entypo} name="pin" color={AppColors.black} />
          </View>
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <View
            style={{
              height: 60,
              width: 60,
              backgroundColor: colors[index % colors.length],
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            {item.profile_picture ? (
              <Image
                style={{height: '100%', width: '100%', borderRadius: 30}}
                source={{uri: BASE_URL + item.profile_picture}}
              />
            ) : (
              <AppText
                style={{
                  fontSize: 30,
                  color: AppColors.white,
                  fontWeight: '800',
                }}>
                {item.user_profile?.charAt(0)?.toUpperCase() || 'J'}
              </AppText>
            )}
          </View>

          <View style={{flex: 1, marginTop: '3%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <AppText style={{fontSize: 17, fontWeight: 'bold'}}>
                {item.user_profile || '------'}
                {/* Saurabh */}
              </AppText>
              <TouchableOpacity
                onPress={() => {
                  setIsDeleteReviewModalVisible(!isDeleteReviewModalVisible);
                  setReviewDeleteData(item);
                  // handleReviewDelete(item);
                }}>
                <AppIcon
                  type={Icons.Foundation}
                  name="flag"
                  color={item?.delete ? 'green' : AppColors.dark_gray}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            {/* <AppText style={{fontSize: 17}}>
              Service :{' '}
              <AppText style={{color: 'green', fontSize: 16}}>CALL</AppText>
            </AppText> */}
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                marginTop: 3,
              }}>
              <AppStarReview
                rating={item?.rating > 5 ? 5 : item?.rating || 0}
              />
              {/* <AppStarReview rating={item?.rating} /> */}

              {/* <View style={{flexDirection: 'row', gap: 3}}>
                {[1, 1, 1, 1, 1].map(() => {
                  return (
                    <AppIcon
                      type={Icons.AntDesign}
                      name="star"
                      size={16}
                      color={AppColors.gold}
                    />
                  );
                })}
              </View> */}
              <AppText style={{color: AppColors.dark_gray}}>
                {moment(item?.created_at)?.format('DD MMM YYYY')}
                {/* 25 Apr 2024 */}
              </AppText>
            </View>
            {/* review */}
            <AppText style={{textAlign: 'justify', fontSize: 15, marginTop: 2}}>
              {item?.review || ''}
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris */}
            </AppText>

            {item?.reply ? (
              <View
                style={{
                  borderTopWidth: 0.2,
                  marginVertical: 10,
                  borderColor: AppColors.dark_gray,
                  paddingTop: 5,
                }}>
                <AppText>
                  <AppText style={{fontWeight: 'bold'}}>You : </AppText>
                  {item.reply}
                </AppText>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(!isModalVisible), setRecipientData(item);
                  console.log(item, '000');
                }}
                style={{flexDirection: 'row', gap: 10}}>
                <AppText
                  style={{
                    textDecorationLine: 'underline',
                    color: 'green',
                    fontSize: 17,
                  }}>
                  Reply to this review
                </AppText>
                <AppIcon
                  type={Icons.Fontisto}
                  name="share-a"
                  color="green"
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <AppContainer style={{backgroundColor: AppColors.gray}}>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={' My Reviews'} />
      {screenLoading ? (
        <AppLoader />
      ) : (
        <>
          <View
            style={{
              backgroundColor: AppColors.lightYellow,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <AppText>Flagged Reviews</AppText>
              <AppText>0</AppText>
            </View> */}
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <AppText>Missed call & chat</AppText>
              <AppText>2</AppText>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <AppText>Average rating</AppText>
              <AppStarReview
                color="#000"
                rating={allReviewData?.average_rating}
                isNumber={true}
              />
              {/* <AppText>{allReviewData.average_rating}</AppText> */}
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                opacity: 0.9,
              }}>
              <AppText style={{fontWeight: '700', fontSize: 18}}>
                User Balance
              </AppText>
              <AppText style={{fontWeight: '700', fontSize: 18}}>4/60</AppText>
            </View> */}
            <AppText style={{fontSize: 14, textAlign: 'justify', marginTop: 5}}>
              Note : System gives you maximum 60 flags (inclusive the count of
              missed call and chat) for your every month, Used balance will get
              reset 1st day of the month
            </AppText>
          </View>
          <View>
            <ScrollView
              horizontal
              contentContainerStyle={{
                backgroundColor: AppColors.white,
                paddingVertical: 15,
                marginBottom: 5,
              }}>
              {starArr.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setClickedStarButton(index),
                        getFilteredstarArr(item.title);
                    }}
                    key={index}
                    style={{
                      backgroundColor:
                        clickedStarButton == index
                          ? AppColors.primary
                          : AppColors.white,
                      borderWidth: clickedStarButton == index ? 0 : 1,
                      borderColor: AppColors.black,
                      width: 70,
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 13,
                      marginRight: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                      <AppText
                        style={{
                          color:
                            clickedStarButton == index
                              ? AppColors.white
                              : AppColors.black,
                        }}>
                        {item.title}
                      </AppText>
                      <AppIcon
                        type={Icons.AntDesign}
                        name="star"
                        color={
                          clickedStarButton == index
                            ? AppColors.white
                            : AppColors.black
                        }
                        size={15}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {Array.isArray(forFilterReviewArrData) &&
          forFilterReviewArrData.length > 0 ? (
            <FlatList
              contentContainerStyle={{paddingHorizontal: 2, paddingBottom: 10}}
              data={forFilterReviewArrData}
              renderItem={CardReview}
              keyExtractor={item => item?.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refreshReviewData}
                  onRefresh={() => OnRefresh()}
                />
              }
            />
          ) : (
            <View style={styles.noDatContainer}>
              <AppText style={styles.noDataText}>No data found!</AppText>
            </View>
          )}
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <AppText>To : {recipientData?.user_profile || '-'}</AppText>
              <TouchableOpacity
                onPress={() => setIsModalVisible(!isModalVisible)}
                style={styles.closeButton}>
                <AppIcon
                  type={Icons.Entypo}
                  name="cross"
                  color={AppColors.black}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              autoFocus={true}
              style={styles.input}
              placeholder="Type your message..."
              value={replyMessage}
              onChangeText={setReplyMessage}
            />
            <AppPrimaryButton
              onPress={handleReviewReply}
              buttonLoading={buttonLoading}
              disabled={replyMessage.length == 0}
              mainContainerStyle={{
                backgroundColor: AppColors.dark_gray,
                opacity: replyMessage.length == 0 ? 0.4 : 1,
              }}
              height={50}
              title="SEND"
            />
            {/* <TouchableOpacity onPress={() => {}} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>

      <AppModal
        buttonLoading={deleteModalButtonLoading}
        headingFontSize={18}
        titleLeftButton="Cancel"
        titileRightButton="Delete"
        heading="Sure you want to delete?"
        isModalVisible={isDeleteReviewModalVisible}
        onleftButtonClick={() =>
          setIsDeleteReviewModalVisible(!isDeleteReviewModalVisible)
        }
        onRightButtonCLick={() => handleReviewDelete()}
        onRequestClose={() =>
          setIsDeleteReviewModalVisible(!isDeleteReviewModalVisible)
        }
      />
    </AppContainer>
  );
};

export default MyReviews;
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingBottom: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
  input: {
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.primary,
    // borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: AppColors.black,
  },
  sendButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
  },
});
