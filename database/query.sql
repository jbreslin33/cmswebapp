        delete from club_emails where club_id = 2;
        --delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = 2;
        --delete from team_club_persons_club_players join team_club_persons on team_club_persons.club_person_id join club_persons on club_persons.id=team_club_persons.club_person_id where club_persons.club_id = 2;
        --delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = 2;

	--delete from team_club_persons_club_players;	
	delete from team_club_persons_club_players ;	
	
        --delete from club_players using club_persons where club_persons.club_id = 1;
        --delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = 1;
        --delete from club_administrators using club_persons where club_persons.club_id = 1;

        --delete from team_club_persons_club_players using team_club_persons, club_persons where club_persons.club_id = 1;

        --delete from practices_players_availability using team_club_persons, club_persons where club_persons.club_id = 1;

        --delete from practices using practice, teams  where teams.club_id = 1;

        --delete from practice using teams where teams.club_id = 1;

        --delete from team_club_persons_club_administrators using team_club_persons, club_persons where club_persons.club_id = 1;
        --delete from team_club_persons_club_managers using club_managers, club_persons  where club_persons.club_id = 1;
        --delete from team_club_persons using club_persons where club_persons.club_id = 1;
        --delete from club_managers using club_persons where club_persons.club_id = 1;
        --delete from club_persons where club_id = 1;
        --delete from teams where club_id = 1;
        --delete from pitches where club_id = 1;
        --delete from clubs where id = 1 returning id into x;

