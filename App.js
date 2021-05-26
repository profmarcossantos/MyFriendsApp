import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/views/Login'
import Menu from './src/views/Menu'
//import Registro from './src/views/Registro'
import CadastroAmigo from './src/views/CadastroAmigo'
import "./src/services/ConnectFirebase"
import { LogBox } from 'react-native'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/services/store'

export default function App() {
  LogBox.ignoreLogs(['Setting a timer'])

  const Stack = createStackNavigator()

  return (
    <StoreProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
          />
          <Stack.Screen
            name="CadastroAmigo"
            component={CadastroAmigo}
          />



        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}


/*
<Stack.Screen
name="Registro"
component={Registro}
/>
*/
