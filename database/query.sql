select * from players;
select * from parents;
select * from coaches;
select * from managers;
select * from administrators;

select players.id as player_id, parents.id as parent_id, coaches.id as coach_id, managers.id as manager_id, administrators.id as administrator_id from persons full outer join players on players.person_id=persons.id full outer join parents on parents.person_id=players.person_id full outer join coaches on coaches.person_id=parents.person_id full outer join managers on managers.person_id=coaches.person_id full outer join administrators on administrators.person_id=managers.person_id;

select players.id as player_id, parents.id as parent_id, coaches.id as coach_id, managers.id as manager_id, administrators.id as administrator_id from persons full outer join players on players.person_id=persons.id full outer join parents on parents.person_id=players.person_id full outer join coaches on coaches.person_id=parents.person_id full outer join managers on managers.person_id=coaches.person_id full outer join administrators on administrators.person_id=managers.person_id where persons.id = 24 OR players.person_id = 24 OR parents.person_id = 24 OR coaches.person_id = 24 OR managers.person_id = 24 OR administrators.person_id = 24;

