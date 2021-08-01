import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export const postStateSlice = createSlice({
    name: 'postState',
    initialState: {
        viewState: "none"

    },
    reducers: {
        increment: (state, action) => {
            state.viewState = action.payload
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
export const { increment, decrement, incrementComment, incrementByAmount } = postStateSlice.actions

export default postStateSlice.reducer