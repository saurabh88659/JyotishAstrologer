import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  ToastAndroid,
} from 'react-native';
import AppStatusBar from '../../libComponents/AppStatusBar';
import AppHeader from '../../libComponents/AppHeader';
import {AppColors, keyboardType, routes} from '../../utils/constants';
import AppText from '../../libComponents/AppText';
import AppTextInputBottomLine from '../../libComponents/AppTextInputBottomLine';
import AppContainer from '../../libComponents/AppContainer';
import AppPrimaryButton from '../../libComponents/AppPrimaryButton';
import {Text} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import AppIcon, {Icons} from '../../libComponents/AppIcon';
import useAuthApiServices from '../../base/customHooks/useAuthApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppDropDown from '../../libComponents/AppDropDown';

const CreateProfile = ({navigation, route}) => {
  const ScrollListRef = useRef();
  const {createProfile} = useAuthApiServices();
  const [buttonLoading, setButtonLoading] = useState(false);
  //personal details
  const [fullName, setFullName] = useState('');
  const [age, seAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [chargesPerMinute, setChargesPerMinute] = useState('');
  const [language, setLanguage] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [bio, setBio] = useState('');
  const [certificate, setCertificate] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  //qualificaion
  const [highest_qualification, setHighest_qualification] = useState('');
  const [degree_Diploma, setDegree_Diploma] = useState('');
  const [school_college_university, setSchool_college_university] =
    useState('');
  const [form_where_learn_astrologer, setForm_where_learn_astrologer] =
    useState('');

  //social media contects
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkdin, setLinkdin] = useState('');
  const [youtube_channel, setYoutube_channel] = useState('');
  const [website, setWebsite] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  // Validation error states
  const [fullNameError, setFullNameError] = useState('');
  const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');
  const [chargesPerMinuteError, setChargesPerMinuteError] = useState('');
  const [languageError, setLanguageError] = useState('');
  const [specializationError, setSpecializationError] = useState('');
  const [bioError, setBioError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [stateError, setStateError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [highestQualificationError, setHighestQualificationError] =
    useState('');

  const [degreeDiplomaError, setDegreeDiplomaError] = useState('');

  const [schoolCollegeUniversityError, setSchoolCollegeUniversityError] =
    useState('');
  const [formWhereLearnAstrologerError, setFormWhereLearnAstrologerError] =
    useState('');

  const validateForm = () => {
    const numberRegex = /^\d+$/;
    let isValid = true;
    if (!fullName.trim()) {
      setFullNameError('Full Name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!yearsOfExperience.trim()) {
      setYearsOfExperienceError('Years of experience is required');
      isValid = false;
    } else if (!numberRegex.test(yearsOfExperience.trim())) {
      setYearsOfExperienceError('Years of experience must be a number');
      isValid = false;
    } else {
      setYearsOfExperienceError('');
    }

    if (!age) {
      setAgeError('Age is required');
      isValid = false;
    } else if (!numberRegex.test(age.trim())) {
      setAgeError('Age must be a number');
      isValid = false;
    } else {
      setAgeError('');
    }

    if (!chargesPerMinute.trim()) {
      setChargesPerMinuteError('Charges per minute are required');
      isValid = false;
    } else if (!numberRegex.test(chargesPerMinute.trim())) {
      setChargesPerMinuteError('Charges per minute must be a number');
      isValid = false;
    } else {
      setChargesPerMinuteError('');
    }

    if (!language.trim()) {
      setLanguageError('Language is required');
      isValid = false;
    } else {
      setLanguageError('');
    }

    if (!specialization.trim()) {
      setSpecializationError('Specialization is required');
      isValid = false;
    } else {
      setSpecializationError('');
    }

    if (!bio.trim()) {
      setBioError('Bio is required');
      isValid = false;
    } else {
      setBioError('');
    }
    if (!gender.trim()) {
      setGenderError('Gender is required');
      isValid = false;
    } else {
      setGenderError('');
    }
    // if (!country.trim()) {
    //   setCountryError('Country is required');
    //   isValid = false;
    // } else {
    //   setCountryError('');
    // }

    // if (!state.trim()) {
    //   setStateError('State is required');
    //   isValid = false;
    // } else {
    //   setStateError('');
    // }

    // if (!address.trim()) {
    //   setAddressError('Address is required');
    //   isValid = false;
    // } else {
    //   setAddressError('');
    // }

    // if (!highest_qualification.trim()) {
    //   setHighestQualificationError('Highest qualification is required');
    //   isValid = false;
    // } else {
    //   setHighestQualificationError('');
    // }

    // if (!degree_Diploma.trim()) {
    //   setDegreeDiplomaError('Degree/Diploma is required');
    //   isValid = false;
    // } else {
    //   setDegreeDiplomaError('');
    // }

    // if (!school_college_university.trim()) {
    //   setSchoolCollegeUniversityError('College/School/University is required');
    //   isValid = false;
    // } else {
    //   setSchoolCollegeUniversityError('');
    // }

    // if (!form_where_learn_astrologer.trim()) {
    //   setFormWhereLearnAstrologerError('This field is required');
    //   isValid = false;
    // } else {
    //   setFormWhereLearnAstrologerError('');
    // }

    return isValid;
  };

  const uploadProfilePicture = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    })
      .then(image => {
        console.log('image===>', image);
        setProfilePic(image);
        setProfilePicUrl(image.path);
      })
      .catch(error => {
        console.log('Error selecting image: ', error);
      });
  };

  const uploadCertificate = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setCertificate(doc);
      console.log('doc---', doc[0].name);
    } catch (e) {
      console.log('user e', e);
    }
  };

  const HandleFormData = async () => {
    let formData = new FormData();
    formData.append('Name', fullName);
    formData.append('years_of_experience', yearsOfExperience);
    formData.append('charges_per_min', chargesPerMinute);
    formData.append('language', language);
    formData.append('specialization', specialization);
    formData.append('bio', bio);
    formData.append('certificate_of_astrology', certificate);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('address', address);
    {
      certificate &&
        formData.append('certificate_of_astrology', {
          uri: certificate[0]?.uri,
          type: certificate[0]?.type,
          name: certificate[0]?.name,
        });
    }
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
    formData.append('age', age);
    formData.append('gender', gender);
    return formData;
  };

  const updateData = async () => {
    if (validateForm()) {
      setButtonLoading(true);
      const formData = await HandleFormData();
      // console.log('form data---------', formData);
      const res = await createProfile(formData);
      console.log('res of updateData---------', JSON.stringify(res));
      console.log(res.success);
      if (res.success) {
        setButtonLoading(false);
        navigation.replace(routes.UnderReview_Screen);
      } else {
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
        setButtonLoading(false);
      }
    } else {
      if (ScrollListRef.current) {
        // ScrollListRef.current.scrollToEnd({animated: true});
        ScrollListRef.current.scrollTo({y: 0, animated: true});
      }
    }
  };

  const handleBack = () => {
    AsyncStorage.clear();
    navigation.replace(routes.login);
  };

  return (
    <AppContainer>
      <AppStatusBar />
      <AppHeader isIcon={false} isDrawer={false} screen={'Create Profile'} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        ref={ScrollListRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.screenContentContainer}>
          <AppText
            style={{fontWeight: 'bold', marginBottom: 5, fontSize: 30}}
            fontSize={20}>
            Create Profile
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

          <AppText
            style={{fontWeight: 'bold', fontWeight: 'bold', marginTop: 20}}
            fontSize={20}>
            personal Details
          </AppText>

          <AppTextInputBottomLine
            labelText="Full Name"
            placeholder="Enter your Full Name"
            value={fullName}
            onChangeText={setFullName}
            s
            maxLength={25}
            validationError={fullNameError}
          />
          <AppTextInputBottomLine
            keyboardType={keyboardType.phonePad}
            maxLength={3}
            labelText="Age"
            placeholder="Enter your Age"
            value={age}
            onChangeText={seAge}
            validationError={ageError}
          />

          <AppDropDown
            height={80}
            data={[
              {gender: 'Male', value: 'male'},
              {gender: 'Female', value: 'female'},
            ]}
            labelField="gender"
            valueField="value"
            onChange={item => {
              setGender(item.value);
            }}
            value={gender}
            labelText="Gender"
            placeholder="---Select Gender---"
            validationError={genderError}
          />

          <AppTextInputBottomLine
            keyboardType={keyboardType.phonePad}
            maxLength={10}
            labelText="Years of experience"
            placeholder="Enter your Years of experience"
            value={yearsOfExperience}
            onChangeText={setYearsOfExperience}
            validationError={yearsOfExperienceError}
          />

          <AppTextInputBottomLine
            keyboardType={keyboardType.phonePad}
            maxLength={10}
            labelText="Charges per minute"
            placeholder="Enter Charges per minute"
            value={chargesPerMinute}
            onChangeText={setChargesPerMinute}
            validationError={chargesPerMinuteError}
          />

          <AppTextInputBottomLine
            maxLength={30}
            labelText="Language"
            placeholder="Enter your Language"
            value={language}
            onChangeText={setLanguage}
            validationError={languageError}
          />
          <AppTextInputBottomLine
            maxLength={50}
            labelText="Specialization"
            placeholder="Enter your Specialization"
            value={specialization}
            onChangeText={setSpecialization}
            validationError={specializationError}
          />
          <AppTextInputBottomLine
            maxLength={100}
            labelText="Bio"
            placeholder="Enter your bio"
            value={bio}
            onChangeText={setBio}
            validationError={bioError}
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

              {certificate && (
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
                    {certificate[0].name}
                  </AppText>
                </View>
              )}
            </View>
          </View>

          <AppTextInputBottomLine
            maxLength={30}
            labelText="Country"
            placeholder="Enter your Country"
            value={country}
            onChangeText={setCountry}
          />
          <AppTextInputBottomLine
            maxLength={30}
            labelText="State"
            placeholder="Enter your State"
            value={state}
            onChangeText={setState}
          />
          <AppTextInputBottomLine
            maxLength={150}
            labelText="Address"
            placeholder="Enter your Address"
            value={address}
            onChangeText={setAddress}
          />

          <AppText
            style={{fontWeight: 'bold', marginTop: 20, marginBottom: 20}}
            fontSize={20}>
            Qualification
          </AppText>

          <AppDropDown
            height={80}
            data={[
              {label: 'High School', value: 'high_school'},
              {
                label: 'Senior Secondary School',
                value: 'senior_secondary_school',
              },
              {label: 'Undergraduate', value: 'undergraduate'},
              {label: 'Postgraduate', value: 'postgraduate'},
              {label: 'Doctorate', value: 'doctorate'},
            ]}
            labelField="label"
            valueField="value"
            onChange={item => {
              setHighest_qualification(item.value);
            }}
            value={highest_qualification}
            labelText="Select your Highest qualification"
            placeholder="---Select your Highest qualification---"
            // validationError={qualificationError}
          />

          {/* <AppTextInputBottomLine
            maxLength={50}
            value={highest_qualification}
            onChangeText={setHighest_qualification}
            labelText="select your Highest qualification"
            placeholder={'select your Highest qualification'}
          /> */}

          <AppTextInputBottomLine
            maxLength={50}
            value={degree_Diploma}
            onChangeText={setDegree_Diploma}
            labelText="Degree/Diploma"
            placeholder={'Enter your Degree/Diploma'}
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

          <AppText
            style={{fontWeight: 'bold', fontWeight: 'bold', marginTop: 20}}
            fontSize={20}>
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
          mainContainerStyle={{marginTop: 10}}
          onPress={() => {
            updateData();
          }}
          title="SUBMIT"
        />
        <AppPrimaryButton
          height={50}
          mainContainerStyle={{marginTop: 20}}
          onPress={handleBack}
          title="BACK"
        />
      </ScrollView>
    </AppContainer>
  );
};

export default CreateProfile;

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
  screenContentContainer: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.dark_gray,
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 10,
  },
  scrollViewStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 20,
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
