// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Client } from "pg";

export default async function handler(req, res) {
  const client = new Client({
    connectionString: `${process.env.PG_CONNSTRING}?sslmode=requre`
  })

  try {
    await client.connect();
  } catch(e) {
    res.status(400);
  }

  const result = await client.query(req.body);
  await client.end()

  res.status(200).json(result);
}
