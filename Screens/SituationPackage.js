import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, Image, Dimensions, ImageBackground, ActivityIndicator, TextInput, TouchableOpacity, Linking } from 'react-native';
import Logo from '../assets/Images/Logo3.png'
import LogoText from '../assets/Images/Text5.png';
import Icon from 'react-native-vector-icons/Feather';
import FormSuccess from '../Components/FormSuccess';
import LogOutIcon from 'react-native-vector-icons/Feather';
import MyStausBar from '../Components/MyStatusBar'
import { authentication } from "../Firebase/firebase";
import { signOut } from "firebase/auth";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const SituationPackage = ({ navigation, route }) => {

    const [data_array, setData_array] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cat, setCat] = useState("lipstick");
    const Situation = route.params;

    const Product = ({ title, product, goweb, picture, money }) => (
        <View style={styles.Product_card}>
            <View style={styles.Product_image}>
                <Image source={{ uri: picture }} style={styles.Product_picture} />
            </View>
            <View style={styles.Product_text}>
                <Text style={styles.ItemText}> 品牌：{title} </Text>
                <Text style={styles.ItemText}> 產品：{product} </Text>
                <Text style={styles.ItemText}> 價錢：{money} </Text>
                <TouchableOpacity onPress={() => Linking.openURL(goweb)} style={styles.More}>
                    <Icon name="link" size={16} color='#000' />
                    <Text style={styles.ItemText}>
                        詳細內容
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {

        const get_cosmetics = async () => {
            try {
                const bodyFormData = new FormData();
                // 放入參數 set_name
                const Situation_data = route.params.pass;
                bodyFormData.append('set_name', Situation_data)
                // 放入參數 category_name
                bodyFormData.append("category_name", cat)

                await fetch("https://graduate-project-api.herokuapp.com/get-set", {
                    method: "POST",
                    body: bodyFormData
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setData_array(data)
                    })
                    .then(console.log('2652928585'))
                if (isLoading) {
                    setIsLoading(false)
                }
            }

            catch (err) {
                console.log(err.message)
            }
        }
        get_cosmetics()
    }, [isLoading])
    //不管中括號裡面放甚麼都一定會執行一次
    //中括號的參數只要改變就會再執行useEffect的東西

    const LogOut = () => {
        signOut(authentication)
            .then(() => {
                route.params.authenticate(false);
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


    return (
        <View style={styles.mainView} onLayout={onLayoutRootView}>
            <MyStausBar />
            <View style={styles.TopView}>
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
                <View style={styles.OnTheProduct}>
                    <View style={styles.ThePackage}>
                        <TouchableOpacity style={styles.Situation} >
                            <ImageBackground source={Situation.background} resizeMode="cover" style={styles.image} imageStyle={{ borderRadius: 10 }}>
                                <View style={styles.ButtonMask}>
                                    <Text style={styles.MiddleText}>{Situation.text}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ProductTab}>
                        <TouchableOpacity
                            onPress={() => {
                                setCat('lipstick')
                                setIsLoading(true)
                            }}
                            style={cat == 'lipstick' ?
                                styles.TabButtonSelect
                                :
                                styles.TabButton
                            }
                        >
                            <Text style={cat == 'lipstick' ?
                                styles.TextSelect
                                :
                                styles.Text
                            }>
                                口紅
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCat('blush')
                                setIsLoading(true)
                            }}
                            style={cat == 'blush' ?
                                styles.TabButtonSelect
                                :
                                styles.TabButton
                            }
                        >
                            <Text style={cat == 'blush' ?
                                styles.TextSelect
                                :
                                styles.Text
                            }>
                                腮紅
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCat('eyeshadow')
                                setIsLoading(true)
                            }}
                            style={cat == 'eyeshadow' ?
                                styles.TabButtonSelect
                                :
                                styles.TabButton
                            }
                        >
                            <Text style={cat == 'eyeshadow' ?
                                styles.TextSelect
                                :
                                styles.Text
                            }>
                                眼影
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.Location}>
                    <FlatList
                        numColumns={1}
                        data={data_array}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Product
                                title={item.brand_name}
                                product={item.product_name}
                                money={item.cost}
                                picture={item.image}
                                goweb={item.link}
                            />
                        )}
                    />
                </View>
            </View>
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
        justifyContent: 'space-between',
    },
    BottomView: {
        width: '100%',
        height: '87%',
        // borderTopWidth:2,
        // borderColor: "#000",
        backgroundColor: '#FAF2F2',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    ProductTab: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    ThePackage: {
        width: '100%',
        height: '13%',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    OnTheProduct: {
        width: '100%',
        height: '18%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    TabButtonSelect: {
        backgroundColor: '#FAF2F2',
        aspectRatio: 1.8,
        borderBottomWidth: 3,
        width: '30%',
        borderColor: '#D58795',
        marginBottom: 15,
    },
    TabButton: {
        backgroundColor: '#FAF2F2',
        width: '30%',
        aspectRatio: 1.8,
        marginBottom: 15,
    },
    Text: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Content',
        textAlign: 'center',

    },
    TextSelect: {
        color: '#D58795',
        fontSize: 22,
        fontFamily: 'Content',
        textAlign: 'center',
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
    Location: {
        alignItems: 'center',
        marginBottom: 120,
        justifyContent: 'flex-start',
    },
    Product_card: {
        width: Dimensions.get('window').width * 0.8,
        aspectRatio: 2,
        borderRadius: 10,
        borderColor: '#D58795',
        borderWidth: 1,
        marginTop: 30,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    Product_image: {
        flex: 1,
        marginRight: 20,

    },
    Product_picture: {
        width: Dimensions.get('window').width * 0.39,
        aspectRatio: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    Product_text: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    ItemText: {
        textAlign: 'left',
        fontFamily: 'Content',
        marginRight: 5,
        lineHeight: 25
    },
    More: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 5,

    },
    Situation: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 4.5,
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: Dimensions.get('window').width / 3,
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
        fontSize: 20,
        fontFamily: 'OldWriting',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
})

export default SituationPackage