import React, { ReactNode } from "react"
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"


export type HeaderProps = {
    style?: StyleProp<ViewStyle>,
    leftTitle?: ReactNode
    rightTitle?: ReactNode
    children?: ReactNode
}

export const Header = ({
    style,
    leftTitle,
    rightTitle,
    children
}: HeaderProps) => {
    return(
        <View style={[style, styles.appBarWrapper]}>
            <View style={styles.appBarView}>
                <View style={styles.rightTitleView}>
                    {leftTitle}
                </View>
                <View style={styles.rightTitleView}>
                    {rightTitle}
                </View>
            </View>

            {children && (
                <View style={{padding: 8}}>
                    {children}
                </View>   
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    appBarWrapper: {
        backgroundColor: '#FFFFF',
        borderBottomColor: Platform.select({ ios: '#d5d5d5'}),
        borderBottomWidth: 1
    },
    appBarView: {
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    rightTitleView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    }
})