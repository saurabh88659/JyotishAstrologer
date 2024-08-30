import {Modal, StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppText from '../../../libComponents/AppText';
import AppButton from '../../../libComponents/AppButton';
import {AppColors} from '../../../utils/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {
  BuyTopastrologerTitle,
  getTitlePrice,
} from '../../../base/features/MainApiServices/MainApiServices';
import {formatToRupees} from '../../../utils/CommonFun';

const SelectDate = ({onDateChange, datVal}) => {
  const [date] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState('');
  const [selectedDate, setSelectedDate] = useState(datVal);

  useEffect(() => {
    setSelectedDate(datVal);
  }, [datVal]);

  const handleDate = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    // const formattedDate = moment(date).format('DD MMM YY');
    onDateChange(formattedDate);
    setSelectedDate(formattedDate);
    setShowDatePicker(!showDatePicker);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDatePicker(!showDatePicker)}
        style={{
          borderWidth: 1,
          borderRadius: 5,
          height: 32,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AppText style={{fontSize: 15, fontWeight: '400'}}>
          {selectedDate
            ? moment(selectedDate).format('DD MMM YY')
            : 'Select Date'}
        </AppText>
      </TouchableOpacity>
      <DatePicker
        minimumDate={date}
        // is24hourSource={true}
        is24hourSource="locale"
        mode="date"
        modal
        open={showDatePicker}
        date={date}
        onConfirm={handleDate}
        onCancel={() => setShowDatePicker(!showDatePicker)}
      />
    </>
  );
};

const TopAstrologers = () => {
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [priceData, setPriceData] = useState([]);
  const [payableAmout, setPayableAmout] = useState('');

  const data = [
    {title: 'Celebrity', value: 'celebrity'},
    {title: 'Top Choice', value: 'top_choice'},
    {title: 'Rising Star', value: 'rising_star'},
  ];

  useEffect(() => {
    handlGetTitlePrice();
  }, []);

  const handlGetTitlePrice = async () => {
    const res = await getTitlePrice();
    console.log('res of getTitlePrice-----', res.data);
    if (res.success) {
      setPriceData(res.data.data[0]);
    } else {
      setPriceData('');
    }
  };

  const handleBuyTopastrologerTitle = async () => {
    if (title && fromDate && toDate) {
      const data = {
        celebrity: 'celebrity' == title?.value,
        top_choice: 'top_choice' == title?.value,
        rising_star: 'rising_star' == title?.value,
        from_date: fromDate,
        to_date: toDate,
      };
      const res = await BuyTopastrologerTitle(data);
      if (res.success) {
        setFromDate('');
        setToDate('');
        setTitle('');
        setPayableAmout('');
        ToastAndroid.show('Purchased successfully!', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('All fields required', ToastAndroid.SHORT);
    }
  };

  const calculatePrice = (title, fromDate, toDate) => {
    console.log('title', title);
    console.log('fromDate', fromDate);
    console.log('toDate', toDate);
    const pricePerDay =
      title === 'celebrity'
        ? priceData.price_celebrity
        : title === 'top_choice'
        ? priceData.price_top_choice
        : priceData.price_rising_star;
    console.log('pricePerDay=====', pricePerDay);
    const start = moment(fromDate, 'YYYY-MM-DD');
    const end = moment(toDate, 'YYYY-MM-DD');
    const numberOfDays = end.diff(start, 'days') + 1;
    console.log('numberOfDays=====', numberOfDays);
    const totalPrice = pricePerDay * numberOfDays;
    console.log('total price----', totalPrice);
    setPayableAmout(totalPrice);
  };

  useEffect(() => {
    if (title && fromDate && toDate) {
      calculatePrice(title?.value, fromDate, toDate);
    }
  }, [title, fromDate, toDate]);

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'Top Astrologer'} />
      <View style={{paddingHorizontal: 15, paddingVertical: '10%', gap: 20}}>
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => {
            setShowModal(true);
          }}
          activeOpacity={0.7}>
          <AppText style={{fontSize: 16, fontWeight: '500'}}>Category</AppText>
          <AppText
            style={
              ([styles.categoryTitle],
              {color: title ? AppColors.black : AppColors.dark_gray})
            }>
            {title ? title.title : 'Pick a category that interests you'}
          </AppText>
        </TouchableOpacity>
        <View style={styles.datePickerContainer}>
          <View style={{width: '40%', gap: 10}}>
            <AppText style={{fontSize: 16, fontWeight: '500'}}>From</AppText>
            <SelectDate
              datVal={fromDate}
              onDateChange={item => setFromDate(item)}
            />
          </View>
          <View style={{width: '40%', gap: 10}}>
            <AppText style={{fontSize: 16, fontWeight: '500'}}>To</AppText>
            <SelectDate
              datVal={toDate}
              onDateChange={item => setToDate(item)}
            />
          </View>
        </View>
      </View>

      <AppPrimaryButton
        onPress={handleBuyTopastrologerTitle}
        // buttonLoading={buttonLoading}
        //    disabled={}
        height={50}
        title={`PAY ${payableAmout ? formatToRupees(payableAmout) : ''}`}
        mainContainerStyle={{
          borderRadius: 0,
          position: 'absolute',
          bottom: 0,
        }}
        style={{borderRadius: 0}}
      />

      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.modalBack}>
          <View style={styles.modalContainer}>
            <AppText style={{fontSize: 16, textAlign: 'center'}}>
              Please choose an option from the list below
            </AppText>
            <View style={styles.buttonContiner}>
              {data.map((item, index) => {
                console.log(item);
                return (
                  <AppButton
                    titleColor={
                      title.title == item.title
                        ? AppColors.white
                        : AppColors.black
                    }
                    onPress={() => {
                      setTitle(item);
                      setTimeout(() => {
                        setShowModal(!showModal);
                      }, 500);
                    }}
                    title={item.title}
                    style={{
                      width: '100%',
                      height: 55,
                      backgroundColor:
                        title.title == item.title ? AppColors.primary : null,
                      borderWidth: title.title == item.title ? 0 : 1,
                      borderColor: AppColors.black,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </AppContainer>
  );
};

export default TopAstrologers;
const styles = StyleSheet.create({
  categoryContainer: {
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 1,
    paddingVertical: 10,
    gap: 15,
  },
  modalContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: AppColors.grayShade,
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 20,
    width: '100%',
    borderRadius: 6,
  },
  buttonContiner: {
    width: '100%',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  modalBack: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
  },
});
