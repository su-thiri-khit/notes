import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import { Header } from '../components/Header';
import { getDBConnection, saveNotes } from '../database/dataBaseService';
import { NavigationParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<NavigationParamList, 'CreateNoteScreen'>

const CreateNoteScreen= ({route, navigation}: Props) => {

    const { nextNoteId } = route.params

    const [noteTitle, setNoteTitle] = useState<string>();
    const [noteBody, setNoteBody] = useState<string>();
    
    const saveNote = async () => {
        try{
            const newNote = [{ id: nextNoteId, 
                title: noteTitle,
                body: noteBody,
                created_at:  new Date().getMilliseconds(),
                updated_at: new Date().getMilliseconds(),
                is_favorite: false,
                is_archived: false
            }]
            const db = await getDBConnection();
            await saveNotes(db, newNote);
            navigation.goBack()
        } catch (error) {
           console.error("Error ==>", error)
        }
    }

    const header = (
        <Header 
            style={{paddingHorizontal: 8}}
            leftTitle = {
                <>
                    <TouchableOpacity 
                        style={{ padding: 4, flexDirection: 'row'}}
                        onPress={navigation.goBack}
                    >
                        <Image 
                            source={require("../assets/ic_back.png") }
                            style={{width: 24, height: 24, marginRight: 4}}
                        />
                        <Text style={{alignSelf: 'center', fontSize: 20}}>Notes</Text>
                    </TouchableOpacity>
                </>
            }
            rightTitle={
                <>
                    <TouchableOpacity 
                        style={{ padding: 8, marginLeft: 4}}
                        onPress={saveNote}
                    >
                        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: '#808080'}}> Done </Text>
                    </TouchableOpacity>
                </>
            }
        />
    )

    return(
        <SafeAreaView style={{ flex: 1 }}>
           {header}
           <View>
                <TextInput 
                    style={styles.textInputView}
                    multiline={true}
                    placeholder="Type title here!"
                    autoFocus={true}
                    numberOfLines={5}
                    onChangeText={(text) => setNoteTitle(text)}
                />
                <TextInput 
                    style={[styles.textInputView , {minHeight: '50%'}] }
                    multiline={true}
                    placeholder="Type note here!"
                    onChangeText={(text) => setNoteBody(text)}
                />
           </View>
           
        </SafeAreaView>
    )
}

export default CreateNoteScreen


const styles = StyleSheet.create({
    textInputView: {
        fontSize: 16, 
        margin: 16, 
        padding: 8, 
        borderWidth: 1, 
        borderColor: '#808080'
    }
});