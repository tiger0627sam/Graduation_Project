import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, ImageBackground, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import Logo from '../assets/Images/Logo3.png'
import LogoText from '../assets/Images/Text5.png';
import LogOutIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Suggestion = ({ navigation }) => {

    // const { default: axios } = require("axios");
    // const FormData = require("form-data")

    const Situation = [
        { text: '曖昧對象約會', pass: '約會', key: '1', background: require('../assets/Images/Dating.jpg'), description: '適合與心儀對象一同外出，展現美麗自信的你' },
        { text: '日常通勤快速', pass: '通勤', key: '2', background: require('../assets/Images/Commute.jpg'), description: '適合日常外出，希望快速打扮的你' },
        { text: '好友聚餐', pass: '聚餐', key: '3', background: require('../assets/Images/Meal.jpg'), description: '適合與三五好友聚餐時展現自我的你' },
        { text: '乖巧見家長', pass: '家長', key: '4', background: require('../assets/Images/Parents.jpg'), description: '適合與長輩親戚見面，在穩重中又不失氣質的你' },
        { text: '越夜越美麗', pass: '越夜', key: '5', background: require('../assets/Images/Night.jpg'), description: '適合夜貓子行程，越晚精神越好的你' },
    ];

    const Item = ({ title, data, background, content }) => (
        <View style={{ marginBottom: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('S_SituationPackage', data)} style={styles.Situation}>
                <ImageBackground source={background} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                    <View style={styles.ButtonMask}>
                        <Text style={styles.MiddleText}>{title}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <View style={styles.Center}>
                <Icon name="comment-alert" size={20} color='#D58795' style={{ marginTop: 2 }} />
                <Text style={styles.BottomText}>
                    {content}
                </Text>
            </View>
        </View>
    );

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
                    <LogOutIcon name="log-out" size={35} color='#fff' />
                </View>
            </View>
            <View style={styles.BottomView}>
                <Text style={styles.Express}>
                    場合與情境
                </Text>
                <View style={styles.Location}>
                    <FlatList
                        numColumns={1}
                        data={Situation}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Item title={item.text} background={item.background} data={item} content={item.description} />
                        )}
                    />
                </View>
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
        // borderWidth: 2,
        // borderColor: "#000",
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

export default Suggestion