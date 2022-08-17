import * as actions from '../index';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const subreddit = 'reactjs';
  // Add the mockJSON response
  const mockJSON = {
    data: {
      children: [{ data: { title: 'Post 1' } }, { data: { title: 'Post 2' } }],
    },
  };

  describe('selectSubreddit', () => {
    it('should create an action with a given subreddit', () => {
      const expectedAction = {
        type: actions.SELECT_SUBREDDIT,
        subreddit,
      };
      expect(actions.selectSubreddit(subreddit)).toEqual(expectedAction);
    });
  });

  describe('receivePosts', () => {
    it('should create the expected action', () => {
      const expectedAction = {
        type: actions.RECEIVE_POSTS,
        subreddit,
        posts: actions.transformResponseBody(mockJSON),
      };
      expect(actions.receivePosts(subreddit, mockJSON)).toMatchObject(
        expectedAction
      );
    });
  });

  // describe('fetchPosts', () => {
  //   afterEach(() => {
  //     // restore fetch() to its native implementation
  //     fetchMock.restore();
  //   });

  //   it('creates REQUEST_POSTS and RECEIVE_POSTS when fetching posts', () => {
  //     // Mock the returned data when we call the Reddit API
  //     fetchMock.getOnce(`https://www.reddit.com/r/${subreddit}.json`, {
  //       body: mockJSON,
  //     });

  //     // The sequence of actions we expect to be dispatched
  //     const expectedActions = [
  //       { type: actions.REQUEST_POSTS },
  //       {
  //         type: actions.RECEIVE_POSTS,
  //         subreddit,
  //         posts: actions.transformResponseBody(mockJSON),
  //       },
  //     ];

  //     // Create a store with the provided object as the initial state
  //     const store = mockStore({});

  //     return store.dispatch(actions.fetchPostsIfNeeded(subreddit)).then(() => {
  //       expect(store.getActions()).toMatchObject(expectedActions);
  //     });
  //   });
  // });
});
