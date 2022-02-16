import React from 'react';
import { Text } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { NoteItem } from '../model/noteModel';
import { styles } from '../styles';
import { NotesViewProps } from '../types';

const AllNotesView= (props: NotesViewProps) => {

    const { navigation } = props

    const renderItem = (item: NoteItem) => {
        if(!item.is_archived) {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateNoteScreen', {
                        note: item
                    })}
                    style={{
                        backgroundColor: '#87CEEB', 
                        margin: 8, padding: 12, borderRadius: 8
                    }}
                >
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.bodyText}>{item.body}</Text>
                </TouchableOpacity>
            )
        } 
        return null
    }

    return(
        <FlatList
            data = {props.notes}
            renderItem={(item) => renderItem(item.item)}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}       
        />
    )
}

export default AllNotesView
