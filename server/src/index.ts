import 'dotenv/config';
import server from './server';
import client from './database';

server.listen(process.env.PORT, () => {
  console.log('server is running');
});


const testConnection = (async (): Promise<any> => {
  try {
        const con = await client.connect();
        // test query to insure db connection
        // const sql = "SELECT * FROM users where id=1";
        // const result = await con.query(sql);
        // console.log(result.rows)
        con.release();
        console.log("connection esablished")
      } catch (err) {
        throw new Error(`Failed to connect due to ${err}`);
      }

})();

