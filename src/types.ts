import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { NoteItem } from "./model/noteModel";
import { NavigationParamList } from "./navigation/AppNavigator";


export type HomeScreenProps = StackScreenProps<NavigationParamList, 'HomeScreen'>

export interface NotesViewProps extends HomeScreenProps{
    notes: NoteItem[],
}
