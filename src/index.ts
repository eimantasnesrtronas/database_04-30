import { serve } from "bun";
import index from "./index.html";
import { sql,SQL } from "bun";

const db = new SQL("sqlite://Duomenu_Baze.db");

//#region 
db`
CREATE TABLE IF NOT EXISTS posts (
id INTEGER AUTO_INCRIMENT PRIMARY KEY
title TEXT NOT NULL 
description TEXT NOT NULL
)
`
//#endregion
const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/post/create": {
      async POST(req) {
        
        const [post] = await db`
        INSERT INTO posts ${sql({
          title: 'value',
          description:''
        })}
        RETURNING *
        `

        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      }
    },

    "/api/posts": {
      async GET(req) {
       const posts = await db`
         SELECT * FROM posts
        `;
        return Response.json({
         posts
        })
      }
    },

    "/api/post/:id":{
      async GET(req){
        const post_id = req.params.id;

        const post = await db`
        SELECT * FROM posts 
        WHERE Firstname = eimis 
        `;
         
        return Response.json({
          message :`Mano post id: ${post_id}`,
        });
      },
      async PUT(req){
        return Response.json({
          message:"PUT POST"
        });
      },
      async DELETE(req){
        return Response.json({
          message:" DELETE POSTS"
        })
      }
    },

    

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },


    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
