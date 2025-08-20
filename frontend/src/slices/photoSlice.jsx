// REDUX LIB
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// SERVICE
import photoServices from "../services/photoService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null
}

export const getUserPhotos = createAsyncThunk(
  "photo/userPhotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await photoServices.getUserPhotos(id)

    return data
  }
)

export const getPhotoById = createAsyncThunk(
  "photo/getPhoto",
  async (id, thunkAPI) => {
    const token = await thunkAPI.getState().auth.user.token

    const data = await photoServices.getPhotoById(id, token)

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const likePhoto = createAsyncThunk(
  "photo/like",
  async (id, thunkAPI) => {
    const token = await thunkAPI.getState().auth.user.token

    const data = await photoServices.likePhoto(id, token)

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = await thunkAPI.getState().auth.user.token

    const data = await photoServices.deletePhoto(id, token)

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const editPhoto = createAsyncThunk(
  "photo/edit",
  async (photoData, thunkAPI) => {
    const token = await thunkAPI.getState().auth.user.token

    const data = await photoServices.editPhoto(
      {
        title: photoData.title
      },
      photoData.id,
      token
    )

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const addComment = createAsyncThunk(
  "photo/addComment",
  async (photoData, thunkAPI) => {
    const token = await thunkAPI.getState().auth.user.token

    const data = await photoServices.addComment(
      {
        comment: photoData.comment
      },
      photoData.id,
      token
    )

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const insertPhoto = createAsyncThunk(
  "photo/insert",
  async (photoData, thunkAPI) => {
    const token = await thunkAPI.getState().auth.user.token

    const data = await photoServices.insertPhoto(photoData, token)

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data
  }
)

export const getAllPhotos = createAsyncThunk(
  "photo/getAll",
  async (_, thunkAPI) => {
    const data = await photoServices.getAllPhotos()

    if (data.error) {
      console.log(data.error)
      return thunkAPI.rejectWithValue(data.error)
    }

    return data.photos ? data.photos : data
  }
)

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    resetMessage: state => {
      state.message = null
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserPhotos.pending, state => {
        state.loading = true
        state.error = false
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photos = action.payload
      })
      .addCase(getPhotoById.pending, state => {
        state.loading = true
        state.error = false
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photo = action.payload
      })
      .addCase(getPhotoById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(likePhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId)
        }

        state.photos.map(photo => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId)
          }

          return photo
        })
        
        state.message = action.payload.message
      })
      .addCase(likePhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deletePhoto.pending, state => {
        state.loading = true
        state.error = false
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null

        state.photos = state.photos.filter(photo => {
          return photo._id !== action.payload.id
        })

      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.photo = null
      })
      .addCase(editPhoto.pending, state => {
        state.loading = true
        state.error = false
      })
      .addCase(editPhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null

        state.photos.map(photo => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title)
          }
          return photo
        })

        state.message = action.payload.message
      })
      .addCase(editPhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.photo = null
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null

        state.photo.comments.push(action.payload.userComment.comment)

        state.message = action.payload.message
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(insertPhoto.pending, state => {
        state.loading = true
        state.error = false
      })
      .addCase(insertPhoto.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photo = action.payload.newPhoto
        state.photos.unshift(state.photo)
      })
      .addCase(insertPhoto.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.photo = null
      })
      .addCase(getAllPhotos.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.photos = action.payload
      })
  }
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer
