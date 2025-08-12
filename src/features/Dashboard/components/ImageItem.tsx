import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const numColumns = 3;
const spacing = 8; // Espacio entre elementos
const imageSize = (width - spacing * (numColumns + 1)) / numColumns; // Calcula el tamaño basado en el ancho de pantalla

export interface ImageItemProps {
  uri: string;
}

const ImageItem = ({ uri }: ImageItemProps) => {
 
  const handlePress = () => {
    console.log('handlePress');
  };
  const handleLongPress = () => {
    console.log('handleLongPress');
  };

  return (
    <TouchableOpacity
      style={[styles.imageContainer]}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <Image
        source={{ uri }}
        style={[styles.image]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageCheckContainer: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    //color crema
    backgroundColor: '#f5f5f5',
    borderRadius: '100%',
  },
  imageCheck: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    margin: spacing / 2,
    padding: 8,
    elevation: 10,
    shadowColor: '#000',
    borderRadius: 8,
    borderColor: '#000',
    //quiero una sombra como que sea una tarjeta elevada
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedImage: {
    borderColor: '#007AFF',
  },
  imageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  imageSelected: {
    opacity: 0.5,
    borderColor: '#f5f5dc',

    borderWidth: 5,
  },
  startFromHereContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startFromHereText: {
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: 'blue',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    color: '#fff',
  },
});

export default ImageItem;
