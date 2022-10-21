import React from 'react';
import {CounterActions} from 'app/store/counter/reducer';
import {useAppDispatch, useAppSelector} from 'app/store/hook';
import {Button, Text, TextInput, View} from 'react-native';

const Counter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const {value} = useAppSelector(state => state.counter);
  const [number, setNumber] = React.useState(null);

  const dispatch = useAppDispatch();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{value}</Text>

      <View style={{flexDirection: 'row'}}>
        <Button
          title="Increment"
          onPress={() => {
            dispatch(CounterActions.increment());
          }}
        />

        <Button
          title="Decrement"
          onPress={() => {
            dispatch(CounterActions.decrement());
          }}
        />
      </View>

      <TextInput
        style={{
          width: 100,
          height: 40,
          borderWidth: 1,
          padding: 10,
        }}
        value={number}
        onChangeText={num => setNumber(num)}
        keyboardType="numeric"
      />

      <Button
        title="Increment with value"
        onPress={() => dispatch(CounterActions.incrementByAmount(number))}
      />
    </View>
  );
};

export default Counter;
