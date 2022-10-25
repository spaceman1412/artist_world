import { color } from '@theme';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

interface NumbericInputProps {
  value: string;
  inputting: boolean;
  filled: boolean;
  onPress: () => void;
}

const NumericInput = ({
  value,
  inputting,
  filled,
  onPress,
}: NumbericInputProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={
        inputting
          ? [styles.input, {borderColor: '#e06c75'}]
          : filled
          ? [styles.input, styles.filled]
          : styles.input
      }>
      <Text
        style={
          inputting
            ? [styles.textInput, {color: '#f6b3bc'}]
            : filled
            ? [styles.textInput, {color: 'white'}]
            : styles.textInput
        }>
        {value === '' ? 0 : value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 40,
    fontWeight: '700',
    color: '#e8e6e9',
  },
  filled: {
    backgroundColor: '#e83f56',
    borderColor: '#e06c75',
  },
  input: {
    height: 80,
    width: 80,
    fontSize: 30,
    margin: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: '#e8e5ea',
    backgroundColor: 'white',
    borderRadius: 17,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default NumericInput;
