import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from "../screens/HomeScreen"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator()

const AppNavigator = () => {
    return(
        <NavigationContainer>
             <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
             </Stack.Navigator>  
        </NavigationContainer>
    )
   
}

export default AppNavigator