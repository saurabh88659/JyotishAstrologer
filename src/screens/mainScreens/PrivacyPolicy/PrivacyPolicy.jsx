import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import {AppColors} from '../../../utils/constants';

const PrivacyPolicy = () => {
  return (
    <AppContainer>
      <AppHeader isDrawer={false} screen={'Privacy Policy'} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.subheading}>USER CONSENT</Text>
          <Text style={styles.text}>
            The User hereby consents, expresses, and agrees that they have read
            and fully understand the Privacy Policy of the Website. Users
            further consent that the terms and contents of such Privacy Policy,
            including any updates/alterations/changes made and duly displayed on
            the Website, are acceptable.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>BREACH AND TERMINATION</Text>
          <Text style={styles.text}>
            The Jyotiish App may, in whole or in part, without informing the
            User, modify, discontinue, change or alter the services ordered or
            the Account of the User registered with the Jyotiish App. The
            Jyotiish App may or may not issue notice or provide any reason for
            such action taken by the Jyotiish App. Violation of any conditions
            mentioned in this Terms of Usage shall lead to immediate
            cancellation of the Registration of the User, if registered with the
            Jyotiish App. The Jyotiish App reserves the right to terminate and
            initiate action immediately, if:
          </Text>
          <Text style={styles.listItem}>
            - The Jyotiish App is not able to verify and authenticate the
            Registration data or any other relevant information provided by the
            User.
          </Text>
          <Text style={styles.listItem}>
            - The Jyotiish App believes that the actions of the User may cause
            legal liability for the Jyotiish App, other Users or any service
            provider linked with the Jyotiish App.
          </Text>
          <Text style={styles.listItem}>
            - The Jyotiish App believes that the User has provided the Jyotiish
            App with false and misleading Registration Data or there is
            interference with the other Users or the administration of the
            services, or have violated the privacy policy as listed by the
            Jyotiish App.
          </Text>
          <Text style={styles.text}>
            For the Service Provider inclusive of the Astrologer, you understand
            and agree that your relationship with the Jyotiish App is limited to
            being a member and you act exclusively on your own behalf and for
            your own benefit. The Jyotiish App may terminate and de-activate the
            Profile of such service provider for any violation of the present
            terms of usage and the Service Terms and Conditions agreed upon
            between the parties while registration of the data by such Service
            Provider.
          </Text>
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  section: {
    marginBottom: 10,
    color: AppColors.black,
  },
  subheading: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
    color: AppColors.black,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: AppColors.black,
    textAlign: 'justify',
  },
  listItem: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 4,
    color: AppColors.black,
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
