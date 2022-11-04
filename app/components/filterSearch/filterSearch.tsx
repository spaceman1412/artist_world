
import { color } from '@theme';
import * as React from 'react';
import { 
Modal,
StyleSheet,
View,Text,
TouchableOpacity } from 'react-native';
import { filterSearchProps } from './filterSearch.props';

const FilterSearch = ({
...rest
}: filterSearchProps) =>{
    const [gender,setGender] = React.useState('')
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
                    <TouchableOpacity style={{alignItems: 'flex-end'}}>
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
                    style={gender ==='girls' ?
                    styles.genderLeftActive 
                    :styles.buttonGender}
                    >
                        <Text style={gender === 'girls'?
                        styles.genderTextActive:
                        styles.genderContent}
                        >
                            Girls
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => setGender('boys')}
                    style={gender === 'boys' ?
                    styles.genderMidleActive
                    : styles.buttonGender}>
                        <Text 
                        style={gender === 'boys' ?
                        styles.genderTextActive
                        : styles.genderContent}>
                            Boys
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => setGender('both')}
                    style={ gender === 'both' ?
                    styles.genderRightActive
                    : styles.buttonGender}>
                        <Text 
                        style={gender === 'both'?
                        styles.genderTextActive
                        : styles.genderContent}>
                            Both
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    </View>
    </Modal>
)}

const styles = StyleSheet.create({
    overPlayed: {
        backgroundColor: 'rgba(0,0,0,0.5)',
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
    },
    buttonClear:{
        fontSize: 16,
        color: color.palette.primary,
        fontWeight: '700',
    },
    interestContainer:{

    },
    title:{
        fontSize: 16,
        fontWeight: '700'
    },
    genderOptions:{
        flexDirection: 'row',
        width: 295,
        height: 58,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: color.palette.mischka,
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
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.palette.primary
    },
    genderRightActive:{
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        width: 98,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.palette.primary
    },
    genderMidleActive:{
        width: 98,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.palette.primary
    },
    genderTextActive: {
        color: color.text,
        fontWeight: '700',
    }
})
export default FilterSearch;