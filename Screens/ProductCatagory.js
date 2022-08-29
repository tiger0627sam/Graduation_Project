import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import Logo from '../assets/Images/Logo3.png'
import LogoText from '../assets/Images/Text5.png';
import LogOutIcon from 'react-native-vector-icons/Feather';
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ProductCatagory = ({ navigation }) => {

    const Lips = [
        { text: '口紅', key: '1', pass: 'lipstick', background: require('../assets/Images/lipstick.jpg') },
        { text: '腮紅', key: '2', pass: 'blush', background: require('../assets/Images/blush.jpg') },
        { text: '唇蜜', key: '3', pass: 'lipgloss', background: require('../assets/Images/lipgloss.jpg') },
    ];

    const Eyes = [
        { text: '眼影', key: '1', pass: 'eyeshadow', background: require('../assets/Images/eyeshadow.jpg') },
        { text: '睫毛膏', key: '2', pass: 'mascara', background: require('../assets/Images/mascara.jpg') },
        { text: '眉筆', key: '3', pass: 'eyebrow_pencil', background: require('../assets/Images/eyebrow_pencil.jpg') },
    ]

    const Based = [
        { text: '防曬', key: '1', pass: 'sun_protection', background: require('../assets/Images/sun_protection.jpg') },
        { text: '底妝', key: '2', pass: 'base_makeup', background: require('../assets/Images/base_makeup.jpg') },
        { text: '修容', key: '3', pass: 'trimming', background: require('../assets/Images/trimming.jpg') },
        { text: '打亮', key: '4', pass: 'light_up', background: require('../assets/Images/light_up.jpg') },
    ]

    const Perfume = [
        { text: '香水', key: '1', pass: 'eyeshadow', background: require('../assets/Images/lipstick.jpg') },
    ]

    const Item = ({ title, data, background }) => (
        <TouchableOpacity onPress={() => navigation.navigate('S_ProductDetail', data)} style={styles.Situation}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                <View style={styles.ButtonMask}>
                    <Text style={styles.Text}>{title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
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


    return (
        <View style={styles.mainView} onLayout={onLayoutRootView}>
            <MyStausBar />
            <View style={styles.TopView}>
                <View style={styles.Brand}>
                    <Image source={Logo} style={styles.TopLogo} />
                    <Image source={LogoText} style={styles.TopLogo2} />
                </View>
                <View style={styles.LogOut}>
                    <LogOutIcon name="log-out" size={35} color='#fff' />
                </View>
            </View>
            <ScrollView style={styles.BottomView}>
                <Text style={styles.Ranking}>
                    單品排行榜
                </Text>
                <Text style={styles.Express}>
                    唇部周邊加強
                </Text>
                <View style={styles.Location}>
                    <FlatList
                        numColumns={1}
                        // columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 15 }}
                        horizontal={true}
                        data={Lips}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Item title={item.text} background={item.background} data={item} />
                        )}
                    />
                </View>
                <Text style={styles.Express}>
                    眼部周邊加強
                </Text>
                <View style={styles.Location}>
                    <FlatList
                        numColumns={1}
                        // columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 15 }}
                        horizontal={true}
                        data={Eyes}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Item title={item.text} background={item.background} data={item} />
                        )}
                    />
                </View>
                <Text style={styles.Express}>
                    防護與打底
                </Text>
                <View style={styles.Location}>
                    <FlatList
                        numColumns={1}
                        // columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 15 }}
                        horizontal={true}
                        data={Based}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Item title={item.text} background={item.background} data={item} />
                        )}
                    />
                </View>
                {/* <View style={styles.Location}>
                    <FlatList
                        numColumns={1}
                        // columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 15 }}
                        horizontal={true}
                        data={Perfume}
                        renderItem={({ item }) => (
                            <Item title={item.text} background={item.background} data={item} />
                        )}
                    />
                </View> */}
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
        height: '13%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    BottomView: {
        width: '100%',
        height: '87%',
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
    Ranking: {
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 30,
        fontSize: 36,
        fontFamily: 'OldWriting',
    },
    Express: {
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 15,
        fontSize: 28,
        fontFamily: 'Content',
        borderBottomWidth: 2,
        borderColor: '#8E8E8E'
    },
    Location: {
        alignItems: 'center',
        marginTop: 20,
        justifyContent: "space-around",

    },
    Situation: {
        width: Dimensions.get('window').width / 2.75,
        height: Dimensions.get('window').width / 3.25,
        borderRadius: 10,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15,
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: Dimensions.get('window').width / 2.75,
        borderRadius: 10,
    },
    ButtonMask: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: 10,
    },
    Text: {
        color: '#000',
        fontSize: 25,
        fontFamily: 'OldWriting',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    }
})

export default ProductCatagory