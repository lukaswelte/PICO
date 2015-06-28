# --- !Ups
ALTER TABLE user DROP password;
ALTER TABLE user ADD hashed_password VARCHAR(255) NOT NULL;
ALTER TABLE user ADD token VARCHAR(255) DEFAULT NULL;
ALTER TABLE user ADD token_created_date DATETIME DEFAULT NULL;

# --- !Downs
ALTER TABLE user DROP hashed_password;
ALTER TABLE user ADD password VARCHAR(255) NOT NULL;
ALTER TABLE user DROP token;
ALTER TABLE user DROP token_created_date;