--select * from persons;

--select  persons.first_name, persons.last_name, emails_persons.id as emails_persons_id, emails_persons_persons.id as emails_persons_persons_id from persons, emails_persons_persons full outer join emails_persons on emails_persons.id=emails_persons_persons.email_person_id where emails_persons.id = 1;

select * from emails_persons join emails_persons_persons on emails_persons_persons.email_person_id=emails_persons.id;

--select emails_persons.id as email_person_id, emails_persons_persons.id as email_person_person_id, persons.first_name, persons.last_name from persons join emails_persons on emails_persons.person_id=persons.id left outer join emails_persons_persons on emails_persons_persons.email_person_id=emails_persons.id join emails on emails.id=emails_persons.email_id where emails.id = 1; 
