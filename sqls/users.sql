-- -------------------------------------------------------------
-- TablePlus 2.12(282)
--
-- https://tableplus.com/
--
-- Database: meetup
-- Generation Time: 2020-01-18 13:20:28.8510
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "email" varchar,
    "password" varchar,
    "name" varchar,
    "introduction" text,
    "avatar" varchar,
    "createdAt" float8,
    "token" varchar,
    "stripeUserId" varchar,
    PRIMARY KEY ("id")
);

