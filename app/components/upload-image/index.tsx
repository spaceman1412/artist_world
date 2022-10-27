import * as React from 'react';
import {size, color} from '@theme';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {images} from '@assets/images';
import Camera from '@assets/images/camera.svg';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';

export const UploadImage = () => {
  const [imageUri, setImageUri] = React.useState(null);

  const uploadImage = () => {
    launchImageLibrary(
      {mediaType: 'photo'},
      (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorCode) {
          return;
        }

        // we only pick one image per time.
        setImageUri(response.assets[0].uri);
      },
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: imageUri ?? images.placeholder}}
      />
      <TouchableOpacity style={styles.upload} onPress={uploadImage}>
        <Camera />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 101,
    height: 106,
  },
  image: {
    width: 99,
    height: 99,
    borderRadius: 25,
  },
  upload: {
    position: 'absolute',
    left: 67,
    top: 72,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderColor: color.palette.white,
    borderWidth: size.XXS,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
});
