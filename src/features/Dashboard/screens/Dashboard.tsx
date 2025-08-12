import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ImageItem, { ImageItemProps } from '../components/ImageItem';
import { useNavigation } from '@react-navigation/native';

const ALBUM_NAME = 'PhoTrack';

function Dashboard() {
  const [items, setItems] = useState<ImageItemProps[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function loadPhotos() {
      try {
        // Encuentra el álbum exacto
        const albums = await CameraRoll.getAlbums({ assetType: 'Photos' });
        const album = albums.find(a => a.title === ALBUM_NAME);

        if (!album) {
          console.log(`Álbum "${ALBUM_NAME}" no encontrado`);
          return;
        }

        // Trae todas las fotos de ese álbum
        const res = await CameraRoll.getPhotos({
          first: album.count, // todas
          groupTypes: 'Album',
          groupName: album.title,
          assetType: 'Photos',
        });
        console.log({res})
        // Convierte edges a tus props
        const mapped = res.edges.map(({ node }) =>{
          console.log({node})
          return {
            uri: node.image.uri,
          }
        });

        setItems(mapped);
      } catch (error) {
        console.error('Error al cargar fotos:', error);
      }
    }

    loadPhotos();
  }, []);

  const renderItem = ({ item }: { item: ImageItemProps }) => (
    <ImageItem
      uri={item.uri}
    />
  );
  const registerNewPhoto = () => {
    navigation.navigate('Camera' as never)
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.uri}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.addButton}>
        <TouchableOpacity onPress={registerNewPhoto}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { height: 80 },
  title: { fontSize: 20, fontWeight: 'bold', color: 'black' },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { flex: 1, backgroundColor: 'white', paddingTop: 10 },
  contentContainer: { alignItems: 'center' },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    backgroundColor: 'blue',
    padding: 10,
    zIndex: 1000,
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
   
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
