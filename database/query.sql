
select * from club_administrators;
select * from club_members;
select * from persons;



select * from club_administrators join club_members on club_members.id=club_administrators.club_member_id;
