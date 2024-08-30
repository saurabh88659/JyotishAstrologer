import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppContainer from '../../libComponents/AppContainer';
import AppHeader from '../../libComponents/AppHeader';
import {Image} from 'react-native-animatable';

const ViewImageScreen = ({navigation, route}) => {
  const image = route.params.data;

  return (
    <AppContainer>
      <AppHeader screen={'Back'} isDrawer={false} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <Image
          resizeMode="contain"
          source={{uri: image}}
          style={{height: '100%', width: '100%'}}
        />
      </View>
    </AppContainer>
  );
};

export default ViewImageScreen;

const styles = StyleSheet.create({});
