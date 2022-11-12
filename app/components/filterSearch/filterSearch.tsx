
import {DropDown} from '@components';
import { color } from '@theme';
import * as React from 'react';
import { 
Modal,
StyleSheet,
View,Text,
TouchableOpacity,
} from 'react-native';
import { filterSearchProps } from './filterSearch.props';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Cursor from './cursor/cursor';
import GlobalStyles from '@theme/styles/global-style';

const FilterSearch = ( props: filterSearchProps) =>{

    const{onCloseModal,
        genderValue,
        setGender,
        locationValue,
        setLocation,
        LocationData,
        distance,
        setDistance,
        age,
        setAge,
        ...rest
    } = props 
    const onClear = () =>{
        setGender('');
        setLocation('');
        setDistance([1]);
        setAge([18,60]);
    }
return(
    <Modal
    transparent
    {...rest}>
        <View style={styles.overPlayed}>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1}}/>
                <Text style={styles.headingTitle}>
                    Filters
                </Text>
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                    onPress={onClear}
                    style={{alignItems: 'flex-end'}}>
                        <Text style={styles.buttonClear}>
                            Clear
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.interestContainer}>
                <Text style={styles.title}>Interest in</Text>
                <View style={styles.genderOptions}>
                    <TouchableOpacity 
                    onPress={() => setGender('girls')}
                    style={genderValue ==='girls' ?
                    styles.genderLeftActive 
                    :styles.buttonGender}
                    >
                        <Text style={genderValue === 'girls'?
                        styles.genderTextActive:
                        styles.genderContent}
                        >
                            Girls
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => setGender('boys')}
                    style={genderValue === 'boys' ?
                    styles.genderMidleActive
                    : styles.buttonGender}>
                        <Text 
                        style={genderValue === 'boys' ?
                        styles.genderTextActive
                        : styles.genderContent}>
                            Boys
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => setGender('both')}
                    style={ genderValue === 'both' ?
                    styles.genderRightActive
                    : styles.buttonGender}>
                        <Text 
                        style={genderValue === 'both'?
                        styles.genderTextActive
                        : styles.genderContent}>
                            Both
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dropdownSection}>
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.dropdownContainer}>
                        <DropDown
                        value={locationValue}
                        preset='noneOutline'
                        onSelect={setLocation} 
                        data={LocationData} 
                            />
                    </View>
                </View>
            </View>
            
            <View>
                <View
                onLayout={e => e.preventDefault()} 
                style={[
                    GlobalStyles.row,
                    GlobalStyles.justifyBetween,
                    ]}>
                    <Text style ={styles.title}>Distance</Text>
                    <Text style={styles.label}>{distance} km</Text>
                </View>
                    <MultiSlider
                    values={distance}
                    max={50}
                    min={1}
                    onValuesChange={(value) => setDistance(value)}
                    sliderLength={295}
                    trackStyle={{ width: 30, height: 6, borderRadius: 20}}
                    selectedStyle={{backgroundColor: color.palette.primary}}
                    customMarker={Cursor}
                    containerStyle={{marginVertical: 10}}
                    />
            </View>
            <View >
                <View style={[
                GlobalStyles.row,
                GlobalStyles.justifyBetween]}>
                <Text style={styles.title}>Age</Text>
                <Text>{age[0]} - {age[1]}</Text>
                </View>
            <MultiSlider
            min={10}
            max={60}
            onValuesChange={(value) => setAge(value)}
            enabledTwo={true}
            values={age}
            sliderLength={295}
            trackStyle={{ width: 30, height: 6, borderRadius: 20}}
            selectedStyle={{backgroundColor: color.palette.primary}}
            customMarker={Cursor}
            containerStyle={{marginVertical: 10}}
            />
            </View>
        <View>
            <TouchableOpacity
            onPress={() => onCloseModal(false)} 
            style={styles.continueButton}>
                <Text style={styles.buttonContent}>Continue</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
    </Modal>
)}

const styles = StyleSheet.create({
    overPlayed: {
        backgroundColor: color.palette.black40,
        flex: 1,
        justifyContent: 'flex-end',
    },
    container :{
        height: 649,
        width: '100%',
        padding: 40,
        backgroundColor: color.palette.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingTitle:{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        flex: 1,
        color: color.storybookTextColor
    },
    buttonClear:{
        fontSize: 16,
        color: color.palette.primary,
        fontWeight: '700',
    },
    interestContainer:{
        justifyContent: 'space-around',
        
    },
    title:{
        fontSize: 16,
        fontWeight: '700',
        color: color.storybookTextColor
    },
    genderOptions:{
        flexDirection: 'row',
        width: 295,
        height: 58,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: color.palette.mischka,
        marginVertical: 10
    },
    buttonGender:{
        width: 98,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genderContent:{
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
        width: '100%',
        borderLeftColor: color.palette.mischka,
        borderLeftWidth: 1,
        alignItems: 'center'
    },
    genderLeftActive:{
        borderTopLeftRadius: 15,
        borderBottomStartRadius: 15,
        width: 98,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.palette.primary
    },
    genderRightActive:{
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        width: 98,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.palette.primary
    },
    genderMidleActive:{
        width: 98,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.palette.primary
    },
    genderTextActive: {
        color: color.text,
        fontWeight: '700',
    },
    dropdownContainer:{
        backgroundColor: color.transparent,
        borderRadius: 15,
        height: 58,
        width: 295,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.palette.mischka,
        marginTop: -8,
    },
    label:{
        zIndex: 2,
        fontSize: 12,
        margin: 0,
        width: 48,
        marginLeft: 28,
        backgroundColor: color.whiteBackground,
        padding: 0,
    },
    dropdownSection:{
        width: 300,
        height: 60,
        marginVertical: 10,
    },
    continueButton:{
        width: 295,
        height: 56,
        borderRadius: 15,
        backgroundColor: color.palette.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContent:{
        fontSize: 16,
        fontWeight: '700',
        color: color.text,
    }
})
export default FilterSearch;