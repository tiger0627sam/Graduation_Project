import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, ImageBackground, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import Logo from '../assets/Images/Logo3.png'
import LogoText from '../assets/Images/Text5.png';
import LogOutIcon from 'react-native-vector-icons/Feather';

const HistoryDetail = ({ navigation }) => {

    const LogOut = () => {
        signOut(authentication)
            .then(() => {
            })
            .catch((err) => {
                console.log(err)
            })
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
        <SafeAreaView style={styles.mainView} onLayout={onLayoutRootView}>
            <View style={styles.TopView}>
                <MyStausBar />
                <View style={styles.Brand}>
                    <Image source={Logo} style={styles.TopLogo} />
                    <Image source={LogoText} style={styles.TopLogo2} />
                </View>
                <View style={styles.LogOut}>
                    <TouchableOpacity onPress={LogOut}>
                        <LogOutIcon name="log-out" size={35} color='#fff' />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.BottomView}>
                <Text style={styles.Express}>
                    分析紀錄
                </Text>
            </View>
        </SafeAreaView>
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
        height: '11%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    BottomView: {
        width: '100%',
        height: '89%',
        backgroundColor: '#FAF2F2',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    Heading: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 5
    },
    TopLogo: {
        marginTop: 15,
        height: 60,
        width: 60,
    },
    TopLogo2: {
        marginTop: 20,
        height: 45,
        width: 135,
    },
    Brand: {
        display: 'flex',
        flexDirection: 'row',
    },
    LogOut: {
        marginTop: 25,
        marginRight: 10,
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
    },
    Express: {
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 30,
        fontSize: 30,
        fontFamily: 'OldWriting'
    },
    Location: {
        alignItems: 'center',
        marginBottom: 80,
        justifyContent: "space-around",
    },
    Situation: {
        width: Dimensions.get('window').width / 1.2,
        height: Dimensions.get('window').width / 2.4,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: Dimensions.get('window').width / 1.2,
        borderRadius: 10,
    },
    ButtonMask: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.65)",
        borderRadius: 10,
    },
    MiddleText: {
        color: '#000',
        fontSize: 35,
        fontFamily: 'OldWriting',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    BottomText: {
        color: '#000',
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'Content',
    },
    Center: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
    },
})

export default HistoryDetail