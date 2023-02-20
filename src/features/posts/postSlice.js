import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
const BASE_URL = "http://localhost:8000";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

// CRUD axios

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await axios.get(BASE_URL + "/posts");
  return res.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const res = await axios.post(BASE_URL + "/posts", newPost);
  return res.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ newPost, id }) => {
    const res = await axios.put(BASE_URL + `/posts/${id}`, newPost);
    return res.data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const res = await axios.delete(BASE_URL + `/posts/${id}`);

  if (res.status === 200) return id;
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = "Oops!Something went Wrong...";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        let count = 1;
        const posts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: count++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        postsAdapter.upsertMany(state, posts);
      })
      .addCase(addPost.fulfilled, (state, action) => {
        if (!action?.payload.date) {
          action.payload.date = new Date().toISOString();
        }
        if (!action?.payload.reactions) {
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
        }

        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const id = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const getStatus = (state) => state.posts.status;
export const getError = (state) => state.posts.error;

export default postSlice.reducer;
