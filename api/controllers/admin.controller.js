import prisma from "../lib/prisma.js";

export const getAllStats = async (req, res) => {
  try {
    const [users, posts, userList] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
        },
        orderBy: {
          createdAt: 'desc', // Optional: order latest users first
        },
        take: 50, // Optional: limit to top 50 users
      }),
    ]);

    res.status(200).json({
      message: "Data fetched!!",
      users,
      posts,
      userList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch Counts." });
  }
};


export const getAllPosts = async (req, res) => {

    const tokenUserId = req.userId;
    try {
      const userPosts = await prisma.post.findMany({
        where: { userId: tokenUserId },
      });
      const saved = await prisma.savedPost.findMany({
        where: { userId: tokenUserId },
        include: {
          post: true,
        },
      });
  
      const savedPosts = saved.map((item) => item.post);
      res.status(200).json({ userPosts, savedPosts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get profile posts!" });
    }
}