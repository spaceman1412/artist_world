import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectCountry = () =>{
    return(
        <SafeAreaView>
        <View style={styles.searchBox}>
            <TextInput placeholder="search"/>
            
        </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    searchBox: {

    }
})
export default SelectCountry;