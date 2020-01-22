-- -------------------------------------------------------------
-- TablePlus 2.12(282)
--
-- https://tableplus.com/
--
-- Database: meetup
-- Generation Time: 2020-01-22 10:11:38.9150
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."enrollment";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."enrollment" (
    "id" varchar NOT NULL,
    "cardId" varchar,
    "feeId" varchar,
    "userId" varchar,
    "createdAt" float8,
    "errorMessage" text,
    PRIMARY KEY ("id")
);

