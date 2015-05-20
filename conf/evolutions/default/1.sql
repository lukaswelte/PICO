# --- !Ups

create table entry (
  id                        bigint auto_increment not null,
  url                       varchar(255) not null,
  title                     varchar(255) not null,
  context                   text,
  thumbnail_url             varchar(255),
  registration_date         datetime,
  last_updated              datetime,
  user_id                   bigint,
  constraint pk_entry primary key (id))
;

create table label (
  id                        bigint auto_increment not null,
  name                      varchar(255) not null,
  user_id                   bigint,
  constraint pk_label primary key (id))
;

create table user (
  id                        bigint auto_increment not null,
  email                     varchar(255) not null,
  password                  varchar(255) not null,
  registration_date         datetime,
  last_updated              datetime,
  constraint pk_user primary key (id))
;


create table entry_label (
  entry_id                       bigint not null,
  label_id                       bigint not null,
  constraint pk_entry_label primary key (entry_id, label_id))
;
alter table entry add constraint fk_entry_user_1 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_entry_user_1 on entry (user_id);
alter table label add constraint fk_label_user_2 foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_label_user_2 on label (user_id);



alter table entry_label add constraint fk_entry_label_entry_01 foreign key (entry_id) references entry (id) on delete restrict on update restrict;

alter table entry_label add constraint fk_entry_label_label_02 foreign key (label_id) references label (id) on delete restrict on update restrict;

# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table entry;

drop table entry_label;

drop table label;

drop table user;

SET FOREIGN_KEY_CHECKS=1;

