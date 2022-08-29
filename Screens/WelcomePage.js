import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Button, ScrollView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Logo from '../assets/Images/Logo3.png';
import LogoText from '../assets/Images/Text5.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const WelcomePage = ({ navigation }) => {

    function ToSignUp() {
        navigation.navigate('S_SignUp')
    }

    function ToSignIn() {
        navigation.navigate('S_SignIn')
    }

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

    return (
        <View style={styles.mainView}>
            <MyStausBar />
            <View style={styles.TopView} onLayout={onLayoutRootView}>
                <View style={styles.TopLogo}>
                    <Image source={Logo} style={styles.TopPhoto1} />
                    <Image source={LogoText} style={styles.TopPhoto2} />
                </View>
            </View>
            <ScrollView style={styles.ButtomView}>
                <Text style={styles.Heading}>
                    胭脂鶴 - 行動化妝小幫手
                </Text>
                <Text style={styles.Introduce}>
                    {"綺羅粉黛使古時佳麗得以大放異彩，古文《妝臺記》中記載梳妝打扮之樣式，提及了施胭脂以完成的醉暈妝、桃花妝等，而此APP意旨在於提供使用者如何掌握合適自己的上妝技巧與裝扮方式達到最佳點綴效果，並且將紙鶴傳遞希望與訊息的本質意象化，將我們建立的內容乘載於此，無遠弗屆地傳遞給需要的人。"}
                </Text>
                <View style={styles.FormView}>
                    <TouchableOpacity style={styles.SiguInButton} onPress={ToSignIn}>
                        <Text style={styles.ButtonText}>
                            登入
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SiguUpButton} onPress={ToSignUp}>
                        <Text style={styles.ButtonText}>
                            註冊
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
        fontSize: 30,
        // fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'OldWriting',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    Introduce: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Content',
        textAlign: 'left',
        lineHeight: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20

    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    TextInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#000',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 15,
        color: '#000'
    },
    SiguInButton: {
        width: '80%',
        color: '#000',
        height: 52,
        backgroundColor: '#D58795',
        borderRadius: 10,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SiguUpButton: {
        width: '80%',
        color: '#D58795',
        height: 52,
        backgroundColor: '#FAF2F2',
        borderWidth: 3,
        borderColor: '#D58795',
        borderRadius: 10,
        marginTop: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: '#000',
        // fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Content',
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

export default WelcomePage