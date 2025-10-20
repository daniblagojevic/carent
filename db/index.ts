import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";
import {config} from "dotenv";
import { ne } from "drizzle-orm";

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

export {db};