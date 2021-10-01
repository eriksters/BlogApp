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
    lastPostTime: Date.now(),
    ...filters,
  };

  response = await api.get("/blogposts", { params });

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
