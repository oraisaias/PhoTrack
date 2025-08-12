import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera, PhotoFile, useCameraPermission } from 'react-native-vision-camera';
import { useCameraDevice } from 'react-native-vision-camera';
import Result from './Result';

const CameraScreen = () => {
  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();

  const camera = useRef<Camera>(null)
  const [isResultVisible, setIsResultVisible] = useState(false)
  const [photo, setPhoto] = useState<PhotoFile | null>(null)
  console.log({ hasPermission, device });

  const takePhoto = async () => {
    if (!camera.current) return;
    const photo = await camera.current.takePhoto({
      flash: 'off',
    });
    if (photo) {
      setIsResultVisible(true)
      setPhoto(photo);
    }

  };

  if (!device) return <Text>No camera device</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          photo={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={takePhoto} />
      
      </View>
      <Result photo={photo} visible={isResultVisible} onClose={() => setIsResultVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    height: '80%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: '20%',
  },
  photo: {
    borderWidth: 1,
    borderColor: 'red',
    width: 100,
    height: 100,
  },
});
export default CameraScreen;
