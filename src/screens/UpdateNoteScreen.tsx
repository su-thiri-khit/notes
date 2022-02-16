import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, Image, View, TextInput, StyleSheet, Button } from 'react-native'
import { Header } from '../components/Header';
import { NavigationParamList } from '../navigation/AppNavigator';

type Props = StackScreenProps<NavigationParamList, 'UpdateNoteScreen'>

const UpdateNoteScreen= ({ navigation, route }: Props) => {

    const { note } = route.params

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
                        // onPress={saveNote}
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
                    value={note.title}
                    autoFocus={true}
                    editable={false}
                    numberOfLines={5}
                /> 
                <TextInput 
                    style={[styles.textInputView , {minHeight: '50%'}] }
                    multiline={true}
                    value={note.body}
                    editable={false}
                />
                <View style={styles.buttonView}>
                     <Button
                       title="Add to Favorite"
                    />
                     <Button
                       title="Delete"
                    />
                </View>
           </View>
        </SafeAreaView>
    )
}

export default UpdateNoteScreen

const styles = StyleSheet.create({
    textInputView: {
        fontSize: 16, 
        margin: 16, 
        padding: 8, 
        borderWidth: 1, 
        borderColor: '#808080'
    },
    buttonView: {
        flexDirection: 'row', 
        marginHorizontal: 16,
        marginVertical: 8
    }
});
