import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Button, ScrollView, TouchableWithoutFeedback, Text, View, Keyboard, Image, TextInput, TouchableOpacity } from 'react-native';
import { authentication, firestore_db } from "../Firebase/firebase";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc, increment, query, orderBy, limit } from "firebase/firestore";
import FormError from '../Components/FormError';
import FormSuccess from '../Components/FormSuccess';
import Logo from '../assets/Images/Logo3.png';
import LogoText from '../assets/Images/Text5.png';
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const SignUp = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [errMessage, setErrorMessage] = useState('');
    const [successMessaage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState();
    const [confirmPassword, setComfirmpassword] = useState();
    const [displayFormErr, setDisplayFormErr] = useState(false);

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


    const RegisterUser = async () => {
        setIsLoading(true);
        try {
            const register = await createUserWithEmailAndPassword(authentication, email, password)
            await setDoc(doc(firestore_db, "User", register.user.uid), {
                email: register.user.email
            });
            await setDoc(doc(firestore_db, "Couter", register.user.uid), {
                num: 1
            });
            setSuccessMessage("已註冊成功");
            setIsLoading(false);
        }
        catch (err) {
            setIsLoading(false);
            setErrorMessage(err.message);
            setDisplayFormErr(true)
        }
    }

    const ValidataForm = () => {
        var form_inputs = [fullName, email, password, confirmPassword];
        var passwords_match = password == confirmPassword;

        if (form_inputs.includes('') || form_inputs.includes(undefined)) {
            setErrorMessage("Please fill in all fields");
            return setDisplayFormErr(true);
        }
        if (!passwords_match) {
            setErrorMessage("Password do not match");
            return setDisplayFormErr(true);
        }

        if (passwords_match) return RegisterUser();
    }


    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
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
                        建立新帳戶
                    </Text>
                    <View style={styles.FormView}>
                        <TextInput onChangeText={(val) => setFullName(val)} placeholder={"使用者名稱*"} value={fullName} placeholderTextColor={"#4F4F4F"} style={styles.TextInput} />
                        <TextInput onChangeText={(val) => setEmail(val)} placeholder={"電子信箱*"} value={email} placeholderTextColor={"#4F4F4F"} style={styles.TextInput} />
                        <TextInput onChangeText={(val) => setPassword(val)} placeholder={"密碼(至少六位英數字)*"} value={password} secureTextEntry={true} placeholderTextColor={"#4F4F4F"} style={styles.TextInput} />
                        <TextInput onChangeText={(val) => setComfirmpassword(val)} placeholder={"確認密碼*"} value={confirmPassword} secureTextEntry={true} placeholderTextColor={"#4F4F4F"} style={styles.TextInput} />
                        <TouchableOpacity onPress={ValidataForm} style={styles.Button}>
                            <Text style={styles.ButtonText}>
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
                    successMessaage == "Your account has been created" ?
                        <FormSuccess successMessaage={successMessaage} close={setSuccessMessage} />
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
        // backgroundColor:'#cd5c5c'
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
        marginLeft: 30,
        marginTop: 60,
        fontFamily: 'ArtFont',
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
        marginBottom: 20
    },
    ButtonText: {
        color: '#fff',
        fontFamily: 'Content',
        fontSize: 18,
    },
    SignUpText: {
        color: 'gray',
    },
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
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

export default SignUp