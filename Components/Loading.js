import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";
import { Overlay } from "@rneui/themed";
const Loading = (props) => {
    return (
        props.loadingMessage ?
            <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => props.close()}>
                <ActivityIndicator size={"large"} color={"#D58795"} />
                <Text style={styles.SuccessMessage}>
                    {props.loadingMessage}
                </Text>
            </Overlay>
            :
            <Overlay overlayStyle={styles.Overlay} isVisible={true}>
                <ActivityIndicator size={"large"} color={"#D58795"} />
            </Overlay>
    )
}

export default Loading;
const styles = StyleSheet.create({
    Overlay: {
        width: '80%',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoadingMessage: {
        color: '#000',
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    Button: {
        width: 200,
        color: '#fff',
        height: 45,
        backgroundColor: '#000',
        borderRadius: 5,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})