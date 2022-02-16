import { useIsFocused } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { PagerView } from 'react-native-pager-view';

import { Header } from '../components/Header';
import { MenuToolStripBar } from '../components/MenuStripBar';
import { createTable, getDBConnection, getNotes, saveNotes } from '../database/dataBaseService';
import { NoteItem } from '../model/noteModel';
import { NavigationParamList } from '../navigation/AppNavigator';
import AllNotesView from './AllNotesView';
import ArchivedNotesView from './ArchivedNotesView';
import FavoriteNotesView from './FavoriteNotesView';

export type HomeScreenProps = StackScreenProps<NavigationParamList, 'HomeScreen'>

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {

    const tabItems: string[] = ['All', 'Favorite', 'Archived']
    const [currentTab, setCurrentTab] = useState(0)

    const pagerViewRef = useRef<PagerView>(null)
    const flatListRef = useRef<FlatList>(null)

    const [notes, setNotes] = useState<NoteItem[]>([]);

    const isFoucsed = useIsFocused();


    const menu = (
        <MenuToolStripBar 
            innerRef={flatListRef}
            activeIndex={currentTab}
            style={{minWidth: '100%'}}
            tab={tabItems}
            onButtonPress={(index: number) => {
                setCurrentTab(index)
                pagerViewRef.current?.setPage(index)
            }}
        />
    )

    const goToCreateNote = () => {
        navigation.navigate('CreateNoteScreen', {
            nextNoteId: notes ? notes.length : 0
        })
    }

    const getAllNotes = useCallback(async () => {
        try {
           const initNotesData = [
               { id: 0, title: 'Note 1', body: 'Note Body', created_at: '2021-12-30', updated_at: '2021-12-30', is_favorite: false, is_archived: false }
            ];
           const db = await getDBConnection();
           await createTable(db);
           const storedNotes = await getNotes(db);
           if(storedNotes.length) {
               setNotes(storedNotes)
           }else{
               await saveNotes(db, initNotesData)
               setNotes(initNotesData);
           }
        }catch (error){
            console.log("Error =>", error)
        }
    }, []);

    useEffect(() => {
        getAllNotes()
    }, [isFoucsed])

    return(
        <SafeAreaView style={styles.flex}>
            <Header 
                style={{paddingHorizontal: 8}}
                leftTitle={
                    <>
                        <Text style={styles.headerText}>Notes</Text>
                    </>
                }
                rightTitle={
                    <>
                        <TouchableOpacity 
                            style={{ padding: 8, marginLeft: 4}}
                            onPress={goToCreateNote}
                        >
                            <Image 
                                source={require("../assets/ic_create.png") }
                                style={{width: 30, height: 30}}/>
                        </TouchableOpacity>
                            
                        <TouchableOpacity 
                            style={{ padding: 8 }}
                        >
                            <Image 
                                source={require("../assets/ic_settings.png") } 
                                style={{width: 30, height: 30}}/>
                        </TouchableOpacity>
                    </>
                }
            >
                {menu}
            </Header>
                <View style={{ flex: 1, padding: 12 }}>
                    {notes && (
                        <PagerView 
                            ref={pagerViewRef}
                            style={styles.flex} 
                            initialPage={0}
                            onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
                        >
                            <AllNotesView key="0" notes={notes} 
                                navigation={navigation}
                                route={route}
                            />
                        
                            <FavoriteNotesView key="1" />
                            <ArchivedNotesView key="2" />
                        </PagerView>
                    )}  
                </View>
         </SafeAreaView>        
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    headerText: {
        flexDirection: 'column',
        fontSize: 32,
        fontWeight: "bold"
    }
});