import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useCallback } from 'react';
import { View, Text, Image, StyleSheet, Modal, Button, Platform, Alert } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';

interface ResultProps {
  photo: PhotoFile | null;
  visible: boolean;
  onClose: () => void;
}

const Result = ({ photo, visible, onClose }: ResultProps) => {
  if (!photo) return null;

  // Asegura el prefijo file://
  const uri = photo.path.startsWith('file://') ? photo.path : `file://${photo.path}`;

  const handleRequestClose = useCallback(() => {
    // Android back button en Modal
    onClose();
  }, [onClose]);

  const savePhoto = useCallback(async () => {
    // Aquí puedes guardar en el CameraRoll / FS según tu necesidad

    try {
        const result = await CameraRoll.save(`file://${photo.path}`, {
            type: 'photo',
            album: 'PhoTrack',
        })
        console.log({result})
        Alert.alert("Photo saved")
    } catch (error) {
        console.log({error})
    }
  }, []);

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={handleRequestClose}
    >
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.photo} resizeMode="cover" />
        <Image source={{ uri: `ph://E85238E4-B317-4208-8746-E21EE69770C7/L0/001` }} style={styles.photo} resizeMode="cover" />

        {/* "" */}
        <View style={styles.actions}>
          <Button title="Close" onPress={onClose} />
          <Button title="Save" onPress={savePhoto} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // o el color que quieras para el fondo del modal
    padding: 16,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default Result;
