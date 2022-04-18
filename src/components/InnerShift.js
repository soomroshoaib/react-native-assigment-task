import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { dateConvertor } from '../utils';

const InnerShift = ({ shift }) => {
  const { startTime, endTime } = shift;
  return (
    <View>
      <Text>
        {dateConvertor(startTime)}-{dateConvertor(endTime)}
      </Text>
    </View>
  );
};

export default InnerShift;

const styles = StyleSheet.create({});
