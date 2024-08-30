import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import AppHeader from '../../../libComponents/AppHeader';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import AppText from '../../../libComponents/AppText';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import {Icon} from 'react-native-vector-icons/Icon';
import {AppColors} from '../../../utils/constants';
import ImagePicker from 'react-native-image-crop-picker';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {TextInput} from 'react-native';
import {
  editBlog,
  submitBlog,
} from '../../../base/features/MainApiServices/MainApiServices';
import {BASE_URL} from '../../../base/commonServices';
import {AppThemeContext} from '../../../base/context/AppThemeProvider';
import {FlatList} from 'react-native-gesture-handler';

const AddBlogScreen = ({navigation, route}) => {
  const bolgEditData = route?.params?.bolgData;
  console.log('bolgData---', bolgEditData);
  const [title, setTitle] = useState(bolgEditData ? bolgEditData?.title : '');
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(
    bolgEditData ? bolgEditData?.tumbnail : '',
  );

  const [description, setDescription] = useState(
    bolgEditData ? bolgEditData?.description : '',
  );

  const [descriptionError, setDescriptionError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [thumbnailUrlError, setThumbnailUrlError] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

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

  const validateForm = () => {
    let isValid = true;

    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!thumbnailUrl.trim()) {
      setThumbnailUrlError('Attachment is required');
      isValid = false;
    } else {
      setThumbnailUrlError('');
    }

    return isValid;
  };

  const HandleFormData = async () => {
    let formData = new FormData();
    formData.append('title', title);
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

  const handleEditBlog = async () => {
    setButtonLoading(true);
    const formData = await HandleFormData();
    const data = {
      blogId: bolgEditData?.id,
      body: formData,
    };
    const res = await editBlog(data);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Blog updated successfully!',
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

  const handleSubmitBlog = async () => {
    setButtonLoading(true);
    const formData = await HandleFormData();
    const res = await submitBlog(formData);
    if (res.success) {
      setButtonLoading(false);
      ToastAndroid.show(
        'Blog saved successfully!',
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
      if (bolgEditData) {
        handleEditBlog();
      } else {
        handleSubmitBlog();
      }
    }
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader
        screen={bolgEditData ? 'Edit Blog' : 'Add Blog'}
        isDrawer={false}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: '15%'}}>
        <View style={{flex: 1, paddingVertical: 15}}>
          <AppTextInputBottomLine
            labelText="Title"
            placeholder="Enter blog Title"
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
                      : bolgEditData
                      ? BASE_URL + thumbnailUrl
                      : thumbnailUrl,
                  }}
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

          <View style={{marginHorizontal: 12, marginTop: 20}}>
            <AppText style={{fontSize: 16, fontWeight: '500'}}>
              Description
            </AppText>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 15,
                borderColor: AppColors.dark_gray,
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

export default AddBlogScreen;

const styles = StyleSheet.create({});
