-- -------------------------------------------------------------
-- TablePlus 2.12(282)
--
-- https://tableplus.com/
--
-- Database: meetup
-- Generation Time: 2020-01-18 13:20:09.5160
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."clubFees";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."clubFees" (
    "id" uuid NOT NULL,
    "clubId" uuid,
    "amount" float4,
    "currency" varchar,
    "tierId" varchar,
    "createdAt" float8,
    "tierDescription" text,
    PRIMARY KEY ("id")
);

