import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "../screens/HomeScreen"
import CreateNoteScreen from "../screens/CreateNoteScreen"

export type NavigationParamList = {
    HomeScreen: any
    CreateNoteScreen: any
}


const Stack = createStackNavigator()

const AppNavigator = () => {
    return(
        <NavigationContainer>
             <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false}}
                />
                 <Stack.Screen name="CreateNoteScreen" 
                    component={CreateNoteScreen} 
                />
             </Stack.Navigator>  
        </NavigationContainer>
    )
   
}

export default AppNavigator