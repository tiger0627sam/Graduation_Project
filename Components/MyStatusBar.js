import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

const MyStatusBar = (props) => {
    return (
        props.color ?
            <StatusBar
                animated={true}
                backgroundColor={props.color}
                barStyle='dark-content'
                hidden={false}
            />
            :
            <StatusBar
                animated={true}
                backgroundColor="#D58795"
                barStyle='light-content'
                hidden={false}
            />
    )
}
export default MyStatusBar;