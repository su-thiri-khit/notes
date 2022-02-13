import React from 'react';
import { View, Text, SafeAreaView } from 'react-native'
import { NoteItem } from '../model/noteModel';

export interface AllNotesViewProps {
    notes: NoteItem[]
}


const AllNotesView= (props: AllNotesViewProps) => {
    console.warn("Notes ===>", props.notes)
    return(
        <View style={{ flex: 1 }}>
            <Text>All Notes Screen</Text>
        </View>
    )
}

export default AllNotesView