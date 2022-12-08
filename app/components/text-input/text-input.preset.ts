import { color } from "@theme";
import { TextStyle, ViewStyle , StyleSheet} from "react-native";

const BASE_OUTLINE: ViewStyle = {
    width: 295,
    height: 56,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 10,
    
}

const BASE_TEXT: TextStyle = {
    color: color.storybookTextColor,
    fontSize: 14,
    fontWeight: '500',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
}

const BASE_LABEL: TextStyle = {
    color: color.storybookTextColor,
    paddingLeft: 20,
}

export const LABEL_STYLE = StyleSheet.create({
    primary:{
        ...BASE_LABEL
    }
})
export const VIEW_STYLES = StyleSheet.create({
    primary: {
        ...BASE_OUTLINE
    }
})

export const TEXT_STYLES = StyleSheet.create({
    primary:{
        ...BASE_TEXT,
    }
})