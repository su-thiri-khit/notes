import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "../screens/HomeScreen"
import CreateNoteScreen from "../screens/CreateNoteScreen"
import UpdateNoteScreen from "../screens/UpdateNoteScreen"
import { NoteItem } from "../model/noteModel"

export type NavigationParamList = {
    HomeScreen: any
    CreateNoteScreen: { nextNoteId: number }
    UpdateNoteScreen: { note: NoteItem }
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
                    options={{ headerShown: false}}
                />
                 <Stack.Screen name="UpdateNoteScreen" 
                    component={UpdateNoteScreen} 
                    options={{ headerShown: false}}
                />
             </Stack.Navigator>  
        </NavigationContainer>
    )
   
}

export default AppNavigator