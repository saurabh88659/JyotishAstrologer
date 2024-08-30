import {
     View,
     Text,
     Modal,
     StyleSheet,
     TouchableOpacity,
     Linking,
     ActivityIndicator,
   } from 'react-native';
   import React from 'react';
   import {AppColors} from '../utils/constants';
   import AppStatusBar from './AppStatusBar';
   import AppIcon, {Icons} from './AppIcon';
   
   const AppLoaderModal = ({
     isModalVisible = false,
     onRequestClose,
   }) => {
     return (
       <Modal
         visible={isModalVisible}
         animationType="fade"
         transparent={true}
         onRequestClose={onRequestClose}>
         <AppStatusBar  backgroundColor={'rgba(0, 0, 0, 0.8)'} />
         <View style={styles.mainContainer}>
<ActivityIndicator size={40} color={AppColors.white}/>
         </View>
       </Modal>
     );
   };
   export default AppLoaderModal;
   
   const styles = StyleSheet.create({
     mainContainer: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0.8)',
       paddingHorizontal: 50,
     },
     buttonContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       marginBottom: 20,
       paddingHorizontal: 15,
       width: '100%',
     },
     heading: {
       backgroundColor: AppColors.white,
       width: '100%',
       borderRadius: 5,
       //     alignItems: 'center',
       alignSelf: 'center',
       paddingHorizontal: 10,
       paddingVertical: 15,
       paddingBottom: 25,
     },
   });
   