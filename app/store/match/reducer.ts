import firestore from '@react-native-firebase/firestore';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

export interface MatchState {
  matchList: string[];
  matchedList: string[];
  fetch: boolean;
  count: number;
}

const initialState: MatchState = {
  matchList: [],
  matchedList: [],
  fetch: false,
  count: 0,
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    updateMatchList: (state, action: PayloadAction<string[]>) => {
      state.matchList = action.payload;
    },
    addMatchList: (state, action: PayloadAction<string>) => {
      state.matchList = [action.payload, ...state.matchList];
    },
    updateMatchListFlag: (state, action: PayloadAction<boolean>) => {
      state.fetch = action.payload;
    },
    updateMatchedList: (state, action: PayloadAction<string[]>) => {
      console.log('updateing matched list');
      state.matchedList = action.payload;
    },
    updateCounters: state => {
      state.count = state.count + 1;
      console.log('state count', state.count);
    },
    updateWaitingMatchFirebase: state => {
      const uid = auth().currentUser.uid.trim();
      const newid = state.matchList[0];
      try {
        const postReference = firestore().doc(`user-match/${uid}`); // thay auth
        firestore().runTransaction(async transaction => {
          const postSnapshot = await transaction.get(postReference);
          if (!postSnapshot.exists) {
            transaction.set(firestore().collection('user-match').doc(uid), {
              waiting: [newid],
            });
          } else {
            transaction.update(postReference, {
              waiting: firestore.FieldValue.arrayUnion(newid),
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    updateMatchedMatchFirebase: state => {
      const uid = auth().currentUser.uid.trim();
      const newid = state.matchList[0];
      try {
        const postReference1 = firestore().doc(`user-match/${uid}`);
        // Them data vao currentUser
        firestore().runTransaction(async transaction => {
          const postSnapshot = await transaction.get(postReference1);
          if (!postSnapshot.exists) {
            transaction.set(firestore().collection('user-match').doc(uid), {
              matched: [newid],
            });
          } else {
            transaction.update(postReference1, {
              matched: firestore.FieldValue.arrayUnion(newid),
            });
          }
        });

        const postReference2 = firestore().doc(`user-match/${newid}`);

        // Them data vao newId

        firestore().runTransaction(async transaction => {
          const postSnapshot = await transaction.get(postReference2);
          if (!postSnapshot.exists) {
            transaction.set(firestore().collection('user-match').doc(newid), {
              matched: [uid],
            });
            transaction.update(postReference2, {
              waiting: firestore.FieldValue.arrayRemove(uid),
            });
          } else {
            transaction.update(postReference2, {
              matched: firestore.FieldValue.arrayUnion(uid),
              waiting: firestore.FieldValue.arrayRemove(uid),
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    removeMatchUser: (state, action: PayloadAction<string>) => {
      const removeId = action.payload;
      state.matchList = state.matchList.filter(value => value !== removeId);
      const uid = auth().currentUser.uid.trim();
      firestore()
        .collection('user-match')
        .doc(uid)
        .update({
          matched: firestore.FieldValue.arrayRemove(removeId.trim()),
        })
        .then(() => console.log('updated'))
        .catch(console.error);
    },
  },
});

export const MatchAction = matchSlice.actions;
export default matchSlice.reducer;
