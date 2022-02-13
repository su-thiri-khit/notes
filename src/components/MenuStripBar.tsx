import React from "react"
import { StyleProp, ViewStyle, FlatList, StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Colors } from "react-native/Libraries/NewAppScreen"



export default interface ToolStripProps {
    activeIndex: number,
    tab: string[],
    onButtonPress: (index: number) => void,
    style?: StyleProp<ViewStyle>,
    toolStripContainer?: StyleProp<ViewStyle>,
    innerRef?: React.RefObject<FlatList>
}


export const MenuToolStripBar = ({
    activeIndex,
    tab,
    onButtonPress,
    style,
    toolStripContainer,
    innerRef
}: ToolStripProps) => {


    return (
        <FlatList 
            ref={innerRef}
            horizontal={true}
            alwaysBounceHorizontal={false}
            showsHorizontalScrollIndicator={false}
            style={[style]}
            contentContainerStyle={[
                styles.toolStripContentContainer,
                toolStripContainer
            ]}
            data={tab}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={({ item, index }) => {
                const isActive: boolean = activeIndex === index
                return(
                    <TouchableOpacity
                        key={ item + index.toString() } 
                        onPress={() => onButtonPress(index)}
                    >
                        <View style={isActive ? styles.active: styles.inactive}>
                            <Text
                             style={{ 
                                 fontWeight: isActive? '500': '200',
                                 fontSize: 20,
                                 color: isActive ? '#FFFFFF': Colors.grey,
                                 paddingVertical: 10}}>
                                 {item}
                            </Text>
                        </View>
                        
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    toolStripContentContainer: {
        paddingLeft: 16,
        minWidth: '100%'
    },
    active: {
        borderRadius: 12,
        backgroundColor: '#87ceeb',
        paddingHorizontal: 16
    },
    inactive: {
        backgroundColor: 'transparent',
        paddingHorizontal: 16
    }
})