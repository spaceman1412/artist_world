import * as React from 'react';
import { 
  StyleSheet,
  View, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import { SwiperImageProps } from './swiper-image.props';
import { OnboardingItem } from './onboardItem/onboardItem';
import { color } from '@theme';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export function SwiperImage (props: SwiperImageProps) {
  const{images} = props
  const [imgActive, setImgActive] = React.useState(0);
  const onSlide = (nativeEvent ) =>{
    if(nativeEvent){
      const slide = Math.ceil(nativeEvent.contentOffset.y /nativeEvent.layoutMeasurement.height)
      if(slide !== imgActive)
      {
        setImgActive(slide)
      }
    }
  }
   
    return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onSlide(nativeEvent)}
          pagingEnabled
          style={styles.wrap}>
          {
            images.map((item,index) => 
            <OnboardingItem 
            key={index} 
            image={item.image}
            name={item.name}
            age={item.age}/>
            )
          }
        </ScrollView>
        <View style={styles.wrapDot}>
              {
                images.map((e,index) => 
                <View key={index} style={imgActive === index ? styles.dotActive : styles.dot}></View>)
              }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  wrap:{
    width: WIDTH,
    height: HEIGHT,
  },
  wrapDot:{
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
    top : '30%',
    backgroundColor: color.palette.GrayWithOpacity(0.6),
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    height: 180,
    alignItems : 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    overflow: 'hidden',
  },
  dot:{
    width: 10,
    height: 10,
    backgroundColor: color.palette.lightGrey,
    borderRadius: 50,
    margin: 8,
  },
  dotActive:{
    width: 10,
    height: 10,
    backgroundColor: color.palette.white,
    borderRadius: 50,
    margin: 8,
  }
})
