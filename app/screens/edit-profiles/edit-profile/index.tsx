import React from 'react';
import {Button, UploadImage} from '@components';
import {DropDown} from '@components';
import DateTimePicker from '@components/date-time-picker/date-time-picker';
import {TextInputCustom} from '@components/text-input/text-input';
import {color} from '@theme';
import {CommonType} from '@utils/types';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Linking,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '@store/hook';
import {ProfileActions} from '@store/profile/reducer';
import {images} from '@assets/images';
import {getSize} from '@utils/responsive';

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.whiteBackground,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: getSize.v(50),
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthdayButton: {
    backgroundColor: color.palette.wispPink,
    width: 295,
    height: 58,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  textButtonBirthday: {
    color: color.primary,
    textAlign: 'center',
    fontWeight: '700',
  },
  dropdown: {
    borderRadius: 25,
    borderColor: color.primary,
  },
  about: {
    borderWidth: 1,
    borderColor: color.primary,
    width: 295,
    height: 112,
    borderRadius: 25,
    color: color.storybookTextColor,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  labelTextCustom: {
    marginVertical: 10,
    color: color.storybookTextColor,
  },
  label: {
    marginBottom: 0,
    marginLeft: 20,
    color: color.storybookTextColor,
  },
  inputContainer: {
    marginVertical: 5,
  },
  genderLabel: {
    color: color.storybookTextColor,
    marginLeft: 25,
  },
  buttonSave: {
    width: 295,
    height: 56,
    borderRadius: 25,
    backgroundColor: color.primary,
  },
  buttonGallery: {
    width: 295,
    backgroundColor: color.palette.PrimaryWithOpacity(0.1),
    borderRadius: 25,
    height: 56,
    marginBottom: 25,
  },
  textGallery: {
    color: color.palette.PrimaryWithOpacity(0.7),
    fontWeight: '500',
    marginLeft: 10,
  },
  loadingImage: {
    width: 101,
    height: 106,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeHoler: {
    width: 99,
    height: 99,
    borderRadius: 25,
  },
});
interface Props {}
export const EditProfile: CommonType.EditProfileScreenProps<
  'editProfile',
  Props
> = ({navigation}) => {
  const genderList = [
    {
      id: '1',
      label: 'man',
    },
    {
      id: '2',
      label: 'woman',
    },
    {
      id: '3',
      label: 'not',
    },
  ];
  const {
    avatarUrl,
    firstName,
    lastName,
    sex,
    about,
    birthDate,
    musicInterests,
    musicRoles,
    gallery,
    location,
    favouriteSong: myFavourite,
  } = useAppSelector(state => state.profile);
  console.log(musicInterests);

  const [pic, setPic] = useState(avatarUrl);
  const [ufirstName, setFirstName] = useState(firstName);
  const [ulastName, setLastName] = useState(lastName);
  const [gender, setGender] = useState<'man' | 'woman' | 'not'>(sex);
  const [dateTimePicker, setDateTimePicker] = useState(false);
  const [ubirthDate, setBirthDate] = useState(birthDate);
  const [uabout, setAbout] = useState(about);
  const [loading, setLoading] = useState(false);
  const [favouriteSong, setFavouriteSong] = useState(myFavourite);
  const dispatch = useAppDispatch();

  const handleInterest = () => {
    navigation.push('editInterest', {interests: musicInterests});
  };
  const handleRoles = () => {
    navigation.navigate('editRole', {roles: musicRoles});
  };
  const handleChangeAvatar = value => {
    setPic(value);
  };
  const handleGallery = () => {
    navigation.navigate('editGallery', {gallery: gallery});
  };

  const postPic = async picture => {
    var parts = picture.split('/');
    var picRef = parts[parts.length - 1];
    const ref = storage().ref(picRef);
    await ref.putFile(picture);
    return storage()
      .ref(picRef)
      .getDownloadURL()
      .then(value => value);
  };
  console.log(pic);

  const handleSaveChange = () => {
    setLoading(true);
    const sendData = async () => {
      if (!pic.includes('https')) {
        await postPic(pic)
          .then(value => {
            console.log(value);

            dispatch(
              ProfileActions.updateUserFullInfo({
                avatarUrl: value,
                firstName: ufirstName,
                lastName: ulastName,
                birthDate: ubirthDate,
                about: uabout,
                sex: gender,
                musicInterests: musicInterests,
                musicRoles: musicRoles,
                gallery: gallery,
                location: location,
                favouriteSong: favouriteSong,
              }),
            );
            setPic(value);
          })
          .catch(console.error);
      } else {
        dispatch(
          ProfileActions.updateUserFullInfo({
            avatarUrl: pic,
            firstName: ufirstName,
            lastName: ulastName,
            birthDate: ubirthDate,
            about: uabout,
            sex: gender,
            musicInterests: musicInterests,
            musicRoles: musicRoles,
            gallery: gallery,
            location: location,
            favouriteSong: favouriteSong,
          }),
        );
      }
    };
    if (ufirstName.trim() !== '' && ulastName.trim() !== '') {
      sendData()
        .then(() => {
          dispatch(ProfileActions.updateDataFirebase());
        })
        .finally(() => {
          setLoading(false);
          navigation.goBack();
        })
        .catch(console.error);
    } else {
      Alert.alert('Warning', 'Your information should not be empty', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {pic ? (
          <UploadImage source={pic} onUpload={handleChangeAvatar} />
        ) : (
          <View style={styles.loadingImage}>
            <Image style={styles.placeHoler} source={images.placeholder} />
          </View>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.inputContainer}>
            <TextInputCustom
              value={ufirstName}
              labelStyle={styles.labelTextCustom}
              label={'FirstName'}
              icon={'account'}
              onChangeText={text => setFirstName(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInputCustom
              labelStyle={styles.labelTextCustom}
              label="LastName"
              value={ulastName}
              icon={'account'}
              onChangeText={text => setLastName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.genderLabel}>Gender</Text>
            <DropDown
              data={genderList}
              value={gender}
              onSelect={setGender}
              containerStyles={styles.dropdown}
              maxDropdownHeight={200}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>BirthDate</Text>
            <TouchableOpacity
              style={styles.birthdayButton}
              onPress={() => setDateTimePicker(true)}>
              <Text style={styles.textButtonBirthday}>{ubirthDate}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>About</Text>
            <TextInput
              multiline={true}
              onChangeText={text => setAbout(text)}
              value={uabout}
              style={styles.about}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={handleInterest}>
              <TextInputCustom
                value={musicInterests ? musicInterests.join(',') : ''}
                label="Interests"
                labelStyle={styles.labelTextCustom}
                editable={false}
                icon="music-box-multiple"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInputCustom
              labelStyle={styles.labelTextCustom}
              label="Your favourite song"
              value={favouriteSong}
              icon={'youtube'}
              onChangeText={text => {
                if (text.includes('https://')) {
                  setFavouriteSong(text);
                }
              }}
              iconClick={() => Linking.openURL('https://www.youtube.com/')}
            />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={handleRoles}>
              <TextInputCustom
                value={musicRoles ? musicRoles.join(' , ') : ''}
                label="Roles"
                labelStyle={styles.labelTextCustom}
                editable={false}
                icon="guitar-electric"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button
          style={styles.birthdayButton}
          textStyle={{color: color.palette.Blue30, fontSize: 16}}
          text={location || 'Choose Your City'}
          onPress={() => navigation.navigate('selectCity')}
        />

        <Button
          text="Your Gallery"
          style={styles.buttonGallery}
          onPress={handleGallery}>
          <Icon
            name="image-album"
            size={20}
            color={color.palette.PrimaryWithOpacity(0.7)}
          />
          <Text style={styles.textGallery}>Your Gallery</Text>
        </Button>

        <Button
          text={loading ? '...Saving' : 'Save'}
          disabled={loading}
          onPress={handleSaveChange}
          style={styles.buttonSave}
        />
      </ScrollView>

      <DateTimePicker
        visible={dateTimePicker}
        onSave={value => {
          setBirthDate(value);
          setDateTimePicker(false);
        }}
        onBackPress={() => setDateTimePicker(false)}
      />
    </>
  );
};
