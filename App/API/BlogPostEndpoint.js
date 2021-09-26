import getInstance from "./AppAPI";

export const getNewBlogPosts = async (lastPostTime, filters) => {
  const api = getInstance();

  const params = {
    sortBy: "new",
    lastPostTime: lastPostTime || Date.now(),
  };

  if (filters?.createdBy) {
    params.createdBy = filters.createdBy;
  }

  console.log(params);

  const response = await api.get("/blogposts", { params });

  return response.data.BlogPosts;
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

  return await api.post("/blogposts", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
