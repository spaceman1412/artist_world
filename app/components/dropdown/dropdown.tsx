import { images } from '@assets/images';
import * as React from 'react';
import { 
    TouchableOpacity, 
    Modal, 
    StyleSheet, 
    View,
    Image,
    TextInput} from 'react-native';
import { DropDownProps } from './dropdown.props';
import { DropdownItem } from './dropdownItem/dropdownItem';

const DropDown = (props:DropDownProps) =>{
    const { 
    data,
    value,
    onSelect,
     } = props
    const [modal,setModal]= React.useState(false)
    const [dropdownTop, setDropownTop] = React.useState()
    const DropdownButton = React.useRef(null);
     const openDropdown = () => {
            DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropownTop(py + h);
        console.log('dropdown top >',dropdownTop)
  });
  setModal(true);
};

    return(
        <View style={styles.container}>
            <View style={styles.textBox}>
                <TextInput style={styles.inputBox} />
                <TouchableOpacity  
                onPress={openDropdown}
                ref={DropdownButton}>
                    <Image source={images.nextArrow} style={{width: 10, height: 10}}/>
                </TouchableOpacity>
            </View>
        <Modal 
        visible={modal}
        transparent
        animationType='none'
        >
            
                <View  style={[styles.dropdown, { top: dropdownTop }]}>
                {
                    data.map((item) =>
                    <DropdownItem item={item} key={item.id} onPress={onSelect}/>)
                }
                </View>
            
        </Modal>
</View>
    )
}

const styles = StyleSheet.create({
dropdown: {
    position: 'absolute',
    backgroundColor: 'blue',
    width: 300,
    shadowColor: 'blue',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  mainBox:{
    backgroundColor: 'red',
    width: 300,
    height: 200,

  },
  container:{
    width: 300,
  },
  textBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 255,
    justifyContent: 'space-between',
    alignItems: 'center',


  },
inputBox:{
    width: '90%',
    backgroundColor: 'red'
  }
})

export default DropDown;