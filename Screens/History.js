import React, { useState, useEffect, useCallback } from 'react';
import { LogBox, StyleSheet, ScrollView, FlatList, Text, View, ImageBackground, Image, Dimensions, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import Logo from '../assets/Images/Logo3.png'
import LogoText from '../assets/Images/Text5.png';
import LogOutIcon from 'react-native-vector-icons/Feather';
import Loading from '../Components/Loading';
import { authentication, firestore_db } from "../Firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc, increment, query, orderBy, limit } from "firebase/firestore";
import { signOut } from "firebase/auth";
import MyStausBar from '../Components/MyStatusBar'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const History = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isTested, setIsTested] = useState(false);
    const [LoadingMsg, setLoadingMsg] = useState('');
    const [userid, setUserid] = useState('');
    const [record, setRecord] = useState([]);

    LogBox.ignoreLogs(['Setting a timer']);

    const DataPreview = ({ face, eyebrow, picture, eyes }) => (
        <View style={styles.Product_card}>
            <View style={styles.Product_image}>
                <Image source={{ uri: picture }} style={styles.Product_picture} />
            </View>
            <View style={styles.Product_text}>
                <Text style={styles.ItemText}> 臉型：{face} </Text>
                <Text style={styles.ItemText}> 推薦眉型：{eyebrow} </Text>
                <Text style={styles.ItemText}> 參考明星：{eyes} </Text>
                {/* <Text style={styles.ItemText}> 時間 </Text> */}
            </View>
        </View>
    );

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
    }, [fontsLoaded]);//字體區



    useEffect(() => {
        const Record_Loading = async () => {
            const auth = getAuth();
            const uid = auth.currentUser.uid;
            setUserid(uid)
            console.log(2959558859)
            console.log(userid)
            console.log(5958859)

            const docCheck = doc(firestore_db, "UserRecord", "History", uid, '' + 1);
            const docSnap = await getDoc(docCheck);

            if (docSnap.exists()) {
                const His_Data = collection(firestore_db, "UserRecord", "History", '' + uid);
                const Data_Presnt = query(His_Data, orderBy("key"), limit(25));
                const querySnapshot = await getDocs(Data_Presnt);
                const Data_List = querySnapshot.docs.map(doc => doc.data());
                setRecord(Data_List)
                console.log(record)
                setIsTested(true)
                setIsLoading(false)
            } else {
                setIsTested(false)
                setIsLoading(false)
            }
        }
        Record_Loading()
    }, [isLoading])

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
                {isLoading == true ?
                    <Loading loadingMessage={LoadingMsg} />
                    :
                    null
                }
                {isTested == true ?
                    <View style={styles.Preview}>
                        <FlatList
                            numColumns={1}
                            data={record}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <DataPreview
                                    face={item.name}
                                    eyebrow={item.eyebrow_type}
                                    picture={item.pointedImage}
                                    eyes={item.face_example}
                                />
                            )}
                        />
                    </View>
                    :
                    <View>
                        <Text style={styles.MiddleText}>
                            您尚未使用過臉部分析
                        </Text>
                    </View>
                }
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
    Express: {
        textAlign: 'left',
        marginTop: 20,
        marginLeft: 30,
        fontSize: 30,
        fontFamily: 'OldWriting'
    },
    MiddleText: {
        color: '#000',
        fontSize: 35,
        fontFamily: 'Content',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    Center: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 15,
    },
    Preview: {
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
        width: Dimensions.get('window').width * 0.395,
        aspectRatio: 1,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    Product_text: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    ItemText: {
        textAlign: 'left',
        fontFamily: 'Content',
        marginRight: 5,
        lineHeight: 30,
    },
})

export default History