import { View} from "react-native";
import CountryFlag  from "react-native-country-flag"
import { FlagProp } from "./flag.props";


const Flag = (props : FlagProp ) => {
    const {code,style} = props
    return (
        <View >
            <CountryFlag isoCode={code} 
            size={20}
            style={style}/>
        </View> )
}



export default Flag;