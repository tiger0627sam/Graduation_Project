import React from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from "react-native";
import { Overlay } from "@rneui/themed";
const FormSuccess = (props) => {
    return (
        props.successMessaage ?
            <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => props.close()}>
                <Image
                    style={styles.successIcon}
                    source={require('../assets/Images/check.png')}
                />
                <Text style={styles.SuccessMessage}>
                    {props.successMessaage}
                </Text>
                <TouchableOpacity style={styles.Button} onPress={() => props.close()}>
                    <Text style={styles.buttonText}>Okay</Text>
                </TouchableOpacity>
            </Overlay>
            :
            <Overlay overlayStyle={styles.Overlay} isVisible={true}>
                <ActivityIndicator size={"large"} color={"#D58795"} />
            </Overlay>
    )
}

export default FormSuccess;
const styles = StyleSheet.create({
    Overlay: {
        width: '80%',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successIcon: {
        width: 72,
        height: 72,
    },
    SuccessMessage: {
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