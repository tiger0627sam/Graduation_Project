import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Overlay } from "@rneui/themed";
const FormError = (props) => {
    return (
        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => props.hideErrOverlay(false)}>
            <Image
                style={styles.errorIcon}
                source={require('../assets/Images/error.png')}
            />
            <Text style={styles.ErrorMessage}>
                {props.err}
            </Text>
            <TouchableOpacity style={styles.Button} onPress={() => props.hideErrOverlay(false)}>
                <Text style={styles.buttonText}>Okay</Text>
            </TouchableOpacity>
        </Overlay>
    )
}

export default FormError;
const styles = StyleSheet.create({
    Overlay: {
        width: '80%',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorIcon: {
        width: 72,
        height: 72,
    },
    ErrorMessage: {
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