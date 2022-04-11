// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import postgres from "postgres";

export default async function handler(req, res) {
  const sql = postgres({
    host                 : process.env.NEON_HOST,
    port                 : process.env.NEON_PORT,
    database             : process.env.NEON_DB,
    username             : process.env.NEON_USER,
    password             : process.env.NEON_PASS,
  });

  const result = await sql.unsafe(req.body);

  res.status(200).json(result);
}
