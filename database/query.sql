
select club_administrators.id from club_administrators join club_members on club_members.id=club_administrators.club_member_id where club_members.person_id = 1;

