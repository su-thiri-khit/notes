import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { NoteItem } from '../model/noteModel';
import { HomeScreenProps } from './HomeScreen';

export interface AllNotesViewProps extends HomeScreenProps{
    notes: NoteItem[],
}


const AllNotesView= (props: AllNotesViewProps) => {

    const { navigation } = props

    const renderItem = (item: NoteItem) => {

    return(
            <TouchableOpacity
                onPress={() => navigation.navigate('UpdateNoteScreen', {
                    note: item
                })}
                style={{
                    backgroundColor: '#87CEEB', 
                    margin: 8, padding: 12, borderRadius: 8
                }}
            >
                <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.bodyText}>{item.body}</Text>
                </View>
            </TouchableOpacity>
        )
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

const styles = StyleSheet.create({
    titleText: {
        fontWeight: '300',
        fontSize: 20,
        paddingBottom: 4
    },
    bodyText: {
        fontWeight: '300',
        fontSize: 16,
    }
});