import { CommonType } from '@utils/types';
import * as React from 'react';
import { Card } from './card/card';
import { 
  Animated, 
  PanResponder, 
  View, 
  SafeAreaView, 
  StyleSheet,
  Text,
} from 'react-native';
import { Dimensions } from 'react-native';
import { color } from '@theme';
import {listPeople} from './data';
import { Button } from '@components';
import Stroke from '@assets/images/stroke.svg';
import Heart from '@assets/images/heart.svg';
import Star from '@assets/images/star.svg';
import BackIcon from '@assets/images/back-arrow.svg';
import FilterIcon from '@assets/images/filter.svg';
import FilterSearch from '@components/filterSearch/filterSearch';

interface Props{}

export const Discover : CommonType.AppScreenProps<'discover', Props> = ({
    navigation,
    
}) => {  
  const [people, setPeople] = React.useState(listPeople)
  React.useEffect(() =>{
    if(people.length === 0)
    {
      setPeople(listPeople)
    }
  },[people])
  const swipe = React.useRef(new Animated.ValueXY()).current;
  const tiltSign = React.useRef(new Animated.Value(1)).current;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [age, setAge]= React.useState([15,28])
  const [gender,setGender] = React.useState('')
  const [location,setLocation]= React.useState('')
  const [distance,setDistance] = React.useState([0])
  const locations = [
    {id: '1', label : 'Hanoi'},
    {id: '2', label: 'SaiGon'},
    {id: '3', label: 'Da Lat'},
    {id: '4', label: 'Da Nang'},
    {id: '5', label : 'Ca Mau'}]
  const { width, height } = Dimensions.get('screen');
  const panResponder = React.useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          // allow to move free
          // onPanResponderMove: (e, { dx, dy, y0 }) => {
          //   tiltSign.setValue(y0 > height / 2 ? 1 : -1);
          //   swipe.setValue({ x: dx, y: dy });
          // },
          //
          onPanResponderRelease: (e, { dx, dy }) => {
            const direction = Math.sign(dx);
            const userAction = Math.abs(dx) > 100;
    
            if (userAction) {
              // action code here ( call API)
              if(direction === 1)
              {
                console.log('match')
              }
              else{
                console.log('unmatch')
              }
              Animated.timing(swipe, {
                duration: 200,
                toValue: {
                  x: direction * (width + width * 0.9),
                  y: dy,
                },
                useNativeDriver: true,
              }).start(transitionNext);
            } else {
              Animated.spring(swipe, {
                friction: 5,
                toValue: {
                  x: 0,
                  y: 0,
                },
                useNativeDriver: true,
              }).start();
            }
          },
        })
      ).current;

    const transitionNext = React.useCallback(() => {
        setPeople((prevState) => prevState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
      }, [swipe]);
    
      const handleChoise = React.useCallback(
        (sign) => {
          if(sign === 1)
          {
            //callAPI here
            console.log('match')
          }
          else 
          {
            // call API here
            console.log('unmatch')
          }
          Animated.timing(swipe.x, {
            duration: 500,
            toValue: sign * (width + width * 0.9),
            useNativeDriver: true,
          }).start(transitionNext);
        },
        [swipe.x, transitionNext]
      );

    return(

        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Button
            style={styles.buttonHeader}
            >
              <BackIcon/>
            </Button>
            <Text style={styles.title}>Discover</Text>
            <Button 
            onPress={() => setModalVisible(true)}
            style={styles.buttonHeader}>
              <FilterIcon/>
            </Button>
          </View>
            <View style={styles.carouselContainer}>
            {
              people.map((vale, index) =>
                {
                  const isFirst = index === 0;
                  const panHandlers = isFirst ? panResponder.panHandlers : {};
                    return(
                    <Card 
                    isFirst = {isFirst}
                    swipe={swipe}
                    tiltSign={tiltSign}
                    data={vale}
                    {...panHandlers}
                    key={index}
                    />
                    )
                }
                    ).reverse()
                }
                </View>

                <View style={styles.footer}>
                  <Button
                  onPress={() => handleChoise(-1)}
                  style={[styles.circleButton, styles.passButton]}>
                    <Stroke/>
                  </Button>
                  <Button
                  style={[styles.circleButton, styles.heartButton]}>
                    <Heart/>
                  </Button>
                  <Button
                  onPress={() => handleChoise(1)}
                  style={[styles.circleButton, styles.starButton]}>
                    <Star/>
                  </Button>
                </View>
                <FilterSearch
                  visible={modalVisible}
                  onCloseModal={setModalVisible}
                  genderValue = {gender}
                  setGender={setGender}
                  locationValue = {location}
                  setLocation = {setLocation}
                  LocationData = {locations}
                  distance = {distance}
                  setDistance={setDistance}
                  age = {age}
                  setAge={setAge}
                  animationType={'slide'}
                  onRequestClose={() => setModalVisible(false)}
      />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.whiteBackground,
        justifyContent: 'space-around',
        paddingHorizontal: 40,
    },
    header:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    buttonHeader:{
      width: 52,
      height: 52,
      borderColor: color.palette.mischka,
      backgroundColor: color.transparent,
      borderWidth: 1,
      borderRadius: 15,
    },
    footer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',

    },
    circleButton:{
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    passButton:{
      width: 78,
      height: 78,
      backgroundColor: color.palette.outOfGreyWithOpacity(0.07),
      borderWidth: 0.1,
      borderColor: color.palette.blackWithOpacity(0.3)
    },
    carouselContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 500,
    },
    heartButton:{
      width: 99,
      height: 99,
      backgroundColor: color.primary,
    },
    starButton:{
      width: 78,
      height: 78,
      backgroundColor: color.palette.outOfGreyWithOpacity(0.07),
      borderWidth: 0.1,
      borderColor: color.palette.blackWithOpacity(0.3)
    },
    title:{
      color: color.storybookTextColor,
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 28.5,
    }
})