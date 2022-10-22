import { Button } from '@components';
import * as React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import GlobalStyles from '@theme/styles/global-style';
import Icons from 'react-native-vector-icons/Feather'
import NumericInput from './NumbericInput';



const OTPverify = ({navigation}) => {
   const [seconds, setSeconds] = useState(60);
  const[inputting, setInputting] = useState(1);
  const [codes, setCodes] = React.useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });
  const setCode = ( value: string) => {
    setCodes(prev => ({...prev, [inputting]: value}));
    if(inputting < 4)
    {
      setInputting(inputting + 1)
    }
  };

  const handleDelete = () =>{
    setCodes(prev => ({...prev,[inputting]: ''}))
    if(inputting > 1)
    {
      setInputting(inputting - 1)
    }
  }

React.useEffect( () => {
  const countdown = setInterval(() => {
      setSeconds(prev => prev - 1)
      if(seconds === 0)
      {
        clearInterval(countdown);
        setSeconds(60)
      }
    } , 1000);
    return () => clearInterval(countdown)
  },[seconds])

  return (
    <SafeAreaView style={styles.container}>
      <View>
       <View style={styles.countDownContainer}>
          <Text style={[
            styles.countDown,
            GlobalStyles.textCenter]}>
            {seconds == 60 ? "01:00" :
            seconds < 10 ? '00:0'+seconds
            :'00:'+ seconds}</Text>
          <Text style={styles.text}>Type the verification code</Text>
          <Text style={styles.text}>we've sent you</Text>
       </View>
        <View style={styles.inputGroup}>
          <NumericInput
            inputting={inputting === 1}
            filled = {codes[1] !== ''}
            value={codes[1]}
            onPress={() => setInputting(1)}
          />
          <NumericInput
            value={codes[2]}
             inputting={inputting === 2}
            filled = {codes[2] !== ''}
            onPress={() => setInputting(2)}
          />
          <NumericInput
            value={codes[3]}
             inputting={inputting === 3}
            filled = {codes[3] !== ''}
            onPress={() => setInputting(3)}
          />
          <NumericInput
            value={codes[4]}
             inputting={inputting === 4}
            filled = {codes[4] !== ''}
            onPress={() => setInputting(4)}
          />
        </View>
    
      </View>
      
      <View style={[
        GlobalStyles.fullWidth,
        styles.numberPad
      ]}>

      <View style={[
        GlobalStyles.itemCenter,
        GlobalStyles.row,
        styles.line
      ]} >
        <Button  text='1' 
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}
        onPressIn={() => setCode('1')}
        />
        <Button  text='2'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton} 
        onPressIn={() => setCode('2')}/>
        <Button  text='3'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton} 
        onPressIn={() => setCode('3')}
        />
      </View>
      <View style={[
        GlobalStyles.itemCenter,
        GlobalStyles.row,
        styles.line
      ]}>
        <Button text='4'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}
        onPressIn={() => setCode('4')}
        />
        <Button text='5'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}
        onPressIn = {() => setCode('5')}
        />
        <Button text='6'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}
        onPressIn={() => setCode('6')} />
      </View>
      <View style={[
        GlobalStyles.itemCenter,
        GlobalStyles.row,
        styles.line
      ]}>
        <Button text='7'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}
        onPressIn = {() => setCode('7')} />
        <Button text='8'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}
        onPressIn={() => setCode('8')}/>
        <Button text='9'
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton} 
        onPressIn={() => setCode('9')}/>
      </View>
      <View style={[
        GlobalStyles.justifyCenter,
        GlobalStyles.row,
        styles.line
      ]}>
        <View style={ styles.numberButton}></View>
        <Button text='0' 
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}
        onPressIn={() => setCode('0')}
        />
        <Button 
        onPress={handleDelete}
        textStyle={styles.contentNumberButton} 
        style={styles.numberButton}>
          <Icons name='delete' size={30}/>
        </Button>
      </View>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('resetPassword')}>
        <Text style={styles.buttonContent}>Send again</Text>
      </Pressable>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems:'center',
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  },
  phoneNumber: {
    fontWeight: 'bold',
  },
  inputGroup: {
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 10,
  },
  button: {
    width: 370,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonContent: {
    color: '#e72e48',
    fontWeight: '500',
    fontSize: 20,
  },
  numberButton: {
    width: '33%',
    padding: 10,
    height: '100%',
    backgroundColor: 'transparent'
  },
  contentNumberButton:{
    fontSize: 27,
    color: 'black'
  },
  line:{
    height: '33%'
  },
  numberPad:{
    height: '40%',
  },
  countDown:{
    fontSize: 30,
    fontWeight: '700',
    color: 'black'
  },
  countDownContainer:{
    margin: 10,
    
  }
});

export default OTPverify;
