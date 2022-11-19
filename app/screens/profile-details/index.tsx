import {Button, UploadImage} from '@components';
import {CommonType} from '@utils/types';
import * as React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Calendar from 'assets/images/calendar.svg';
import DateTimePicker from '@components/date-time-picker/date-time-picker';
import {color} from '@theme';
import GlobalStyles from '@theme/styles/global-style';
import SizedBox from '@components/sized-box';

interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  headerButton: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    fontWeight: '700',
    lineHeight: 24,
    fontSize: 16,
  },
  headerButtonContent: {
    color: color.primary,
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 51,
    color: color.storybookTextColor,
    alignSelf: 'flex-start',
  },
  buttonConfirmStyle: {
    width: 295,
    height: 56,
    backgroundColor: color.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthdayButton: {
    backgroundColor: color.palette.wispPink,
    width: 295,
    height: 58,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 13,
  },
  textButtonBirthday: {
    color: color.primary,
    marginHorizontal: 20,
    opacity: 1,
    fontWeight: '700',
  },
  inputContainer: {
    height: 60,
    marginVertical: 10,
  },
  inputWrapper: {
    width: 295,
    height: 58,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: color.palette.mischka,
    color: color.storybookTextColor,
    marginTop: -8,
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 12,
    color: color.palette.GrayWithOpacity(0.3),
    backgroundColor: color.palette.white,
    zIndex: 2,
    width: 68,
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    color: color.storybookTextColor,
    marginHorizontal: 20,
    fontSize: 14,
  },
  mainContainer: {},
});
export const ProfileDetails: CommonType.AppScreenProps<
  'profileDetails',
  Props
> = ({navigation}) => {
  const [datetimePicker, setDateTimePicker] = React.useState(false);
  const [birthDay, setBirthday] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.whiteBackground}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonContent}>Skip</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile details</Text>
        <SizedBox height={20} />
        <View style={GlobalStyles.itemCenter}>
          <UploadImage />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={firstName}
              onChangeText={text => setFirstName(text)}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last name</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              value={lastName}
              onChangeText={text => setLastName(text)}
              style={styles.input}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.birthdayButton}
          onPress={() => setDateTimePicker(true)}>
          <Calendar />
          <Text style={styles.textButtonBirthday}>Choose birthday date</Text>
        </TouchableOpacity>
        <SizedBox height={20} />
        <Button text={'Confirm'} style={styles.buttonConfirmStyle} />
        <DateTimePicker
          date={birthDay}
          setDate={setBirthday}
          visible={datetimePicker}
          animationType={'slide'}
          onCloseModal={() => setDateTimePicker(false)}
        />
      </View>
    </SafeAreaView>
  );
};
