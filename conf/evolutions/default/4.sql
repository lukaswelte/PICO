# --- !Ups
ALTER TABLE entry ADD public_url VARCHAR(255) DEFAULT NULL;

# --- !Downs
ALTER TABLE entry DROP public_url;