import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define async thunk for fetching weather
export const GetWeather = createAsyncThunk(
    'weather/GetWeather',
    async (API, { rejectWithValue }) => {
        try {
            const response = await fetch(API);

            
            if (!response.ok) {
                throw new Error('City not found');
            }

            const weatherData = await response.json();
            return weatherData; 
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch weather data');
        }
    }
);

export const weatherSLice = createSlice({
    name: "weather",
    initialState: {
        weathercity: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetWeather.fulfilled, (state, action) => {
                state.weathercity = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(GetWeather.rejected, (state, action) => {
                state.loading = false;
                
                state.error = action.payload || "Failed to fetch weather data";
            });
    },
});

export default weatherSLice.reducer;
