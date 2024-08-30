import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from './AppText';
import {AppColors} from '../utils/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const AppDatePicker = ({
  label = 'Date',
  onDateChange,
  value,
  validationError,
}) => {
  const [date] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  //   useEffect(() => {
  //     onDateChange(value);
  //   }, [value]);

  const handleDateChange = selectedDate => {
    setShowDatePicker(false);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const formattedTime = moment(selectedDate).format('HH:mm:ss');
    onDateChange(formattedDate, formattedTime);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <TouchableOpacity activeOpacity={1} onPress={showDatePickerHandler}>
        <TextInput
          value={value}
          editable={false}
          placeholder="Select Date and Time"
          placeholderTextColor={AppColors.dark_gray}
          style={styles.input}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DatePicker
          is24hourSource={true}
          modal
          open={showDatePicker}
          date={date}
          onConfirm={handleDateChange}
          onCancel={() => setShowDatePicker(false)}
        />
        //    <DateTimePicker
        //      value={date}
        //      mode="datetime"
        //      display="spinner"
        //      onChange={handleDateChange}
        //      // onCancel={dismissDatePicker}
        //    />
      )}
      {validationError && (
        <Text style={{color: AppColors.red, fontSize: 14}}>
          {validationError}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: AppColors.black,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.primary,
  },
});

export default AppDatePicker;
