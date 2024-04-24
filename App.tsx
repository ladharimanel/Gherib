import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Date from './screens/Date';
import Copy from './screens/Copy';
import DetailScreen from './screens/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (

    <View style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Date" component={Date} options={{ headerShown: false }} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Retour' }} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>

  )
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  }
})
export default App 
