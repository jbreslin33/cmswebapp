select * from persons;
select * from managers;

		insert into managers (person_id) values (27) ON CONFLICT ON CONSTRAINT managers_person_id_key DO NOTHING returning id; 
