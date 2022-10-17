import { View, StyleSheet } from "react-native";
import CountryFlag  from "react-native-country-flag"



const Flag = ({code} ) => {
    return (
        <View style = {styles.container}>
            <CountryFlag isoCode={code} size={30} style={styles.flags}/>
        </View> )
}

const styles = StyleSheet.create({
    container: {
        
    },
    flags:{
        borderRadius: 10,
        height: 40,
        width: 40,
    }
})

export default Flag;