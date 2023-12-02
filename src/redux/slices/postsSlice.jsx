import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:8080/posts";

export const fetchPosts = createAsyncThunk("posts", async () => {
  const response = await axios.get(URL);
  const data = await response.data;

  return data;
});

export const pushPosts = createAsyncThunk("send_posts", async (posts) => {
  console.log(...posts);
  await axios.post(URL, ...posts);
});

const postsSlice = createSlice({
  name: "postslice",
  initialState: {
    posts: [],
    cached_posts: [],
    authors: [],
    lastId: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
        // adding on cached post as-well for async function later on
        state.cached_posts.push(action.payload);
      },
      prepare(id, title, content, author) {
        return {
          payload: {
            id,
            title,
            content,
            author,
          },
        };
      },
    },
    postCachedDelete: (state) => {
      state.cached_posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;

        const authors = [];
        let uniqueauthor = [];
        // Distructure of Author
        for (let author of action.payload) {
          authors.push(author.author);
        }
        // Remove to dublicate authors.
        uniqueauthor = authors
          .reduce((acc, crr) => {
            if (!acc.includes(crr)) {
              acc.push(crr);
            }
            return acc;
          }, [])
          .sort((a, b) => {
            return a.localeCompare(b);
          });
        state.authors = uniqueauthor;

        // Catch the last id
        state.lastId = Number(action.payload[action.payload.length - 1].id) + 1;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(pushPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(pushPosts.fulfilled, (state) => {
        state.status = "pushed_success";
        state.lastId++;
      })
      .addCase(pushPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Reducers
export const { postAdded, postCachedDelete } = postsSlice.actions;

// State Abstraction
export const selectAllPosts = (state) => {
  return state.postslice.posts;
};
export const selectCachedPosts = (state) => {
  return state.postslice.cached_posts;
};

export const selectStatus = (state) => {
  return state.postslice.status;
};
export const selectAuthor = (state) => {
  return state.postslice.authors;
};

export const selectLastId = (state) => {
  return state.postslice.lastId;
};

export default postsSlice.reducer;
