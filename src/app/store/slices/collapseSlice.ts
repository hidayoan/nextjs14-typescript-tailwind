import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

// Define a type for the slice state
interface CollapseState {
  value: boolean
}

// Define the initial state using that type
const initialState: CollapseState = {
  value: false,
}

export const collapseSlice = createSlice({
  name: 'collapse',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCollapse: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  },
})

export const { setCollapse } = collapseSlice.actions

export default collapseSlice.reducer