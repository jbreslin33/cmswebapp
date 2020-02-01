delete from club_emails where club_id = 1;
delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = 1;
delete from club_players using club_persons where club_persons.club_id = 1;
delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = 1;
delete from club_administrators using club_persons where club_persons.club_id = 1;
delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = 1;

delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = 1;

delete from team_club_persons_club_managers using club_managers, club_persons  where club_persons.club_id = 1;


delete from team_club_persons using club_persons where club_persons.club_id = 1;
delete from club_managers using club_persons where club_persons.club_id = 1;
delete from club_persons where club_id = 1;
delete from teams where club_id = 1;
delete from pitches where club_id = 1;
delete from clubs where id = 1;

	
