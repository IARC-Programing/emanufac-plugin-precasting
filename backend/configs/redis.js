import dotenv from 'dotenv';
import { createClient } from 'redis';
dotenv.config();
console.log('Redis Server : ', process.env.REDIS_SERVER);
const client = createClient({
    url: process.env.REDIS_SERVER,
    socket: {
        tls: false,
    },
});
client.on('error', (err) => console.error('Redis Client Error', err));
export default client;
