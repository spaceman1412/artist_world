import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export interface ProfileState {
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: 'man' | 'woman' | 'not';
  musicInterests: string[];
  musicRoles: string[];
  gallery: string[];
  about: string;
  location: string;
  favouriteSong: string;
}

const initialState: ProfileState = {
  avatarUrl: null,
  firstName: '',
  lastName: '',
  birthDate: '',
  sex: 'man',
  musicInterests: [],
  musicRoles: [],
  gallery: [],
  about: '',
  location: '',
  favouriteSong: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateBasicInfo: (state, action: PayloadAction<Profile.BasicInfo>) => {
      const {lastName, firstName, birthDate, location} = action.payload;

      state.firstName = firstName;
      state.lastName = lastName;
      state.birthDate = birthDate;
      state.location = location;
    },
    updateSex: (state, action: PayloadAction<'man' | 'woman' | 'not'>) => {
      state.sex = action.payload;
    },
    updateMusicInterests: (state, action: PayloadAction<string[]>) => {
      state.musicInterests = action.payload;
    },
    updateMusicRoles: (state, action: PayloadAction<string[]>) => {
      state.musicRoles = action.payload;
    },
    updateGallery: (state, action: PayloadAction<string[]>) => {
      state.gallery = action.payload;
    },
    updateAbout: (state, action: PayloadAction<string>) => {
      state.about = action.payload;
    },

    updateLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    updateUserFullInfo: (state, action: PayloadAction<Profile.UserInfo>) => {
      const {
        lastName,
        firstName,
        avatarUrl,
        birthDate,
        musicInterests,
        musicRoles,
        gallery,
        sex,
        about,
        location,
        favouriteSong,
      } = action.payload;

      state.avatarUrl = avatarUrl;
      state.firstName = firstName;
      state.lastName = lastName;
      state.birthDate = birthDate;
      state.musicInterests = musicInterests;
      state.musicRoles = musicRoles;
      state.gallery = gallery;
      state.about = about;
      state.sex = sex;
      state.location = location;
      state.favouriteSong = favouriteSong;
    },
    updateDataFirebase: state => {
      const uid = auth().currentUser.uid;
      try {
        firestore()
          .collection('Users')
          .doc(uid)
          .set({
            //
            avatarUrl: state.avatarUrl,
            firstName: state.firstName,
            lastName: state.lastName,
            birthDate: state.birthDate,
            sex: state.sex,
            musicInterests: state.musicInterests,
            musicRoles: state.musicRoles,
            about: state.about,
            gallery: state.gallery,
            location: state.location,
            favouriteSong: state.favouriteSong,
          })
          .then(() => console.log('Added'));
      } catch (error) {
        console.log(error);
      }
    },
    updateInterestFirebase: state => {
      const uid = auth().currentUser.uid;
      try {
        firestore().collection('Users').doc(uid).update({
          musicInterests: state.musicInterests,
        });
      } catch {
        console.error();
      }
    },
    updateRolesFirebase: state => {
      const uid = auth().currentUser.uid;
      try {
        firestore().collection('Users').doc(uid).update({
          musicRoles: state.musicRoles,
        });
      } catch {
        console.error();
      }
    },
    updateGalleryFirebase: state => {
      const uid = auth().currentUser.uid;
      try {
        firestore()
          .collection('Users')
          .doc(uid)
          .update({
            gallery: state.gallery,
          })
          .then(() => console.log('done'));
      } catch {
        console.error();
      }
    },
    logOut: state => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const ProfileActions = profileSlice.actions;

export default profileSlice.reducer;
