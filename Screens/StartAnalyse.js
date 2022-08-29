import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Logo from '../assets/Images/Logo3.png';
import LogoText from '../assets/Images/Text5.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import LogOutIcon from 'react-native-vector-icons/Feather';
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const StartAnalyse = ({ navigation, route }) => {

    function ToHome(Picture) {
        navigation.navigate('S_Home', Picture)
    }

    function ToCamera() {
        navigation.navigate('S_Camera')
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const [test, isTested] = useState(false);

    const [fontsLoaded] = useFonts({
        'Content': require('../assets/Fonts/台灣圓體-Regular.ttf'),
        'ArtFont': require('../assets/Fonts/JasonHandwriting2.ttf'),

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

    let openImagePickerAsync = async () => {
        setSelectedImage(null)
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }
        // console.log(pickerResult);
        setSelectedImage({ localUri: pickerResult.uri });
    }//選照片的function

    // const { default: axios } = require("axios");
    const FormData = require("form-data")

    //讀取圖片成base64 string
    const face_analysis = async () => {

        try {
            const DataBase64 = await FileSystem.readAsStringAsync(selectedImage.localUri, { encoding: FileSystem.EncodingType.Base64 });
            const bodyFormData = new FormData();
            //把資料放進form data
            bodyFormData.append('data', DataBase64)

            await fetch("https://graduate-project-api.herokuapp.com/face_analysis", {
                // https://graduate-project-api.herokuapp.com/face_analysis
                method: "POST",
                body: bodyFormData
            })
                .then(res => res.json())
                .then(data => { console.log(data) })

            await fetch("https://get-face-analysis-image.herokuapp.com/get", {
                method: "POST",
                body: bodyFormData
            })
                .then(res => res.text())
                .then(data => {
                    console.log(data)
                    setSelectedImage({ localUri: data });
                })
        }

        catch (err) {
            console.log(err)
        }
    }

    const pass_data = async () => {
        const DataBase64 = await FileSystem.readAsStringAsync(selectedImage.localUri, { encoding: FileSystem.EncodingType.Base64 });
        ToHome(DataBase64)
    }

    if (selectedImage !== null) {
        return (
            <View style={styles.PreviewImage} onLayout={onLayoutRootView}>
                <MyStausBar color='#FAF2F2' />
                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                />
                <TouchableOpacity style={styles.SiguInButton} onPress={pass_data}>
                    <Icon name="camera" size={26} color='#000' />
                    <Text style={styles.ButtonText} >
                        確認
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.SiguUpButton} onPress={openImagePickerAsync}>
                    <Icon name="photo" size={26} color='#000' />
                    <Text style={styles.ButtonText}>
                        重新選取
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }//照片預覽
    else {
        return (
            <View style={styles.mainView} onLayout={onLayoutRootView}>
                <MyStausBar />
                <View style={styles.TopView}>
                    <View style={styles.TopLogo}>
                        <Image source={Logo} style={styles.TopPhoto1} />
                        <Image source={LogoText} style={styles.TopPhoto2} />
                    </View>
                </View>
                <ScrollView style={styles.ButtomView}>
                    <View style={styles.FormView}>
                        <TouchableOpacity style={styles.SiguInButton} onPress={ToCamera}>
                            <Icon name="camera" size={26} color='#000' />
                            <Text style={styles.ButtonText}>
                                開始檢測
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.SiguUpButton} onPress={openImagePickerAsync}>
                            <Icon name="photo" size={26} color='#000' />
                            <Text style={styles.ButtonText}>
                                選擇照片
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.SiguInButton}>
                            <Icon name="history" size={26} color='#000' />
                            <Text style={styles.ButtonText}>
                                歷史紀錄
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
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
        height: '35%'
    },
    ButtomView: {
        width: '100%',
        height: '70%',
        backgroundColor: '#FAF2F2',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    PreviewImage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF2F2'
    },
    thumbnail: {
        width: '80%',
        aspectRatio: 1,
        resizeMode: "contain",
        borderRadius: 40,
        marginBottom: 20
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    SiguInButton: {
        width: '70%',
        color: '#000',
        height: 65,
        backgroundColor: '#D58795',
        borderRadius: 40,
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SiguUpButton: {
        width: '70%',
        color: '#D58795',
        height: 65,
        backgroundColor: '#FAF2F2',
        borderWidth: 3,
        borderColor: '#D58795',
        borderRadius: 40,
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: '#000',
        fontFamily: 'Content',
        fontSize: 24,
        marginLeft: 15,
    },
    ButtonIcon: {
        justifyContent: 'center',
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

export default StartAnalyse