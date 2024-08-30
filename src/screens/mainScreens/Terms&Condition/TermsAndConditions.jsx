import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import AppContainer from '../../../libComponents/AppContainer';
import AppHeader from '../../../libComponents/AppHeader';
import {AppColors} from '../../../utils/constants';

const TermsAndConditions = () => {
  return (
    <AppContainer>
      <AppHeader isDrawer={false} screen={'Terms & Conditions'} />
      <ScrollView contentContainerStyle={styles.ScrollView}>
        <View style={styles.section}>
          <Text style={styles.subheading}>UPDATION</Text>
          <Text style={styles.text}>
            Jyotiish App reserves the right to update, amend, or modify these
            Terms of Usage periodically. Users are responsible for checking
            these terms regularly to ensure compliance.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>USER CONSENT</Text>
          <Text style={styles.text}>
            By accessing and using the Jyotiish App, you express unconditional
            consent to its Terms of Usage. If you do not agree, please refrain
            from clicking the “I AGREE” button. Please carefully read these
            terms before using the app. Your continued use of the app implies
            acceptance of these terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>GENERAL DESCRIPTION</Text>
          <Text style={styles.text}>
            Jyotiish App is an internet-based platform available on various
            electronic mediums, offering astrological content, reports, data,
            and consultations. It provides both Free Services and Paid Services.
            Free Services are accessible without membership, while personalized
            astrological services and additional content require membership. By
            registering for Paid Services, users agree to:
          </Text>
          <Text style={styles.listItem}>
            - Provide accurate and complete information upon registration.
          </Text>
          <Text style={styles.listItem}>
            - Maintain and update their information to ensure its accuracy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>REGISTRATION AND ELIGIBILITY</Text>
          <Text style={styles.text}>
            The User of the Website must be a person who can form legally
            binding contracts under the Indian Contract Act, 1872. Minors under
            the age of eighteen (18) in most jurisdictions are not permitted to
            avail themselves of the services provided on the Website without a
            legal guardian in accordance with applicable laws. The Website would
            not be held responsible for any misuse that may occur by virtue of
            any person, including a minor, using the services provided through
            the Website.
          </Text>
          <Text style={styles.text}>
            To avail the services, the User will be directed to Register as a
            Member on the Website, agreeing to provide updated, current, and
            accurate information while filling out the sign-in form. All
            information provided to the Website and all updates thereto are
            referred to in these Terms of Usage as "Registration Data."
          </Text>
          <Text style={styles.text}>
            An account could be created by the User through the Website ID (Your
            Phone Number) and password (OTP), or other login ID and password,
            which can include a Facebook, Gmail, or any other valid email ID.
            The User, while creating an account, hereby represents and warrants
            that all information provided is current, accurate, and complete,
            and that the User will maintain accuracy and update the information
            from time to time. Use of another User’s account information for
            availing services is expressly prohibited. If inaccurate,
            incomplete, untrue, or outdated information is found on the Website,
            the Website has the right to suspend or terminate the User’s account
            and restrict/refuse the User's future use of the Website.
          </Text>
          <Text style={styles.text}>
            The right to use this Website is personal to the User and is not
            transferable to any other person or entity. The User is responsible
            for protecting the confidentiality of User’s passwords and other
            information required for registration. The User is fully responsible
            for all activities occurring under the User’s account with the
            Website. The Website cannot and will not be liable for any loss or
            damage arising from the User’s failure to maintain secrecy and
            confidentiality. The User shall notify the Website immediately of
            any unauthorized use of their Account(s) or breach of security. The
            User must log out from their account at the end of the session.
          </Text>
          <Text style={styles.text}>
            While availing any service, the User shall be informed whether the
            service rendered is personal to the Website or is available from a
            Third party. The Website shall have no control or monitoring over
            information disseminated to any third party via the Website.
          </Text>
          <Text style={styles.text}>
            The User agrees, understands, and confirms that their personal data,
            including details relating to debit card/credit card transmitted
            over the Internet, may be susceptible to misuse, hacking, theft,
            and/or fraud, and that the Website or the Payment Service
            Provider(s) have no control over such matters.
          </Text>
          <Text style={styles.text}>
            The Website does not permit the use of the Services by any User
            under the following conditions:
          </Text>
          <Text style={styles.listItem}>
            - If the User is a resident of any jurisdiction that may prohibit
            the use of the Services rendered by the Website.
          </Text>
          <Text style={styles.listItem}>
            - If the User is a resident of any State/Country that prohibits, by
            way of law, regulation, treaty, or administrative act, entering into
            trade relations or/and due to any religious practices.
          </Text>
          <Text style={styles.listItem}>
            - If the User has created multiple accounts using various mobile
            numbers. The User may not have more than one active account with the
            Website.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>FEATURE : CALL WITH ASTROLOGER</Text>
          <Text style={styles.text}>
            The Website is offering a specific service accessible via
            telecommunication with the Astrologers listed and enrolled with the
            Website. By accepting these Terms of Usage, you are granting
            unconditional consent to the Website to arrange a call with you on
            your mobile number, even if your number is registered on the DND (Do
            Not Disturb) service provided by your mobile service provider.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>WEBSITE CONTENT</Text>
          <Text style={styles.text}>
            The Website and any associated Websites accessible via external
            hyperlinks are private property. All interactions on this Website,
            including guidance and advice received directly from the Licensed
            Providers, must adhere to these Terms of Usage.
          </Text>
          <Text style={styles.text}>
            The User agrees not to post or transmit through this Website any
            material that violates or infringes upon the rights of others, or
            any material that is unlawful, abusive, defamatory, invasive of
            privacy, vulgar, obscene, profane, or otherwise objectionable. Such
            actions may lead to suspension or termination of access by the User,
            or termination of the User’s registration.
          </Text>
          <Text style={styles.text}>
            The Website reserves the right to terminate access or
            change/discontinue any aspect or feature of the Website, including
            content, graphics, deals, offers, and settings. Information on the
            Website, aside from guidance and advice received directly from
            Third-Party Service Providers, should not be considered medical
            advice.
          </Text>
          <Text style={styles.text}>
            The Website does not guarantee the medical advice provided by
            third-party service providers, including registered astrologers.
            Users should consult appropriately qualified healthcare
            professionals for diagnosis and treatment. The Website does not
            endorse any specific tests, medications, products, or procedures.
          </Text>
          <Text style={styles.text}>
            The Website does not guarantee any specific outcomes or results from
            the services provided. Users access the Website at their own risk,
            and the Website or the Service Providers are not liable for any
            untoward incidents that may occur.
          </Text>
          <Text style={styles.text}>
            By using the Site, Application, or Services, the User agrees that
            any legal remedy or liability sought for actions or omissions of
            other Members, including service providers registered with the
            Website or other third parties linked with the Website, shall be
            limited to claims against the particular party responsible.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>USER ACCOUNT ACCESS</Text>
          <Text style={styles.text}>
            The Website shall have access to the account and information created
            by the User to ensure and maintain high-quality services and address
            customer needs effectively. Users hereby consent to unconditional
            access of the account by the Website, its employees, agents, and
            other appointed personnel. The Website may investigate complaints
            and suspected abuse reported on a case-by-case basis using available
            records. Users are directed to read the terms provided in the
            Privacy Policy regarding such records.
          </Text>
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: AppColors.black,
    alignSelf: 'center',
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
  },
});

export default TermsAndConditions;
