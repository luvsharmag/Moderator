// src/features/artistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { artistService } from "../../services/artistService";
// Async thunk for fetching artists
export const fetchPendingArtists = createAsyncThunk(
  "artists/fetchPendingArtists",
  async (_, thunkAPI) => {
    try {
      const data = await artistService.fetchPendingArtists();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch pending artists");
    }
  }
);
export const fetchApprovedArtists = createAsyncThunk(
  "artists/fetchApprovedArtists",
  async (_, thunkAPI) => {
    try {
      const data = await artistService.fetchApprovedArtists(); // Call your service method to fetch approved artists
      console.log(data);
      return data; // Return the fetched data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch approved artists"); // Reject with a custom error message
    }
  }
);

// Async thunk for fetching rejected artists
export const fetchRejectedArtists = createAsyncThunk(
  "artists/fetchRejectedArtists",
  async (_, thunkAPI) => {
    try {
      const data = await artistService.fetchRejectedArtists();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch rejected artists");
    }
  }
);

// Async thunk for fetching old artists
export const fetchOldArtists = createAsyncThunk(
  "artists/fetchOldArtists",
  async (_, thunkAPI) => {
    try {
      const data = await artistService.fetchOldArtists();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch old artists");
    }
  }
);
export const fetchArtists = createAsyncThunk("artists/fetchArtists", async (_, thunkAPI) => {
  try {
    const data = await artistService.getArtists();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch artists");
  }
});

// Async thunk for marking artist as reviewed
export const markArtistAsReviewed = createAsyncThunk(
  "artists/markAsReviewed",
  async (artistId, thunkAPI) => {
    try {
      const data = await artistService.markAsReviewed(artistId);
      return { artistId, data };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to mark artist as reviewed");
    }
  }
);

// Async thunk for fetching artist details
export const fetchPendingArtistDetail = createAsyncThunk(
  "artists/fetchArtistDetail",
  async (artistId, thunkAPI) => {
    try {
      const data = await artistService.getPendingArtistDetail(artistId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch artist details");
    }
  }
);

// Async thunk for updating artist status
export const updateArtistStatus = createAsyncThunk(
  "artists/updateArtistStatus",
  async ({ artistId, status }, thunkAPI) => {
    try {
      const data = await artistService.updateArtistStatus(artistId, status);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update artist status");
    }
  }
);

// Artist slice with reducers to handle state changes
const artistSlice = createSlice({
  name: "artists",
  initialState: {
    artists: [],
    artistDetail: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchArtists lifecycle
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload.data;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling markArtistAsReviewed lifecycle
      .addCase(markArtistAsReviewed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markArtistAsReviewed.fulfilled, (state, action) => {
        const { artistId } = action.payload;
        state.loading = false;
        state.artists = state.artists.map((artist) =>
          artist._id === artistId ? { ...artist, isReviewed: true } : artist
        );
      })
      .addCase(markArtistAsReviewed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling fetchArtistDetail lifecycle
      .addCase(fetchPendingArtistDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingArtistDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.artistDetail =  action.payload.data.artist;        
      })
      .addCase(fetchPendingArtistDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling updateArtistStatus lifecycle
      .addCase(updateArtistStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArtistStatus.fulfilled, (state, action) => {
        
        state.loading = false;
        state.artistDetail = action.payload.data.artist;
        // Optional: Handle any status updates as needed
      })
      .addCase(updateArtistStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchApprovedArtists.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state.error = null; // Clear previous errors
      })
      .addCase(fetchApprovedArtists.fulfilled, (state, action) => {
        console.log('Fetched approved artists:', action.payload); 
        state.loading = false; // Set loading to false when fetch is complete
        state.artists = action.payload; // Store the fetched approved artists
      })
      .addCase(fetchApprovedArtists.rejected, (state, action) => {
        state.loading = false; // Set loading to false if fetch fails
        state.error = action.payload; // Store the error message
      })

      .addCase(fetchPendingArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
      })
      .addCase(fetchPendingArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handling fetchRejectedArtists lifecycle
      .addCase(fetchRejectedArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRejectedArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
      })
      .addCase(fetchRejectedArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handling fetchOldArtists lifecycle
      .addCase(fetchOldArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOldArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.artists = action.payload;
      })
      .addCase(fetchOldArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default artistSlice.reducer;
