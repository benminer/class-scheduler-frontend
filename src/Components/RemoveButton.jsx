import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RemoveButton = props => (
    <View style={{ backgroundColor: props.color, borderRadius: 30, flex: 1, alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => props.onPress(props.index)} style={{ alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', padding: 15, color: 'white' }}>
          Remove 
        </Text>
      </TouchableOpacity> 
    </View> 
)

export default RemoveButton;