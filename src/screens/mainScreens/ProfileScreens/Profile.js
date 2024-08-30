import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';

import React, {useRef, useState} from 'react';
import AppHeader from '../../../libComponents/AppHeader';
import AppContainer from '../../../libComponents/AppContainer';
import AppStatusBar from '../../../libComponents/AppStatusBar';
import {AppColors, routes} from '../../../utils/constants';
import AppText from '../../../libComponents/AppText';
import AppTextInputBottomLine from '../../../libComponents/AppTextInputBottomLine';
import {useDispatch, useSelector} from 'react-redux';
import AppPrimaryButton from '../../../libComponents/AppPrimaryButton';
import {setUserData} from '../../../redux/auth.reducer';
import {updateProfile} from '../../../base/features/MainApiServices/MainApiServices';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppIcon, {Icons} from '../../../libComponents/AppIcon';
import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native-animatable';
import {BASE_URL} from '../../../base/commonServices';
import DocumentPicker from 'react-native-document-picker';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const ScrollViewRef = useRef();
  const userData = useSelector(state => state.auth.userData);
  console.log('userdata--------', userData.age);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [gender, setGender] = useState(userData ? userData.gender : '');
  const [genderError, setGenderError] = useState('');
  //personal details
  const [fullName, setFullName] = useState(userData ? userData.name : '');
  const [age, seAge] = useState(userData ? userData.age : '');
  const [ageError, setAgeError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(userData ? userData.name : '');
  const [yearsOfExperience, setYearsOfExperience] = useState(
    userData ? userData.years_of_experience : '',
  );
  const [chargesPerMinute, setChargesPerMinute] = useState(
    userData ? userData.years_of_experience : '',
  );

  const [language, setLanguage] = useState(userData ? userData.language : '');

  const [specialization, setSpecialization] = useState(
    userData ? userData.specialization : '',
  );

  const [bio, setBio] = useState(userData ? userData.bio : '');

  const [certificate, setCertificate] = useState('');

  const [certificateName, setCertificateName] = useState(
    userData.certificate_of_astrology ? userData.certificate_of_astrology : '',
  );

  const [country, setCountry] = useState(userData ? userData.country : '');
  const [state, setState] = useState(userData ? userData.state : '');
  const [address, setAddress] = useState(userData ? userData.address : '');
  const [profilePic, setProfilePic] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState(
    userData?.profile_picture ? BASE_URL + userData?.profile_picture : '',
  );
  //qualificaion
  const [highest_qualification, setHighest_qualification] = useState(
    userData?.highest_qualification ? userData?.highest_qualification : '',
  );
  const [degree_Diploma, setDegree_Diploma] = useState(
    userData?.degree ? userData?.degree : '',
  );

  const [school_college_university, setSchool_college_university] = useState(
    userData?.School_college_university
      ? userData?.School_college_university
      : '',
  );

  const [form_where_learn_astrologer, setForm_where_learn_astrologer] =
    useState(
      userData?.form_where_learn_astrologer
        ? userData.form_where_learn_astrologer
        : '',
    );

  //social media contects
  const [instagram, setInstagram] = useState(
    userData?.instagram ? userData.instagram : '',
  );
  const [facebook, setFacebook] = useState(
    userData?.facebook ? userData.facebook : '',
  );
  const [linkdin, setLinkdin] = useState(
    userData?.linkdin ? userData.linkdin : '',
  );
  const [youtube_channel, setYoutube_channel] = useState(
    userData?.website ? userData.website : '',
  );
  const [website, setWebsite] = useState(
    userData?.website ? userData.website : '',
  );

  const HandleFormData = async () => {
    let formData = new FormData();

    var filename = profilePic?.path?.replace(/^.*[\\\/]/, '');
    {
      profilePic &&
        formData.append('profile_picture', {
          name: filename,
          type: profilePic?.mime,
          uri:
            Platform.OS === 'android'
              ? profilePic?.path
              : profilePic?.path.replace('file://', ''),
        });
    }
    {
      certificate &&
        formData.append('certificate_of_astrology', {
          uri: certificate[0]?.uri,
          type: certificate[0]?.type,
          name: certificate[0]?.name,
        });
    }
    formData.append('Name', fullName);
    formData.append('years_of_experience', yearsOfExperience);
    formData.append('charges_per_min', chargesPerMinute);
    formData.append('language', language);
    formData.append('specialization', specialization);
    formData.append('bio', bio);
    // formData.append('certificate_of_astrology', certificate);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('address', address);
    //qualification
    formData.append('highest_qualification', highest_qualification);
    formData.append('degree', degree_Diploma);
    formData.append('School_college_university', school_college_university);
    formData.append('form_where_learn_astrologer', form_where_learn_astrologer);
    //social madia
    formData.append('instagram', instagram);
    formData.append('facebook', facebook);
    formData.append('linkdin', linkdin);
    formData.append('youtube_channel', youtube_channel);
    formData.append('website', website);
    return formData;
  };

  const uploadProfilePicture = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    })
      .then(image => {
        console.log('image===>', image);
        setProfilePic(image);
        setProfilePicUrl(image.path);
        setTimeout(() => {
          isProfileChane();
        }, 1000);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const isProfileChane = () => {
    if (ScrollViewRef.current) {
      ScrollViewRef.current.scrollToEnd({animated: true});
    }
  };

  const handleUpdateProfile = async () => {
    setButtonLoading(true);
    const formData = await HandleFormData();
    const data = {id: userData?.id, body: formData};
    const res = await updateProfile(data);
    // console.log(
    //   'res of handleUpdateProfile====================================',
    //   res.data,
    // );
    if (res.success) {
      setButtonLoading(false);
      navigation.goBack();
      dispatch(setUserData(res.data.data));
      ToastAndroid.show(
        'Service update successfully!',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    } else {
      setButtonLoading(false);
      Object.keys(res?.data)?.forEach(key => {
        if (Array.isArray(res?.data[key])) {
          res?.data[key].forEach(error => {
            ToastAndroid?.show(
              `${key}, ${error}`,
              ToastAndroid.BOTTOM,
              ToastAndroid.LONG,
            );
          });
        } else {
          ToastAndroid?.show(
            `${key}, ${res?.data[key]}`,
            ToastAndroid.BOTTOM,
            ToastAndroid.LONG,
          );
        }
      });
      // ToastAndroid.show(
      //   'Something went wrong!',
      //   ToastAndroid.BOTTOM,
      //   ToastAndroid.SHORT,
      // );
    }
  };

  const uploadCertificate = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setCertificate(doc);
      setCertificateName(doc[0].name);
      console.log('doc---', doc[0].name);
    } catch (e) {
      console.log('user e', e);
    }
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isDrawer={false} screen={'My Profile'} />
      <ScrollView
        ref={ScrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 10}}>
        <View
          style={{
            width: '100%',
            backgroundColor: AppColors.white,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: AppColors.dark_gray,
            alignItems: 'center',
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <AppText style={{fontWeight: 'bold', marginBottom: 5}} fontSize={20}>
            Person Details
          </AppText>

          <TouchableOpacity
            onPress={uploadProfilePicture}
            style={styles.profilePicContainer}>
            {profilePicUrl ? (
              <Image
                style={{height: '100%', width: '100%', borderRadius: 10}}
                source={{uri: profilePicUrl}}
              />
            ) : (
              <AppIcon
                type={Icons.Ionicons}
                name="person"
                size={50}
                color={AppColors.primary}
              />
            )}
          </TouchableOpacity>

          <AppTextInputBottomLine
            editable={false}
            maxLength={25}
            value={fullName}
            onChangeText={setFullName}
            labelText="Full Name"
            placeholder={'Enter your Full Name"'}
          />

          <AppTextInputBottomLine
            editable={false}
            maxLength={3}
            value={age?.toString()}
            onChangeText={seAge}
            labelText="Age"
            placeholder={'Enter your Age'}
          />
          <AppTextInputBottomLine
            editable={false}
            maxLength={10} 
            value={gender}
            onChangeText={setGender}
            labelText="Gender"
            placeholder={'Enter your Gender'}
          />
          <AppTextInputBottomLine
            editable={true}
            maxLength={10}
            labelText="Years of experience"
            placeholder="Enter your Years of experience"
            value={yearsOfExperience?.toString()}
            onChangeText={setYearsOfExperience}
          />

          {/* <AppTextInputBottomLine
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            labelText="Phone Number"
            placeholder={'Enter your Phone Number'}
          /> */}
          <AppTextInputBottomLine
            maxLength={30}
            labelText="Language"
            placeholder="Enter your Language"
            value={language}
            onChangeText={setLanguage}
          />
          <AppTextInputBottomLine
            editable={true}
            maxLength={50}
            labelText="Specialization"
            placeholder="Enter your Specialization"
            value={specialization}
            onChangeText={setSpecialization}
          />
          <AppTextInputBottomLine
            maxLength={100}
            labelText="Bio"
            placeholder="Enter your bio"
            value={bio}
            onChangeText={setBio}
          />

          <View
            style={{
              width: '100%',
              marginTop: 15,
              paddingHorizontal: 12,
            }}>
            <Text
              style={{
                color: AppColors.black,
                textAlign: 'left',
                paddingVertical: 5,
                fontSize: 16,
                fontWeight: '500',
              }}>
              Upload Astrology Certificate
            </Text>
            <View
              style={{
                fontSize: 16,
                color: AppColors.black,
                borderBottomWidth: 1,
                borderBottomColor: AppColors.primary,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={uploadCertificate}
                style={styles.uploadCertificateButtonContainer}>
                <Text
                  style={{
                    color: AppColors.white,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  Choose a File
                </Text>
              </TouchableOpacity>

              {certificateName && (
                <View
                  style={{
                    // backgroundColor: 'pink',
                    alignSelf: 'center',
                    marginLeft: 10,
                    justifyContent: 'center',
                    width: '60%',
                  }}>
                  <AppText
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: AppColors.dark_gray,
                      //   backgroundColor: 'red',
                    }}>
                    {/* {certificate[0].name} */}
                    {certificateName}
                  </AppText>
                </View>
              )}
              {false && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(routes.View_Image_Screen, {
                      img: certificateName,
                    })
                  }
                  style={{alignSelf: 'center'}}>
                  <AppIcon
                    type={Icons.AntDesign}
                    name="eye"
                    color={AppColors.dark_gray}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <AppTextInputBottomLine
            editable={false}
            maxLength={30}
            labelText="Country"
            placeholder="Enter your Country"
            value={country}
            onChangeText={setCountry}
          />
          <AppTextInputBottomLine
            editable={false}
            maxLength={30}
            labelText="State"
            placeholder="Enter your State"
            value={state}
            onChangeText={setState}
          />
          <AppTextInputBottomLine
            editable={false}
            maxLength={150}
            labelText="Address"
            placeholder="Enter your Address"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: AppColors.white,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: AppColors.dark_gray,
            alignItems: 'center',
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <AppText style={{fontWeight: 'bold', marginBottom: 5}} fontSize={20}>
            Qualification
          </AppText>

          <AppTextInputBottomLine
            maxLength={50}
            value={highest_qualification}
            onChangeText={setHighest_qualification}
            labelText="select your Highest qualification"
            placeholder={'select your Highest qualification'}
          />

          <AppTextInputBottomLine
            maxLength={50}
            value={degree_Diploma}
            onChangeText={setDegree_Diploma}
            labelText="Degree/Diploma"
            placeholder={'select your Degree/Diploma'}
          />
          <AppTextInputBottomLine
            maxLength={50}
            value={school_college_university}
            onChangeText={setSchool_college_university}
            labelText="College/School/Univesity"
            placeholder={'Enter your College/School/Univesity'}
          />
          <AppTextInputBottomLine
            maxLength={50}
            value={form_where_learn_astrologer}
            onChangeText={setForm_where_learn_astrologer}
            labelText="From where did you learn Astrology"
            placeholder={'Enter From where did you learn Astrology'}
          />
        </View>

        <View
          style={{
            width: '100%',
            backgroundColor: AppColors.white,
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: AppColors.dark_gray,
            alignItems: 'center',
            paddingVertical: 20,
            marginVertical: 10,
          }}>
          <AppText style={{fontWeight: 'bold'}} fontSize={20}>
            Social Media
          </AppText>

          <AppTextInputBottomLine
            maxLength={100}
            value={instagram}
            onChangeText={setInstagram}
            labelText="Instagram profile link"
            placeholder={'Enter your Instagram profile link'}
          />

          <AppTextInputBottomLine
            maxLength={100}
            value={facebook}
            onChangeText={setFacebook}
            labelText="Facebook profile link"
            placeholder={'Enter your Facebook profile link'}
          />
          <AppTextInputBottomLine
            maxLength={100}
            value={linkdin}
            onChangeText={setLinkdin}
            labelText="Linkedin profile link"
            placeholder={'Enter your Linkedin profile link'}
          />
          <AppTextInputBottomLine
            maxLength={100}
            value={youtube_channel}
            onChangeText={setYoutube_channel}
            labelText="Youtube channel link"
            placeholder={'Enter your Youtube channel link'}
          />
          <AppTextInputBottomLine
            maxLength={100}
            value={website}
            onChangeText={setWebsite}
            labelText="WebSite profile link"
            placeholder={'Enter your WebSite profile link'}
          />
        </View>
        <AppPrimaryButton
          height={50}
          buttonLoading={buttonLoading}
          mainContainerStyle={{marginTop: 20}}
          onPress={() => {
            handleUpdateProfile();
          }}
          title="UPDATE"
        />
      </ScrollView>
    </AppContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 6,
  },
  uploadCertificateButtonContainer: {
    backgroundColor: AppColors.primary,
    width: 120,
    height: 30,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    borderRadius: 2,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    alignItems: 'center',
  },
});
