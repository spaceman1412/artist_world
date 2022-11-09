import { View} from "react-native";
import CountryFlag  from "react-native-country-flag"
import { FlagProp } from "./flag.props";


const Flag = ({code, style} : FlagProp ) => {
    return (
        <View >
            <CountryFlag isoCode={code} 
            size={20}
            style={style}/>
        </View> )
}



export default Flag;