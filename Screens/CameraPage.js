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

  const face_analysis = async () => {

    try {
      const DataBase64 = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });
      // console.log('2515487159498189198')
      // console.log(DataBase64)
      const bodyFormData = new FormData();
      //把資料放進form data
      bodyFormData.append('data', DataBase64)

      // await axios.post("https://get-face-analysis-image.herokuapp.com/get",
      //     {
      //         bodyFormData
      //     }, {
      //     headers: {
      //         'Content-Type': 'application/json'
      //     }
      // }
      // )
      //     .then(res => { console.log(res.data) })
      await fetch("https://graduate-project-api.herokuapp.com/face_analysis", {
        method: "POST",
        body: bodyFormData
      })
        .then(res => res.text())
        .then(data => { console.log(data) })

      //   await fetch("https://get-face-analysis-image.herokuapp.com/get", {
      //     method: "POST",
      //     body: bodyFormData
      //   })
      //     .then(res => res.text())
      //     .then(data => { console.log(data) })
    }

    catch (err) {
      console.log(err)
    }

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