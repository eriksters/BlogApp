import getInstance from "./AppAPI";

export const getBlogPosts = async (sortBy, filters, page) => {
  const api = getInstance();

  let params;
  let response;

  if (!sortBy) {
    sortBy = "new";
  }

  params = {
    sortBy: sortBy,
    ...filters,
    page: page,
  };

  response = await api.get("/blogposts", { params });

  return response.data;
};

export const createBlogPost = async (
  title,
  description,
  content,
  thumbnailURL
) => {
  const api = getInstance();
  const data = new FormData();

  data.append("Thumbnail", {
    name: thumbnailURL.substring(thumbnailURL.lastIndexOf("/") + 1),
    type: "image/jpeg",
    uri: thumbnailURL,
  });

  data.append(
    "Data",
    JSON.stringify({
      Title: title,
      Description: description,
      Content: content,
    })
  );

  const response = await api.post("/blogposts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response.data);

  return null;
};

export const editBlogPost = async (
  id,
  title,
  description,
  content,
  thumbnailURL
) => {
  const api = getInstance();
  const data = new FormData();

  if (thumbnailURL) {
    data.append("Thumbnail", {
      name: thumbnailURL.substring(thumbnailURL.lastIndexOf("/") + 1),
      type: "image/jpeg",
      uri: thumbnailURL,
    });
  }

  data.append(
    "Data",
    JSON.stringify({
      Title: title,
      Description: description,
      Content: content,
    })
  );

  try {
    await api.put("/blogposts/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Post Saved Successfully");
  } catch (err) {
    console.error("Error Saving Post", err);
  }
};

export const deleteBlogPost = async (id) => {
  const api = getInstance();

  await api.delete("/blogposts/" + id);
};

export const likeBlogPost = async (id) => {
  const api = getInstance();

  const response = await api.post(`/blogposts/${id}/likes`);

  return response.data;
};
