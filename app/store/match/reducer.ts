import  firestore  from '@react-native-firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

export interface MatchState {
    matchList: string[],
}

const initialState : MatchState = {
    matchList: []
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
        
        }
    }
})

export const MatchAction = matchSlice.actions;
export default matchSlice.reducer;