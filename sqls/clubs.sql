-- -------------------------------------------------------------
-- TablePlus 2.12(282)
--
-- https://tableplus.com/
--
-- Database: meetup
-- Generation Time: 2020-01-18 13:20:19.3010
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."clubs";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."clubs"
(
    "id" uuid NOT NULL,
    "title" varchar,
    "description" text,
    "hostIds" text,
    "lat" float4,
    "long" float4,
    "locationNotes" text,
    "slotCount" int2,
    "createdAt" float8,
    "frequency" varchar,
    "coverImageUrl" text,
    PRIMARY KEY ("id")
);

