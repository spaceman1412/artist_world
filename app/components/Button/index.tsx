import { TouchableOpacity } from "react-native-gesture-handler";
import {Text, StyleSheet} from 'react-native';

interface ButtonProps {
    content: string,
    onPress : () => void,

}
 
const Button = ({content, onPress} : ButtonProps) => {
    return (
        <TouchableOpacity
        style={styles.container}  
        onPress={() => onPress}>
            <Text style={styles.content}>{content}</Text>
        </TouchableOpacity>
      );
}
 
const styles = StyleSheet.create({
 container: {
    backgroundColor: '#ee8f9d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    padding: 10,
    height: 55,
    margin: 10,
    borderRadius: 50,
 },
 content: {
    color: 'white',
    fontSize: 20,
    fontWeight: "500",
 }
})
export default Button;