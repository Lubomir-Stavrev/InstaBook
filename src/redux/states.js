import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export const statesSlice = createSlice({
    name: 'states',
    initialState: {
        count: 0,
        lastCommentIndex: 0

    },
    reducers: {
        increment: (state) => {
            state.count += 1
        },
        incrementComment: (state) => {
            state.lastCommentIndex += 5
        },
        decrement: (state) => {
            state.count -= 1
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementComment, incrementByAmount } = statesSlice.actions

export default statesSlice.reducer