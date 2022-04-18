import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { dateConvertor } from '../utils';

export default function Shift({ shift }) {
  const { area, booked, startTime, endTime } = shift;
  return (
    <View style={styles.shift}>
      <View>
        <Text>
          {dateConvertor(startTime)}-{dateConvertor(endTime)}
        </Text>
        <Text>{area}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Button title='Cancel' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shift: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: '#FE93B3',
    borderRadius: 10,
    color: '#E2006A',
  },
  date: {},
});
