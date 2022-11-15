import { images } from '@assets/images';
import { color } from '@theme';
import * as React from 'react';
import { 
    TouchableOpacity, 
    Modal, 
    StyleSheet, 
    View,
    Image,
    TextInput,
    ScrollView,
    Animated
  } from 'react-native';
import { BASE_DROPDOWN_ITEM, TEXTBOX_STYLES, TEXTINPUT_STYLES } from './dropdown.preset';
import { DropDownProps } from './dropdown.props';
import { DropdownItem } from './dropdownItem/dropdownItem';

export const DropDown = (props:DropDownProps) =>{
    const { 
    preset = 'primary',
    data,
    value,
    textStyles: textStylesOverride,
    containerStyles: viewStylesOverride,
    itemStyles: itemStylesOverride,
    onSelect,
    dropDownWidth = 295,
    maxDropdownHeight = 100,
    placeHolder,
    } = props
    const [modal,setModal]= React.useState(false)
    const [dropdownPosition, setDropdownPosition] = React.useState([0,0])
    const DropdownButton = React.useRef(null);
    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
        setDropdownPosition([py + h + 5, _px]);
  });
  setModal(true);
};
  const toggle = (value) =>{
    setModal(false);
    onSelect(value);
  }
  const viewStyle = TEXTBOX_STYLES[preset] || TEXTBOX_STYLES.primary;
  const viewStyles = [viewStyle, viewStylesOverride];
  const textStyle = TEXTINPUT_STYLES[preset] || TEXTINPUT_STYLES.primary;
  const textStyles = [textStyle, textStylesOverride];
  const itemStyles = [BASE_DROPDOWN_ITEM, itemStylesOverride];
  const dropdownStyles = [styles.dropdown, {width: dropDownWidth, maxHeight: maxDropdownHeight}]
  return(
        <View 
          ref={DropdownButton}
          style={viewStyles}
          onLayout={e => {
            e.preventDefault()
          }}>
            <View
                style={styles.textBox}>
                <TextInput
                placeholder={placeHolder}
                style={textStyles} 
                value={value}
                editable={false} />
                  {
                    !modal ?  
                    <TouchableOpacity  
                    onPress={openDropdown}
                    >
                      <Image source={images.nextArrow} 
                      style={{width: 20, height: 20}}/>
                    </TouchableOpacity>
                    
                    :
                    <TouchableOpacity onPress={() => setModal(false)}>

                        <Animated.View style={{transform: [{rotate: '90deg'}] }}>
                        <Image source={images.nextArrow} 
                        style={{width: 20, height: 20}}/>
                        </Animated.View>
                        </TouchableOpacity>
                  }
            </View>
            {
              
              dropdownPosition[0] !== 0 ?
              <Modal 
              visible={modal}
              transparent
              animationType='none'
              onRequestClose={() => setModal(!modal)}
              >
                  <TouchableOpacity 
                  onPress={() => setModal(!modal)}
                  style={styles.dropdownContainer}>

                      <View  style={[dropdownStyles, { top: dropdownPosition[0], left: dropdownPosition[1]}]}>
                        <ScrollView>
                        {
                          data.map((item) =>
                          <DropdownItem 
                          item={item} 
                          key={item.id}
                          style={itemStyles} 
                          onPress={() => toggle(item.label)}/>)
                          
                        }
                      </ScrollView>
                      </View>
                        </TouchableOpacity>
                  
              </Modal>
              : null
            }
</View>
    )
}

const styles = StyleSheet.create({
  dropdownContainer:{
    flex: 1,
    backgroundColor: color.transparent,
  },
dropdown: {
    position: 'absolute',
    backgroundColor: color.whiteBackground,
    width: 295,
    maxHeight: 100,
    shadowColor: color.palette.black,
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.palette.mischka
  },
  textBox:{
      flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  

  item:{
    width: 290,
    height: 50,
    padding: 5,
    margin: 3,
  }
})

