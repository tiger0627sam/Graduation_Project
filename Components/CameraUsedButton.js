import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import CameraIcon from 'react-native-vector-icons/Entypo';

export default function Button({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <CameraIcon name={icon} size={28} color={color ? color : '#000'} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});