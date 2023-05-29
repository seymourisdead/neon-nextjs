// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Client } from "pg";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return;
  } 

  const { connectionString, query } = JSON.parse(req.body);

  const client = new Client({
    connectionString: `${connectionString}?sslmode=requre`
  })

  try {
    await client.connect();
  } catch(e) {
    res.status(400);
  }

  const result = await client.query(query);
  await client.end()

  return res.status(200).json(result);
}
