import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import N_SignIn from './Screens/Signin'
import N_SignUp from './Screens/Signup'
import N_Welcome from './Screens/WelcomePage'
import N_Home from './Screens/Home'
import N_Test from './Screens/Test'
import N_Suggestion from './Screens/Suggestion'
import N_Camera from './Screens/CameraPage'
import N_StartAnalyse from './Screens/StartAnalyse'
import N_SituationPackage from './Screens/SituationPackage'
import N_ProductCatagory from './Screens/ProductCatagory'
import N_ProductDetail from './Screens/ProductDetail'
import TabIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const App: () => Node = () => {

  const SignedOut_Part = createNativeStackNavigator();
  const SignedIn_Part = createBottomTabNavigator();
  //宣告登入登出前後的Navigator

  const [isSignedIn, setIsSignedIn] = useState(false);
  // const [isPrepared, setIsPrepared] = useState(false);
  // useState區

  const signIn = (signInStatus) => {
    setIsSignedIn(signInStatus);
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false)
      }
    })
    // setIsPrepared(true)
  }, [])
  // useEffect區

  const AnalyseStack = createNativeStackNavigator();
  const AnalyseStackScreen = () => {
    return (
      <AnalyseStack.Navigator>
        <AnalyseStack.Screen name="S_StartAnalyse" component={N_StartAnalyse} options={{ headerShown: false }} />
        <AnalyseStack.Screen name="S_Camera" component={N_Camera} options={{ headerShown: false }} />
        <AnalyseStack.Screen name="S_Home" component={N_Home} options={{ headerShown: false }} />
      </AnalyseStack.Navigator>
    )
  }//第一個Bottom Tab的堆疊

  const SuggestionSetStack = createNativeStackNavigator();
  const SuggestionSetStackScreen = () => {
    return (
      <SuggestionSetStack.Navigator>
        <SuggestionSetStack.Screen name="S_Suggestion" component={N_Suggestion} options={{ headerShown: false }} />
        <SuggestionSetStack.Screen name="S_SituationPackage" component={N_SituationPackage} options={{ headerShown: false }} />
      </SuggestionSetStack.Navigator>
    )//第二個Bottom Tab的堆疊
  }

  const ProductStack = createNativeStackNavigator();
  const ProductStackScreen = () => {
    return (
      <ProductStack.Navigator>
        <ProductStack.Screen name="S_ProductCatagory" component={N_ProductCatagory} options={{ headerShown: false }} />
        <ProductStack.Screen name="S_ProductDetail" component={N_ProductDetail} options={{ headerShown: false }} />
      </ProductStack.Navigator>
    )//第三個Bottom Tab的堆疊
  }

  if (!isSignedIn) {
    return (
      <NavigationContainer>
        <SignedOut_Part.Navigator>
          <SignedOut_Part.Screen name="S_Welcome" component={N_Welcome} options={{ headerShown: false }} />
          <SignedOut_Part.Screen name="S_SignIn" initialParams={{ authenticate: signIn }} component={N_SignIn} options={{ headerShown: false }} />
          <SignedOut_Part.Screen name="S_SignUp" component={N_SignUp} options={{ headerShown: false }} />
        </SignedOut_Part.Navigator>
      </NavigationContainer>
    );//登入前會看到的畫面
  }
  else {
    return (
      <NavigationContainer>
        <SignedIn_Part.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === '臉部分析') {
                iconName = focused
                  ? 'face-recognition'
                  : 'face-recognition';
              } else if (route.name === '妝容懶人包') {
                iconName = focused
                  ? 'gift'
                  : 'gift-outline';
              }
              else if (route.name === '美妝單品') {
                iconName = focused
                  ? 'lipstick'
                  : 'lipstick';
              }
              return <TabIcon name={iconName} size={25} color={color} />;
            },
            tabBarActiveTintColor: '#D58795',
            tabBarInactiveTintColor: 'gray',
            keyboardHidesTabBar: true,
            showLabel: true,
            tabBarStyle: {
              backgroundColor: '#FAF2F2',
            },
          })}
        >
          <SignedIn_Part.Screen name="臉部分析" component={AnalyseStackScreen} options={{ headerShown: false }} />
          <SignedIn_Part.Screen name="妝容懶人包" component={SuggestionSetStackScreen} options={{ headerShown: false }} />
          <SignedIn_Part.Screen name="美妝單品" component={ProductStackScreen} options={{ headerShown: false }} />
        </SignedIn_Part.Navigator>
      </NavigationContainer>
    );//登入後會看到的畫面
  }
}

export default App;