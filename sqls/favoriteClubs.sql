-- -------------------------------------------------------------
-- TablePlus 2.12(282)
--
-- https://tableplus.com/
--
-- Database: meetup
-- Generation Time: 2020-01-27 01:14:12.5070
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."favoriteClubs" (
    "clubId" uuid NOT NULL,
    "userId" uuid NOT NULL,
    PRIMARY KEY ("clubId","userId")
);

