import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import likeCommentRoutes from "./routes/likeComment.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/likeComment", likeCommentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get('/*', (req, res, next) => {
  fs.readFile(path.join(__dirname, "client", "dist", "index.html"), 'utf8', async (err, htmlData) => {
      if (err) {
          console.error('Error during file reading', err);
          return res.status(404).end()
      }
      // Get post info based on the request or query parameters, assuming you have a function to retrieve post info
      const postId = req.query.id;
      try {
        const post = await getPost(postId);
        if (!post) {
          console.log("Post not found");
          return res.status(404).send("Post not found");
        }

        console.log("Post found:", post); // Add this line to display the found post
        // Inject meta tags
        htmlData = htmlData.replace(
            /<title>[\s\S]*?<\/title>/,
            `<title>${post.title}</title>`
        )
        .replace(/__META_OG_TITLE__/g, post.title)
        .replace(/__META_OG_IMAGE__/g, post.image);
        return res.send(htmlData);
      } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).send("Internal Server Error");
      }
  });
});
