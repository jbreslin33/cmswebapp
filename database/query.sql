
select persons.id, persons.first_name, persons.last_name from persons join emails_persons on emails_persons.person_id=persons.id join emails on emails.id=emails_persons.email_id where emails.id = 1;

