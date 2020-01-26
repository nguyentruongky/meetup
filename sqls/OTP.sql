-- -------------------------------------------------------------
-- TablePlus 2.12(282)
--
-- https://tableplus.com/
--
-- Database: meetup
-- Generation Time: 2020-01-27 01:05:12.6780
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "OTP_id_seq";

-- Table Definition
CREATE TABLE "public"."OTP" (
    "id" int4 NOT NULL DEFAULT nextval('"OTP_id_seq"'::regclass),
    "userId" uuid,
    "code" varchar,
    "expiredAt" float8,
    "email" varchar,
    PRIMARY KEY ("id")
);

