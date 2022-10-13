import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from 'react-native-vector-icons/AntDesign';
const SelectCountry = () =>{
    return(
        <SafeAreaView>
        <View style={styles.searchBox}>
        <TextInput placeholder="search"/>
            <AntDesign name='search1' style={{color: 'red', fontSize: 50}}/>
        </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    searchBox: {

    }
})
export default SelectCountry;