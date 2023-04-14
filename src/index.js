import Fastify from 'fastify'
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';
import * as multipart  from '@fastify/multipart';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "node:path";

import {routes}  from "./routes/signer.routes.js";

dotenv.config();

const __dirname =  dirname(fileURLToPath(import.meta.url)); 

const fastify = Fastify({
  logger: true
});

fastify.register(
  fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/', // optional: set a custom prefix for the URL
    cacheControl: true, // optional: enable caching with default settings
  },  
  cors,{
    origin: true,
    methods: ['GET','POST'],
    hook: 'preHandler',
  },
  multipart, 
 )

 

//Routes
routes.forEach((route) => {
  fastify.route(route); 
})

// Run the server!
const startServer =  async () => {

  await fastify.listen({ port: process.env.PORT_SERVER}, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`Server is now listening on ${address}`);
  })
}

startServer();