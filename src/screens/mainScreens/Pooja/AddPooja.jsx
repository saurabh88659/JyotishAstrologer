import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import AppText from '../../../libComponents/AppText';
import {Image} from 'react-native-animatable';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {AppColors, keyboardType, routes} from '../../../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {TextInput} from 'react-native';
import {
  editPooja,
  submitPooja,
} from '../../../base/features/MainApiServices/MainApiServices';
import AppDatePicker from '../../../libComponents/AppDatePicker';
import {BASE_URL} from '../../../base/commonServices';

const AddPooja = ({navigation, route}) => {
  const EditPoojaData = route?.params?.EditPoojaData;
  // console.log('EditPoojaData------', EditPoojaData);
  const [title, setTitle] = useState(EditPoojaData ? EditPoojaData?.title : '');
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(
    EditPoojaData ? EditPoojaData?.tumbnail : '',
  );
  const [description, setDescription] = useState(
    EditPoojaData ? EditPoojaData?.description : '',
  );
  const [seat, setSeat] = useState(EditPoojaData ? EditPoojaData?.seats : '');
  const [price, setPrice] = useState(EditPoojaData ? EditPoojaData?.price : '');
  const [time, setTime] = useState(EditPoojaData ? EditPoojaData?.time : '');
  const [date, setDate] = useState(EditPoojaData ? EditPoojaData?.date : '');
  const [buttonLoading, setButtonLoading] = useState(false);

  const [descriptionError, setDescriptionError] = useState('');
  const [seatError, setSeatError] = useState('');
  const [PriceError, setPriceError] = useState('');
  const [dateError, setDateError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [thumbnailUrlError, setThumbnailUrlError] = useState('');

  const validateForm = () => {
    let isValid = true;
    const numberRegex = /^\d+$/; // Regex to check if input contains only digits

    if (!title.trim()) {
      setTitleError('Pooja Name is required');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!seat) {
      setSeatError('Seat is required');
      isValid = false;
    } else if (!numberRegex.test(seat)) {
      setSeatError('Seat must be a number');
      isValid = false;
    } else {
      setSeatError('');
    }

    if (!price) {
      setPriceError('Price is required');
      isValid = false;
    } else if (!numberRegex.test(price)) {
      setPriceError('Price must be a number');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!date.trim()) {
      setDateError('Date is required');
      isValid = false;
    } else {
      setDateError('');
    }

    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!thumbnailUrl.trim()) {
      setThumbnailUrlError('Attachment is required');
      isValid = false;
    } else {
      setThumbnailUrlError('');
    }

    return isValid;
  };

  const uploadProfilePicture = () => {
    ImagePicker.openPicker({
      width: 650,
      height: 300,
      cropping: true,
    })
      .then(image => {
        console.log('image===>', image);
        setThumbnail(image);
        setThumbnailUrl(image.path);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const HandleFormData = async () => {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('seats', seat);
    formData.append('price', price);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('description', description);
    var filename = thumbnail?.path?.replace(/^.*[\\\/]/, '');
    {
      thumbnail &&
        formData.append('tumbnail', {
          name: filename,
          type: thumbnail?.mime,
          uri:
            Platform.OS === 'android'
              ? thumbnail?.path
              : thumbnail?.path.replace('file://', ''),
        });
    }
    return formData;
  };

  const handleSubmitPooja = async () => {
    setButtonLoading(true);
    const formData = await HandleFormData();
    const res = await submitPooja(formData);
    // console.log('res of handleSubmitPooja==add add', res);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Pooja saved successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      navigation.goBack();
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const handleEditPooja = async () => {
    setButtonLoading(true);
    const formData = await HandleFormData();
    const data = {
      PoojaId: EditPoojaData?.id,
      body: formData,
    };
    console.log(data, 'data----');
    const res = await editPooja(data);
    console.log('res of handleEditPooja=======editedit', res);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Pooja updated successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      navigation.goBack();
    } else {
      ToastAndroid.show(
        'Opps! Something went wrong',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
      setButtonLoading(false);
    }
  };

  const submit = () => {
    if (validateForm()) {
      if (EditPoojaData) {
        handleEditPooja();
      } else {
        handleSubmitPooja();
      }
    }
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader
        screen={EditPoojaData ? 'Edit Pooja' : 'Add Pooja'}
        isDrawer={false}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: '15%'}}>
        <View style={{flex: 1, paddingVertical: 15}}>
          <AppTextInputBottomLine
            labelText="Name"
            placeholder="Enter pooja name"
            value={title}
            onChangeText={setTitle}
            maxLength={25}
            validationError={titleError}
          />
          <View style={{marginHorizontal: 12, marginTop: 20}}>
            <AppText style={{fontSize: 16, fontWeight: '500'}}>
              Attachment
            </AppText>
            <TouchableOpacity
              onPress={uploadProfilePicture}
              style={{
                height: 110,
                width: 90,
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {thumbnailUrl ? (
                <Image
                  source={{
                    uri: thumbnail
                      ? thumbnailUrl
                      : EditPoojaData
                      ? BASE_URL + thumbnailUrl
                      : thumbnailUrl,
                  }}
                  // source={{uri: thumbnailUrl}}
                  style={{height: '100%', width: '100%', borderRadius: 5}}
                />
              ) : (
                <AppIcon
                  type={Icons.AntDesign}
                  name="plus"
                  color={AppColors.dark_gray}
                  size={32}
                />
              )}
            </TouchableOpacity>

            {thumbnailUrlError && (
              <Text style={{color: AppColors.red, fontSize: 14}}>
                {thumbnailUrlError}
              </Text>
            )}
          </View>

          <AppTextInputBottomLine
            labelText="Seats"
            placeholder="Enter seats"
            value={seat.toString()}
            onChangeText={setSeat}
            maxLength={25}
            validationError={seatError}
            keyboardType={keyboardType.phonePad}
          />

          <AppTextInputBottomLine
            labelText="Price"
            placeholder="Enter pooja Price"
            value={price?.toString()}
            onChangeText={setPrice}
            maxLength={25}
            keyboardType={keyboardType.phonePad}
            validationError={PriceError}
          />

          <AppDatePicker
            validationError={dateError}
            value={date + ' ' + time}
            onDateChange={(date, time) => {
              setDate(date);
              setTime(time);
            }}
          />

          <View style={{marginHorizontal: 12, marginTop: 20}}>
            <AppText style={{fontSize: 16, fontWeight: '500'}}>
              Description
            </AppText>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 15,
              }}>
              <TextInput
                value={description}
                maxLength={150}
                onChangeText={text => setDescription(text)}
                placeholder="Enter description"
                placeholderTextColor={AppColors.dark_gray}
                numberOfLines={10}
                multiline={true}
                style={{
                  height: 160,
                  width: '100%',
                  textAlign: 'justify',
                  textAlignVertical: 'top',
                  color: AppColors.black,
                  fontSize: 16,
                }}
              />
              <AppText
                style={{
                  alignSelf: 'flex-end',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                {description.length}/150
              </AppText>
            </View>
            {descriptionError && (
              <Text style={{color: AppColors.red, fontSize: 14}}>
                {descriptionError}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <AppPrimaryButton
        onPress={() => submit()}
        buttonLoading={buttonLoading}
        height={50}
        title={'SUBMIT'}
        mainContainerStyle={{
          borderRadius: 0,
          position: 'absolute',
          bottom: 0,
        }}
        style={{borderRadius: 0}}
      />
    </AppContainer>
  );
};

export default AddPooja;

const styles = StyleSheet.create({});
