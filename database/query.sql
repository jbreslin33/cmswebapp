select * from players;
select * from parents;
select * from coaches;
select * from managers;
select * from administrators;

select players.id as player_id, parents.id as parent_id, coaches.id as coach_id, managers.id as manager_id, administrators.id as administrator_id from persons full outer join players on players.person_id=persons.id full outer join parents on parents.person_id=players.person_id full outer join coaches on coaches.person_id=parents.person_id full outer join managers on managers.person_id=coaches.person_id full outer join administrators on administrators.person_id=managers.person_id;

select players.id as player_id, parents.id as parent_id, coaches.id as coach_id, managers.id as manager_id, administrators.id as administrator_id from persons full outer join players on players.person_id=persons.id full outer join parents on parents.person_id=players.person_id full outer join coaches on coaches.person_id=parents.person_id full outer join managers on managers.person_id=coaches.person_id full outer join administrators on administrators.person_id=managers.person_id where persons.id = 25 OR players.person_id = 25 OR parents.person_id = 25 OR coaches.person_id = 25 OR managers.person_id = 25 OR administrators.person_id = 25;

select * from managers;


select persons.id, first_name, case when middle_name IS NULL THEN '' ELSE middle_name END, last_name, players.id as player_id, parents.id as parent_id, coaches.id as coach_id, managers.id as manager_id, administrators.id as administrator_id from persons full outer join emails_persons on emails_persons.person_id=persons.id full outer join players on players.person_id=persons.id full outer join parents on parents.person_id=persons.id full outer join coaches on coaches.person_id=persons.id full outer join managers on managers.person_id=persons.id full outer join administrators on administrators.person_id=persons.id where emails_persons.email_id = 21;  

