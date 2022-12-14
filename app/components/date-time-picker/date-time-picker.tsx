import {color} from '@theme';
import * as React from 'react';
import {Modal, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {DateTimePickerProps} from './date-time-picker.props';
import {Calendar} from 'react-native-calendars';

const DateTimePicker = (props: DateTimePickerProps) => {
  const [date, setDate] = React.useState('2001-1-1');
  const {onBackPress, onSave, visible, ...rest} = props;

  return (
    <Modal animationType="slide" visible={visible} transparent {...rest}>
      <TouchableOpacity style={styles.overplayed} onPress={onBackPress}>
      </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.text}>Birthday</Text>
          <Calendar
            onLayout={e => e.preventDefault}
            initialDate={date}
            theme={{
              monthTextColor: color.palette.primary,
              selectedDayBackgroundColor: color.palette.primary,
            }}
            date={date}
            onDayPress={value => {
              setDate(value.dateString);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSave && onSave(date)}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overplayed: {
    flex: 1,
    backgroundColor: color.palette.blackWithOpacity(0.3),
    // justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    height: 514,
    backgroundColor: color.palette.white,
    padding: 40,
    borderRadius: 25,
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    color: color.storybookTextColor,
    fontSize: 14,
    fontWeight: '400',
  },
  button: {
    width: 295,
    height: 56,
    borderRadius: 15,
    backgroundColor: color.palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: color.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
export default DateTimePicker;
