
select emails_persons.id as email_person_id, emails_persons_persons.id as email_person_person_id, persons.first_name, persons.last_name from persons join emails_persons on emails_persons.person_id=persons.id left outer join emails_persons_persons on emails_persons_persons.email_person_id=emails_persons.id join emails on emails.id=emails_persons.email_id where emails.id = 1; 
