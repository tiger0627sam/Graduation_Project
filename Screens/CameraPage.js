import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, useWindowDimensions, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../Components/CameraUsedButton';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import MyStausBar from '../Components/MyStatusBar'

const CameraPage = ({ navigation, route }) => {
  const [test, isTested] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  function ToHome(Picture) {
    navigation.navigate('S_Home', Picture)
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        console.log(image);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Picture saved! 🎉');
        setImage(null);
        console.log('saved successfully');
        // route.params.analyzed(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pass_data = async () => {
    const DataBase64 = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });
    ToHome(DataBase64)
  }


  if (hasCameraPermission === false) {
    return <Text>未取得相機權限，請再試一次</Text>;
  }
  else {
    return (
      <View style={styles.mainView} >
        <MyStausBar color='#FAF2F2' />
        {!image
          ?
          (
            <Camera
              style={styles.camera}
              type={type}
              ref={cameraRef}
              flashMode={flash}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                }}
              >
                <CameraButton
                  title=""
                  icon="retweet"
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                    );
                  }}
                  color={'#fff'}
                />
                <CameraButton
                  onPress={() =>
                    setFlash(
                      flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                    )
                  }
                  icon="flash"
                  color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
                />
              </View>
            </Camera>
          )
          :
          (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
        <View>
          {image ?
            (
              <View style={styles.TopButton}>
                <CameraButton title="重新拍照" onPress={() => setImage(null)} icon="retweet" />
                <CameraButton title="確認" onPress={pass_data} icon="check" />
              </View>
            )
            :
            (
              <CameraButton title={'拍照'} icon="camera" onPress={takePicture} />
            )
          }

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF2F2',
    paddingTop: Constants.statusBarHeight,

  },
  camera: {
    aspectRatio: 3 / 4,
    borderRadius: 40,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  topControls: {
    flex: 1,
  },
  TopButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  }
})
export default CameraPage