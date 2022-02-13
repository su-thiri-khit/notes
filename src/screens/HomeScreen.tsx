import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PagerView } from 'react-native-pager-view';

import { Header } from '../components/Header';
import { MenuToolStripBar } from '../components/MenuStripBar';
import { NavigationParamList } from '../navigation/AppNavigator';
import AllNotesView from './AllNotesView';
import ArchivedNotesView from './ArchivedNotesView';
import FavoriteNotesView from './FavoriteNotesView';

type Props = StackScreenProps<NavigationParamList, 'HomeScreen'>
const HomeScreen = ({ navigation }: Props) => {

    const tabItems: string[] = ['All', 'Favorite', 'Archived']
    const [currentTab, setCurrentTab] = useState(0)

    const pagerViewRef = useRef<PagerView>(null)
    const flatListRef = useRef<FlatList>(null)

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
        navigation.navigate('CreateNoteScreen')
    }

    return(
            <SafeAreaView style={styles.flex}>
                <Header 
                    style={{paddingHorizontal: 8}}
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
                        <PagerView 
                            ref={pagerViewRef}
                            style={styles.flex} 
                            initialPage={0}
                            onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
                        >
                            <AllNotesView key="0" />
                            <FavoriteNotesView key="1" />
                            <ArchivedNotesView key="2" />
                        </PagerView>
                    </View>
        
           
            </SafeAreaView>
          
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
  });