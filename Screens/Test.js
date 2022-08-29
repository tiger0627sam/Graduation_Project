import React from 'react';
import { StyleSheet, Button, ScrollView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
const Test = ({ navigation }) => {

    function ToSignUp() {
        navigation.navigate('S_SignUp')
    }

    function ToSignIn() {
        navigation.navigate('S_SignIn')
    }

    function ToStart() {
        navigation.navigate('S_StartAnalyse')
    }

    function ToCamera() {
        navigation.navigate('S_Camera')
    }

    function ToWelcome() {
        navigation.navigate('S_Welcome')
    }

    function ToHome() {
        navigation.navigate('S_Home')
    }

    function ToSuggestion() {
        navigation.navigate('S_Suggestion')
    }

    function ToSitiuationPackage() {
        navigation.navigate('S_SitiuationPackage')
    }

    function ToProductDetail() {
        navigation.navigate('S_ProductDetail')
    }

    return (
        <View style={styles.mainView} >
            <View style={styles.TopView}>
                {/* <Image source={logo}/> */}
                <Text style={styles.Heading}>暫放個可以連到各頁面的目錄</Text>
            </View>
            <ScrollView style={styles.ButtomView}>
                <Text style={styles.Heading}>
                    目錄
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
                    <TouchableOpacity style={styles.SiguInButton} onPress={ToWelcome}>
                        <Text style={styles.ButtonText}>
                            歡迎頁面
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SiguUpButton} onPress={ToStart}>
                        <Text style={styles.ButtonText}>
                            開始檢測
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SiguInButton} onPress={ToCamera}>
                        <Text style={styles.ButtonText}>
                            相機
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SiguUpButton} onPress={ToHome}>
                        <Text style={styles.ButtonText}>
                            首頁
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SiguInButton} onPress={ToSuggestion}>
                        <Text style={styles.ButtonText}>
                            妝容建議
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SiguUpButton} onPress={ToProductDetail}>
                        <Text style={styles.ButtonText}>
                            美妝單品
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.SiguInButton} onPress={ToSitiuationPackage}>
                        <Text style={styles.ButtonText}>
                            情境懶人包
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        marginTop: 40,
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
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 60
    },
    FormView: {
        flex: 1,
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
        color: '#000'
    },
    SiguInButton: {
        width: '40%',
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
        width: '40%',
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
        fontWeight: 'bold',
        fontSize: 18
    },
    SignUpText: {
        color: 'gray',
    },
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    }
})

export default Test