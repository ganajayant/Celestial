import { createClient } from 'redis';

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_SERVER,
        port: process.env.REDIS_PORT,
    }
});
client.connect();
client.on('connect', () => {
    console.log('Redis client connected');
});
export default client;