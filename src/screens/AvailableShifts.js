import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { groupBy } from '../utils';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Helsinki from './inner-screens/Helsinki';
import Tampere from './inner-screens/Tampere';
import Turku from './inner-screens/Turku';

const Tab = createMaterialTopTabNavigator();

export default function AvailableShifts() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://ada6-180-178-133-66.ngrok.io/shifts')
      .then((res) => res.json())
      .then((data) => {
        setShifts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error(error.message);
      });
  }, []);

  const {
    Helsinki: helsinkiShifts,
    Tampere: tampereShifts,
    Turku: turkuShifts,
  } = groupBy(shifts, 'area');

  return (
    <Tab.Navigator initialRouteName='Helsinki' style={{ marginTop: 30 }}>
      <Tab.Screen
        name='Helsinki'
        component={Helsinki}
        options={{ title: `Helsinki (${helsinkiShifts?.length})` }}
      />
      <Tab.Screen
        name='Tampere'
        component={Tampere}
        options={{ title: `Tampere (${turkuShifts?.length})` }}
      />
      <Tab.Screen
        name='Turku'
        component={Turku}
        options={{ title: `Turku (${tampereShifts?.length})` }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
