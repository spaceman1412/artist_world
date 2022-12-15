import  firestore  from '@react-native-firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

export interface MatchState {
    matchList: string[],
    fetch: boolean,
}

const initialState : MatchState = {
    matchList: [],
    fetch: false,
}

export const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers:{
        updateMatchList:(state, action: PayloadAction<string[]>) =>{
            state.matchList = action.payload
        },
        addMatchList:(state, action: PayloadAction<string>) =>{
            state.matchList = [action.payload,...state.matchList]
        },
        updateMatchListFlag :(state, action: PayloadAction<boolean>) =>{
            state.fetch = action.payload
        },
        updateDataFirebase: state =>{
            const uid = auth().currentUser.uid.trim()
            const newid = state.matchList[0]
            try{
            const postReference = firestore().doc(`user-match/${uid}`)     // thay auth
            firestore().runTransaction(async transaction =>
                { 
                    const postSnapshot = await transaction.get(postReference)
                    if(!postSnapshot.exists)
                    {
                        transaction.set(firestore().collection('user-match').doc(uid),{
                            matches: [newid]
                        })
                    }
                    else
                    {
                        transaction.update(postReference,{
                            matches: firestore.FieldValue.arrayUnion(newid)
                        })
                    }
                })
        }catch(error){
            console.log(error)
        };
        
        },
        createNewMatchUser : () =>{
            const uid = auth().currentUser.uid.trim() 
            firestore().collection('user-match')
            .doc(uid).set({
                matches : []
            }).then(() => console.log('created'))
        },
        
        removeMatchUser :(state, action: PayloadAction<string>) =>
        {
            const removeId = action.payload;
            state.matchList = state.matchList.filter(value => value !== removeId)
            const uid = auth().currentUser.uid.trim()
            firestore()
            .collection('user-match')
            .doc(uid)
            .update({
                matches: firestore.FieldValue.arrayRemove(removeId.trim())
            }).then(() => console.log('updated'))
            .catch(console.error)
        }
    }
})

export const MatchAction = matchSlice.actions;
export default matchSlice.reducer;