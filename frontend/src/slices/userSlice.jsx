import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// SERVICES
import userService from "../services/userService"

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: false
}

// get user by id
export const getUserById = createAsyncThunk("user/profile", async id => {
  const data = await userService.getUserById(id)

  return data
})

// get user by token
export const getCurrentUser = createAsyncThunk(
  "user/userDetails",
  async thunkAPI => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.getCurrentUser(token)

    return data
  }
)

// update profile
export const updateUser = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await userService.updateUser(user, token)

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: state => {
      state.message = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserById.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
      })
      .addCase(getCurrentUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, aciton) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = aciton.payload
      })
      .addCase(updateUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload.user
        state.message = action.payload.message
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { resetMessage } = userSlice.actions
export default userSlice.reducer
