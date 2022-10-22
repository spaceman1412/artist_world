import {Text, TouchableOpacity, StyleSheet } from 'react-native'

interface NumbericInputProps  {
    value: string,
    inputting: boolean,
    filled: boolean,
    onPress: () => void
}

const NumericInput = ({value, inputting, filled, onPress}: NumbericInputProps) => {
  
    let style = []
    let textStyle = []
    if(inputting)
    {
      style.push(styles.input,{borderColor: '#e06c75'});
      textStyle.push(styles.textInput, {color: '#f6b3bc'});
    }
    else if(filled)
    {
      style.push(styles.input, styles.filled)
      textStyle.push(styles.textInput,{color: 'white'})
    }
    else
    {
      style.push(styles.input)
      textStyle.push(styles.textInput)
    }
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={style}
      > 
      <Text style={textStyle}>{value === '' ? 0 : value}</Text>
        </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    textInput:{
        fontSize: 40,
        fontWeight: '700',
        color: '#e8e6e9'
      },
      filled:{
        backgroundColor: '#e83f56',
        borderColor: '#e06c75'
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
    alignItems: 'center'
  },
    })

export default NumericInput;