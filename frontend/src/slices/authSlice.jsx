// REDUX LIB
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// SERVICE
import authService from "../services/authService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false
}

// login a user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user)

  if (data.error) {
    console.log(data.error)
    return thunkAPI.rejectWithValue(data.error)
  }

  return data
})

// logout a user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

// create a user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data = await authService.register(user)

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: state => {
      ;(state.loading = false), (state.error = false), (state.success = false)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true, 
        state.error = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false,
        state.success = true,
        state.error = null,
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false, 
        state.success = true, 
        state.error = null
        state.user = null
      })
      .addCase(register.pending, state => {
        state.loading = true, 
        state.error = false
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false,
        state.success = true,
        state.error = null,
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
