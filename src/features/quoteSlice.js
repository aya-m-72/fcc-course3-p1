import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const colors = [
  "#14151c",
  "#393c49",
  "#405867",
  "#3c786d",
  "#ab2929",
  "#22a1ab",
  "#6b4aae",
  "#12ab3b",
  "#b6426b",
  "#677a00",
  "#710c25",
  "#82480c",
  "#14151c",
  "#27141f",
  "#040d3c",
  "#40bf00",
  "#850000",
  "#db4200",
  "#221a2d",
  "#604750",
]

const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

export const getData = createAsyncThunk(
  "quote/getData",
  async (_, thunkAPI) => {
    try {
      const resp = await axios(url)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong...")
    }
  }
)

const initialState = {
  isLoading: true,
  isError: "",
  allQuotes: [],
  quote: null,
  color: colors[Math.floor(Math.random() * colors.length)],
}

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    getAQuote: (state) => {
      state.quote =
        state.allQuotes.quotes[
          Math.floor(Math.random() * state.allQuotes.quotes.length)
        ]
      state.color = colors[Math.floor(Math.random() * colors.length)]
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.isLoading = true
    },
    [getData.fulfilled]: (state, action) => {
      state.isLoading = false
      state.allQuotes = action.payload
      state.quote =
        state.allQuotes.quotes[
          Math.floor(Math.random() * state.allQuotes.quotes.length)
        ]
    },
    [getData.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = action.payload
    },
  },
})

export const { getAQuote } = quoteSlice.actions
export default quoteSlice.reducer
