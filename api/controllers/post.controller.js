import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

// Get Posts with Filters
export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get posts" });
  }
};

// Get Single Post with Saved Status
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            id: true, 
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });

        return res.status(200).json({ ...post, isSaved: !!saved });
      });
    }

    return res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

// Add a New Post
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    return res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

// Update a Post
export const updatePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: req.body,
    });

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update post" });
  }
};

// Delete a Post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};
