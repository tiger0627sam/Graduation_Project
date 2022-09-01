import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Button, ScrollView, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Logo from '../assets/Images/Logo3.png'
import LogoText from '../assets/Images/Text5.png';
import LogOutIcon from 'react-native-vector-icons/Feather';
import { Overlay } from '@rneui/themed';
import FormSuccess from '../Components/FormSuccess';
import { authentication } from "../Firebase/firebase";
import { signOut } from "firebase/auth";
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Home = ({ navigation, route }) => {

    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dataAnalyzed, setDataAnalyzed] = useState({});
    const [faceAnalyzed, setFaceAnalyzed] = useState('');
    const [RawFace, setRawFace] = useState('');

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

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const Part_of_Face = [
        { text: '眼睛', key: '1' },
        { text: '嘴', key: '2' },
        { text: '眉毛', key: '3' },
        { text: '鼻子', key: '4' },
        { text: '臉型', key: '5' },
        { text: '下顎', key: '6' },
    ];

    const Item = ({ title, onPress }) => (
        <TouchableOpacity onPress={onPress} style={styles.PartButton}>
            <Text style={styles.Text}>{title}</Text>
        </TouchableOpacity>
    );

    const FormData = require("form-data")

    useEffect(() => {
        const test_result = route.params
        setRawFace('data:image/png;base64,' + route.params)
        const bodyFormData = new FormData();
        //把資料放進form data
        bodyFormData.append('data', test_result)
        const face_analysis = async () => {
            try {
                await fetch("https://graduate-project-api.herokuapp.com/get-faceRecommend", {
                    // https://graduate-project-api.herokuapp.com/face_analysis
                    method: "POST",
                    body: bodyFormData
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setDataAnalyzed(data)
                    })

                await fetch("https://get-face-analysis-image.herokuapp.com/get", {
                    method: "POST",
                    body: bodyFormData
                })
                    .then(res => res.text())
                    .then(data => {
                        console.log(data)
                        setFaceAnalyzed(data)
                        // setSelectedImage({ localUri: data });
                    })
                if (isLoading) {
                    setIsLoading(false)
                }
            }

            catch (err) {
                console.log(err)
                setIsLoading(false)
            }
        }
        face_analysis()
    }, [])


    return (
        <View style={styles.mainView} onLayout={onLayoutRootView}>
            <MyStausBar />
            <View style={styles.TopView}>
                <Image source={Logo} style={styles.TopLogo} />
                <Image source={LogoText} style={styles.TopLogo2} />
            </View>
            <View style={styles.LogOut}>
                <TouchableOpacity onPress={LogOut}>
                    <LogOutIcon name="log-out" size={35} color='#fff' />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.ButtomView}>
                <Text style={styles.Express}>
                    臉型分析
                </Text>
                <View style={styles.TopResult}>
                    <Image source={{ uri: RawFace }} style={styles.TopPhoto} />
                    <Image source={{ uri: faceAnalyzed }} style={styles.TopPhoto} />
                </View>
                {/* 上面放原本的照片跟分析完的點點 */}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Express}>
                        臉型說明
                    </Text>
                    <View style={styles.OtherPart}>
                        <TouchableOpacity style={styles.PartButton}>
                            <Text style={styles.ButtonText} onPress={toggleOverlay}>
                                其他部位
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Overlay overlayStyle={styles.Overlay} isVisible={visible} onBackdropPress={toggleOverlay}>
                        <View style={styles.Center}>
                            <FlatList
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: 'space-around' }}
                                data={Part_of_Face}
                                renderItem={({ item }) => (
                                    <Item title={item.text} />
                                    // onPress回傳參數然後用一個頁面顯示其他部位的測試結果
                                )}
                            />
                        </View>
                    </Overlay>
                </View>
                <View style={styles.Makeup}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: dataAnalyzed.face_example_image }} style={styles.ButtomPhoto} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.Detail}>
                            經分析後您的臉型為<Text style={styles.MarkedText}>{dataAnalyzed.name}</Text>
                            {'\n'}
                            {dataAnalyzed.face_description}
                            {'\n'}
                            {'\n'}
                            與您臉型相同的明星：<Text style={styles.MarkedText}>{dataAnalyzed.face_example}</Text>
                        </Text>
                    </View>
                </View>
                <Text style={styles.Express}>
                    推薦眉型
                </Text>
                <View style={styles.Makeup}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: dataAnalyzed.eyebrow_example_image }} style={styles.ButtomPhoto} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.Detail}>
                            推薦眉型為<Text style={styles.MarkedText}>{dataAnalyzed.eyebrow_type}</Text>
                            {'\n'}
                            {'\n'}
                            {dataAnalyzed.eyebrow_recommend}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            {isLoading == true ?
                <FormSuccess />
                :
                null
            }
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
    },
    ButtomView: {
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
    Detail: {
        textAlign: 'left',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 15,
        fontSize: 15,
        fontFamily: 'Content',
        lineHeight: 20,
    },
    MarkedText: {
        fontSize: 18,
        fontFamily: 'Content',
        color: '#930000',
        lineHeight: 20,
    },
    TopResult: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        // marginTop: 20,
    },
    TopPhoto: {
        marginTop: 20,
        marginLeft: 2,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        borderRadius: 2,
    },
    TopLogo: {
        marginTop: 15,
        height: 60,
        width: 60,
        borderRadius: 2,
    },
    TopLogo2: {
        marginTop: 20,
        height: 45,
        width: 135,
        borderRadius: 2,
    },
    LogOut: {
        marginTop: 25,
        marginRight: 10,
    },
    Express: {
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 30,
        // fontWeight: 'bold',
        flex: 2,
        fontFamily: 'OldWriting',
        borderBottomWidth: 2,
        borderColor: '#8E8E8E'
    },
    OtherPart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        borderBottomWidth: 2,
        borderColor: '#8E8E8E'

    },
    PartButton: {
        height: 30,
        width: 80,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#D58795'
    },
    Overlay: {
        height: 120,
        width: 200,
        backgroundColor: '#FAF2F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Makeup: {
        flexDirection: 'row'
    },
    ButtomPhoto: {
        marginTop: 20,
        marginLeft: 15,
        width: 130,
        height: 130,
        borderRadius: 2,
    },
    ButtonText: {
        textAlign: 'center',
    },
    FittingButton: {
        backgroundColor: '#F4C13D',
        height: 25,
        width: 40,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 15,
    },
    Text: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    Center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Home

// const face_analysis = async () => {

//     try {
//         const DataBase64 = await FileSystem.readAsStringAsync(selectedImage.localUri, { encoding: FileSystem.EncodingType.Base64 });
//         const bodyFormData = new FormData();
//         //把資料放進form data
//         bodyFormData.append('data', DataBase64)

//         // await axios.post("https://get-face-analysis-image.herokuapp.com/get",
//         //     {
//         //         bodyFormData
//         //     }, {
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //         'Accept': "application/json",
//         //     }
//         // }
//         // )
//         //     .then(res => { console.log(res.data) })

//         await fetch("https://graduate-project-api.herokuapp.com/get-faceRecommend", {
//             // https://graduate-project-api.herokuapp.com/face_analysis
//             method: "POST",
//             body: bodyFormData
//         })
//             .then(res => res.json())
//             .then(data => { console.log(data) })

//         await fetch("https://get-face-analysis-image.herokuapp.com/get", {
//             method: "POST",
//             body: bodyFormData
//         })
//             .then(res => res.text())
//             .then(data => {
//                 console.log(data)
//                 setSelectedImage({ localUri: data });
//             })
//     }

//     catch (err) {
//         console.log(err)
//     }

// }