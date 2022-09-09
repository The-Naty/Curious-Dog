import 'dotenv/config';
import server from './server';
import client from './database';

server.listen(process.env.PORT, () => {
  console.log('server is running');
});


const testConnection = (async (): Promise<any> => {
  try {
        const con = await client.connect();
        con.release();
        console.log("connection esablished")
      } catch (err) {
        throw new Error(`Failed to connect due to ${err}`);
      }

})();

