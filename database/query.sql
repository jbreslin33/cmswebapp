--select * from persons;

--select  persons.first_name, persons.last_name, emails_persons.id as emails_persons_id, emails_persons_persons.id as emails_persons_persons_id from persons, emails_persons_persons full outer join emails_persons on emails_persons.id=emails_persons_persons.email_person_id where emails_persons.id = 1;

--select * from emails_persons inner left join emails_persons_persons on emails_persons_persons.email_person_id=emails_persons.id;

select * from emails_persons union select * from emails_persons_persons;

--select persons.id as person_id, emails_persons.id as email_person_id, persons.first_name, persons.last_name from emails_persons join persons on persons.id=emails_persons.person_id;
--select persons.id as person_id, emails_persons_persons.id as email_person_person_id, persons.first_name, persons.last_name from emails_persons_persons join persons on persons.id=emails_persons_persons.person_id;

select persons.id as person_id, emails_persons.id as email_person_id, persons.first_name, persons.last_name from emails_persons join persons on persons.id=emails_persons.person_id
union
select persons.id as person_id, emails_persons_persons.id as email_person_person_id, persons.first_name, persons.last_name from emails_persons_persons join persons on persons.id=emails_persons_persons.person_id;

select persons.id as person_id, emails_persons.id as email_person_id, persons.first_name, persons.last_name from emails_persons join persons on persons.id=emails_persons.person_id where emails_persons.id = 1
union
select persons.id as person_id, emails_persons_persons.id as email_person_person_id, persons.first_name, persons.last_name from emails_persons_persons join persons on persons.id=emails_persons_persons.person_id;

--select emails_persons.id as email_person_id, emails_persons_persons.id as email_person_person_id, persons.first_name, persons.last_name from persons join emails_persons on emails_persons.person_id=persons.id left outer join emails_persons_persons on emails_persons_persons.email_person_id=emails_persons.id join emails on emails.id=emails_persons.email_id where emails.id = 1; 

select * from persons full outer join emails_persons on emails_persons.person_id=persons.id full outer join emails_persons_persons on emails_persons_persons.person_id=persons.id;
