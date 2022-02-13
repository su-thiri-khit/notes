import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { PagerView } from 'react-native-pager-view';

import { Header } from '../components/Header';
import { MenuToolStripBar } from '../components/MenuStripBar';
import AllNotesScreen from './AllNotesScreen';
import ArchivedScreen from './ArchivedScreen';
import FavoriteScreen from './FavoriteScreen';

const HomeScreen = (props: any) => {

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

    return(
            <SafeAreaView style={styles.flex}>
                <Header style={{paddingHorizontal: 8}}>
                    {menu}
                </Header>
                    <View style={{ flex: 1, padding: 12 }}>
                        <PagerView 
                            ref={pagerViewRef}
                            style={styles.flex} 
                            initialPage={0}
                            onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
                        >
                            <AllNotesScreen key="0" />
                            <FavoriteScreen key="1" />
                            <ArchivedScreen key="2" />
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