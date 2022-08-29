import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, Button, ScrollView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
//import logo from'../assets/images/transparentLogo';
import { authentication } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
import Logo from '../assets/Images/Logo3.png';
import LogoText from '../assets/Images/Text5.png';
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const SignIn = ({ navigation, route }) => {

    function navigate() {
        navigation.navigate('S_SignUp')
    }

    // const [isSignedIn, setIsSignedIn] = useState = (false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [errMessage, setErrorMessage] = useState('');
    const [displayFormErr, setDisplayFormErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [fontsLoaded] = useFonts({
        'Content': require('../assets/Fonts/台灣圓體-Regular.ttf'),
        'ArtFont': require('../assets/Fonts/JasonHandwriting2.ttf'),
        'OldWriting': require('../assets/Fonts/SentyGoldenBell.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }//字體區


    const ValidataForm = () => {
        var form_inputs = [email, password];
        if (form_inputs.includes('') || form_inputs.includes(undefined)) {
            setErrorMessage("Please fill in all fields");
            return setDisplayFormErr(true);
        }
        setIsLoading(true);
        signInWithEmailAndPassword(authentication, email, password)
            .then((result) => {
                setIsLoading(false);
                route.params.authenticate(true);
            })
            .catch((err) => {
                setErrorMessage(err.message);
                setIsLoading(false);
                return setDisplayFormErr(true);
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.mainView} onLayout={onLayoutRootView}>
                <MyStausBar />
                <View style={styles.TopView}>
                    <View style={styles.TopLogo}>
                        <Image source={Logo} style={styles.TopPhoto1} />
                        <Image source={LogoText} style={styles.TopPhoto2} />
                    </View>
                </View>
                <ScrollView style={styles.ButtomView}>
                    <Text style={styles.Heading}>
                        歡迎回來
                    </Text>
                    {/* onChangeText={(val)=>setEmail(val)}
                onChangeText={(val)=>setPassword(val)} */}
                    <View style={styles.FormView}>
                        <TextInput placeholder={"電子信箱*"} onChangeText={(val) => setEmail(val)} value={email} placeholderTextColor={"#4F4F4F"} style={styles.TextInput} />
                        <TextInput placeholder={"密碼*"} onChangeText={(val) => setPassword(val)} value={password} secureTextEntry={true} placeholderTextColor={"#4F4F4F"} style={styles.TextInput} />
                        <TouchableOpacity style={styles.Button} onPress={ValidataForm}>
                            {/* onPress={ValidataForm} */}
                            <Text style={styles.ButtonText}>
                                登入
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                            <Text style={styles.SignUpText}>
                                註冊
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {displayFormErr == true ?
                    <FormError hideErrOverlay={setDisplayFormErr} err={errMessage} />
                    :
                    null
                }

                {isLoading == true ?
                    <FormSuccess />
                    :
                    null
                }

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D58795'

    },
    TopView: {
        width: '100%',
        height: '30%'
    },
    ButtomView: {
        width: '100%',
        height: '70%',
        backgroundColor: '#FAF2F2',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    Heading: {
        color: '#000',
        fontSize: 50,
        fontFamily: 'ArtFont',
        // fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 60,
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
    },
    TextInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#000',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 15,
        color: '#000',
        fontFamily: 'Content',
    },
    Button: {
        width: '90%',
        color: '#fff',
        height: 52,
        backgroundColor: '#000',
        borderRadius: 10,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: '#fff',
        fontFamily: 'Content',
        fontSize: 18
    },
    SignUpText: {
        color: 'gray',
    },
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 15
    },
    TopLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    TopPhoto1: {
        marginTop: 40,
        height: 150,
        width: 150,
        borderRadius: 2,
    },
    TopPhoto2: {
        marginTop: 40,
        height: 80,
        width: 240,
        borderRadius: 2,
    },
})

export default SignIn