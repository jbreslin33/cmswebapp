
--select club_administrators.id from club_administrators join club_members on club_members.id=club_administrators.club_member_id where club_members.person_id = 1;

select clubs.id, clubs.name from clubs join club_members on club_members.club_id=clubs.id join persons on persons.id=club_members.person_id where persons.id = 1; 



