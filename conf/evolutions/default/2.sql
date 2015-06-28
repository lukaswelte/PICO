# --- !Ups
ALTER TABLE entry CHANGE thumbnail_url preview_image VARCHAR(255);
ALTER TABLE entry CHANGE preview_image preview_image LONGBLOB;

# --- !Downs
ALTER TABLE entry CHANGE preview_image thumbnail_url LONGBLOB;
ALTER TABLE entry CHANGE thumbnail_url thumbnail_url VARCHAR(255);