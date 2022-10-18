import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View, Image, Text} from 'react-native';
import { images } from "@assets/images";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Button from "@components/Button";
import * as React from 'react';

const TextBox = ({placeholder, title, image, onChange, value, type}) =>{
    return (
        <View style={styles.line}>
            <Text style = {styles.label}>{title}
            <Text style={{color:'red'}}>*</Text>
            </Text>
            <View style={styles.textBox}>
                <TextInput 
                keyboardType={type}
                placeholderTextColor={'#dde1e6'}
                placeholder={placeholder}
                style={styles.inputText}
                value = {value}
                onChangeText = {(text) => onChange(text)}/>
                <Image 
                style={styles.rightIcon}
                source={image}/>
            </View>
        </View>
    )
}

const EditProfile = ({navigation}) =>{
    const [name, setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [location, setLocation] = React.useState('')
    console.log('email', email)
    return (
        <SafeAreaView style = {styles.container}>
            <View style ={styles.imageContainer}>
                <View style= {styles.userContainer}>
                    <Image style={styles.imageUser} 
                    source={images.user}/>
                </View>
                <TouchableOpacity style={styles.editContainer}>
                    <Image source = {images.edit}
                    style={styles.imageEdit}/>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.line}>
                    <Text style={styles.label}>Full Name
                    <Text style={{color: 'red'}}>*</Text></Text>
                    <View style = {styles.fullNameContainer}>
                        <TextInput 
                        placeholderTextColor={'#dde1e6'}
                        placeholder="Full Name"
                        style={styles.inputText}
                        value={name}
                        onChangeText={text => setName(text)}
                        />
                    </View>
                </View>
                <TextBox image={images.email}
                placeholder='Email'
                title='Email' 
                onChange={setEmail}
                type='email-address'
                value={email}  /> 
                <TextBox image={images.phone}
                placeholder='Phone Number'
                title='Phone Number'
                type='numeric'
                onChange = {setPhone}
                value={phone}
                />
                <TextBox image={images.sort_down}
                placeholder='Gender'
                title = 'Gender'
                type='default'
                onChange = {setGender}
                value={gender}
                />
                <TextBox image={images.location}
                placeholder='Location'
                type='default'
                title='Location'
                onChange={setLocation}
                value={location}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button content="Continue" 
                onPress={() => console.log('press')}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems:'flex-end',
        flexDirection:'row'
        },
    userContainer:{
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#f5f5f8',
        marginRight: -50,
        }, 
    imageUser: {
        width: 140,
        height: 140,
        borderRadius: 100
    },
    imageEdit: {
        width: 20,
        height: 20,
        
    },
    editContainer:{
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4d67',
        width: 40,
        height: 40,
        borderRadius: 100,
        
    },
    content: {
        padding: 10,

    },
    line: {
        marginVertical: 7,
        
    },
    fullNameContainer: {
        paddingHorizontal: 20,
        borderColor: '#ebeef2',
        borderWidth: 1,
        borderRadius:30,
    },
    label: {
        color: '#56616f',
        fontWeight: '500',
        marginLeft: 30,
        marginBottom: 3,
    },
    inputText: {
        color: 'black',
        fontWeight: '500',
        width: '90%',
    },
    textBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        borderColor:'#ebeef2',
        borderWidth: 1,
        borderRadius: 30,
    } ,
    rightIcon: {
        width: 25,
        height: 25,
    },
    buttonContainer:{
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f4f6f9',
        borderTopWidth:1,
        borderBottomLeftRadius: 0,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 15,
    }
})

export default EditProfile;