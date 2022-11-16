import {color} from '@theme';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

interface NumbericInputProps {
  value: string;
  inputting: boolean;
  filled: boolean;
  onPress: () => void;
}

const NumericInput = (props: NumbericInputProps) => {
  const {value, inputting, filled, onPress} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={
        inputting
          ? [styles.input, {borderColor: color.primary}]
          : filled
          ? [styles.input, styles.filled]
          : styles.input
      }>
      <Text
        style={
          inputting
            ? [styles.textInput, {color: color.primary}]
            : filled
            ? [styles.textInput, {color: color.text, opacity: 1}]
            : styles.textInput
        }>
        {value === '' ? 0 : value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 32,
    fontWeight: '700',
    color: color.outLine,
    opacity: 0.4,
  },
  filled: {
    backgroundColor: color.primary,
    borderColor: color.primary,
  },
  input: {
    height: 58,
    width: 58,
    margin: 3,
    borderWidth: 1,
    borderColor: color.outLine,
    backgroundColor: color.transparent,
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NumericInput;
