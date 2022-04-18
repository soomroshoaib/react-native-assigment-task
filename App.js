import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import MyShifts from './src/screens/MyShifts';
import AvailableShifts from './src/screens/AvailableShifts';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='My Shifts'
        screenOptions={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelStyle: { marginBottom: 15 },
        }}
      >
        <Tab.Screen
          name='My Shifts'
          component={MyShifts}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name='Available Shifts'
          component={AvailableShifts}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
