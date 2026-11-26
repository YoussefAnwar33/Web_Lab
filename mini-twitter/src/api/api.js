const MOCK_SERVER_URL = "http://localhost:3000";

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPostDetails = async (postId) => {
  try {
    const postResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}`);
    if (!postResponse.ok) {
      throw new Error("Failed to fetch post");
    }
    const postData = await postResponse.json();

    const commentsResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`);
    if (!commentsResponse.ok) {
      throw new Error("Failed to fetch comments");
    }
    const commentsData = await commentsResponse.json();

    return { post: postData, comments: commentsData };
  } catch (error) {
    console.error(error);
    return { post: null, comments: [] };
  }
};

export const createNewPost = async (newPostData) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
  } catch (error) {
    console.error(error);
  }
};

export const createNewComment = async (postId, newCommentData) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentData),
    });
    if (!response.ok) {
      throw new Error("Failed to create comment");
    }
  } catch (error) {
    console.error(error);
  }
};