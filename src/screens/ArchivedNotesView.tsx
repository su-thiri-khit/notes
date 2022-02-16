import React from 'react';
import { View, Text, FlatList } from 'react-native'
import { NoteItem } from '../model/noteModel';
import { styles } from '../styles';

const ArchivedNotesView = (props: any) => {

    const renderItem = (item: NoteItem) => {
        if(item.is_archived) {
            return (
                <View
                    style={{
                        backgroundColor: '#87CEEB', 
                        margin: 8, padding: 12, borderRadius: 8
                    }}
                >
                        <Text style={styles.titleText}>{item.title}</Text>
                        <Text style={styles.bodyText}>{item.body}</Text>
                </View>
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

export default ArchivedNotesView