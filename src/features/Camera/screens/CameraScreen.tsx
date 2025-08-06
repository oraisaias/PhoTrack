import { View, Text, StyleSheet } from "react-native";  
import { Camera, useCameraPermission } from "react-native-vision-camera";
import { useCameraDevice } from "react-native-vision-camera";

const CameraScreen = () => {

    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()

console.log({hasPermission,device})

if (!device) return <Text>No camera device</Text>
  return (
    <View style={styles.container}>
     <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
export default CameraScreen;