
select * from users;
select * from persons;
select * from club_members;
select * from clubs;


select clubs.id, clubs.name from users join persons on persons.id=users.person_id join club_members on club_members.person_id=persons.id join club_administrators on club_administrators.club_member_id=club_members.id join clubs on clubs.id=club_members.club_id where users.id = 2; 

select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join club_administrators on club_administrators.club_member_id=club_members.id join persons on persons.id=club_members.person_id;

