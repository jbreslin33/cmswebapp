
select * from club_administrators;
select * from club_members;
select * from persons;

select * from clubs;


select club_administrators.id from club_administrators join club_members on club_members.id=club_administrators.club_member_id join persons on persons.id=club_members.person_id join users on users.person_id=persons.id join clubs on clubs.id=club_members.club_id where club_id = 1 and users.id = 1;

