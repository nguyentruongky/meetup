-- -------------------------------------------------------------
-- TablePlus 2.12(282)
--
-- https://tableplus.com/
--
-- Database: meetup
-- Generation Time: 2020-01-18 13:21:04.5880
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."usersClubs";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."usersClubs" (
    "userId" uuid NOT NULL,
    "clubId" uuid NOT NULL,
    "joinedAt" float8 NOT NULL,
    PRIMARY KEY ("userId","clubId")
);

