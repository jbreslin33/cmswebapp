
select persons.id, first_name, last_name from persons join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1
union
select persons.id, first_name, last_name from persons join emails_persons_persons on emails_persons_persons.person_id=persons.id where emails_persons_persons.email_person_id = 1;

select persons.id, first_name, last_name from persons join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 2 
union
select persons.id, first_name, last_name from persons join emails_persons_persons on emails_persons_persons.person_id=persons.id where emails_persons_persons.email_person_id = 2;
