import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/constants';
import {CTAContext} from '../cta/context/CTAContext';
import GiftsContainer from '../screens/Profiles/AstrologerProfile/Gifts';

const SideOptions = () => {
  const {showModal, hideModal} = useContext(CTAContext);
  const navigation = useNavigation();
  const options = [
    {
      id: 1,
      name: 'send-gifts',
      icon: 'gift',
      action: () =>
        showModal(
          <GiftsContainer
            astrologer={571}
            user={444}
            cancel
            onCancel={hideModal}
          />,
          false,
        ),
    },
    {
      id: 2,
      name: 'direct-message',
      icon: 'send',
      action: () => console.log('DM'),
    },
    {
      id: 3,
      name: 'call',
      icon: 'phone',
      action: () => console.log('CALL'),
    },
    {
      id: 4,
      name: 'timer',
      icon: 'hourglass',
      action: () => console.log('HOURGLASS'),
    },
  ];

  const handlePress = () => {
    action();
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.button}
          onPress={handlePress(option.action)}>
          <Icon name={option.icon} size={28} color="white" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.grayShade,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SideOptions;
