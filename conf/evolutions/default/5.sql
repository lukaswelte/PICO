# --- !Ups
SET FOREIGN_KEY_CHECKS=0;

alter table entry drop foreign key fk_entry_user_1;
alter table label drop foreign key fk_label_user_2;


alter table entry_label drop foreign key fk_entry_label_entry_01;
alter table entry_label drop foreign key fk_entry_label_label_02;

alter table entry add constraint fk_entry_user_1 foreign key (user_id) references user (id) on delete cascade on update restrict;
alter table label add constraint fk_label_user_2 foreign key (user_id) references user (id) on delete cascade on update restrict;

alter table entry_label add constraint fk_entry_label_entry_01 foreign key (entry_id) references entry (id) on delete cascade on update restrict;
alter table entry_label add constraint fk_entry_label_label_02 foreign key (label_id) references label (id) on delete cascade on update restrict;

SET FOREIGN_KEY_CHECKS=1;

# --- !Downs
SET FOREIGN_KEY_CHECKS=0;

alter table entry drop foreign key fk_entry_user_1;
alter table label drop foreign key fk_label_user_2;

alter table entry_label drop foreign key fk_entry_label_entry_01;
alter table entry_label drop foreign key fk_entry_label_label_02;

alter table entry add constraint fk_entry_user_1 foreign key (user_id) references user (id) on delete restrict on update restrict;
alter table label add constraint fk_label_user_2 foreign key (user_id) references user (id) on delete restrict on update restrict;

alter table entry_label add constraint fk_entry_label_entry_01 foreign key (entry_id) references entry (id) on delete restrict on update restrict;
alter table entry_label add constraint fk_entry_label_label_02 foreign key (label_id) references label (id) on delete restrict on update restrict;

SET FOREIGN_KEY_CHECKS=1;
