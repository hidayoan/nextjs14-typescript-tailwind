import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

// Define a type for the slice state
interface DarkmodeState {
  value: boolean
}

// Define the initial state using that type
const initialState: DarkmodeState = {
  value: false,
}

export const darkmodeSlice = createSlice({
  name: 'darkmode',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDarkmode: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  },
})

export const { setDarkmode } = darkmodeSlice.actions

export const darkmodeReducer = darkmodeSlice.reducer