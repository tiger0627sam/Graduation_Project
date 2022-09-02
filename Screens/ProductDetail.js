import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, FlatList, Text, View, Image, Dimensions, ActivityIndicator, TextInput, TouchableOpacity, Linking } from 'react-native';
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

const ProductDetail = ({ navigation, route }) => {

    const [data_array, setData_array] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const Catagory = route.params.text

    const Product = ({ number, title, product, goweb, picture, money }) => (
        <View style={styles.Product_card}>
            <View style={styles.Product_image}>
                <Image source={{ uri: picture }} style={styles.Product_picture} />
            </View>
            <View style={styles.Product_text}>
                <Text style={styles.RankText}> NO.{number} </Text>
                <Text style={styles.ItemText}> 品牌：{title} </Text>
                <Text style={styles.ItemText}> 產品：{product} </Text>
                <Text style={styles.ItemText}> 價錢：NT${money} </Text>
                <TouchableOpacity onPress={() => Linking.openURL(goweb)} style={styles.More}>
                    <Icon name="link" size={16} color='#000' />
                    <Text style={styles.ItemText}>
                        詳細內容
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const { default: axios } = require("axios");

    useEffect(() => {
        const cat = route.params.pass;
        const get_cosmetics = async () => {
            try {
                console.log(cat)
                if (isLoading) {
                    const result = await axios.get("https://graduate-project-api.herokuapp.com/get-" + cat)
                    setData_array(result.data)
                    console.log(result.data)
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
                <Text style={styles.Ranking}>
                    精選{Catagory}TOP10
                </Text>
                <View style={styles.Location}>
                    <FlatList
                        numColumns={1}
                        data={data_array}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Product
                                number={item.key}
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
        backgroundColor: '#FAF2F2',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    RankText: {
        color: '#000',
        fontSize: 24,
        fontFamily: 'OldWriting',
        textAlign: 'left',
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
        marginTop: 20,
        justifyContent: 'flex-start',
        marginBottom: 60,
    },
    Product_card: {
        width: Dimensions.get('window').width * 0.8,
        aspectRatio: 2,
        borderRadius: 10,
        borderColor: '#D58795',
        borderWidth: 1,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 20,
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
        lineHeight: 16
    },
    More: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 5,
    },
    Text: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    Ranking: {
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 30,
        fontSize: 32,
        fontFamily: 'OldWriting',
    },
})

export default ProductDetail

