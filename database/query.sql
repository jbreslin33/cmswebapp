select * from persons;

                select distinct clubs.id, clubs.name from clubs
                join club_persons on club_persons.club_id=clubs.id
                join club_administrators on club_administrators.club_person_id=club_persons.id
                where club_persons.person_id = 27;

                select distinct clubs.id, clubs.name from clubs
                join club_persons on club_persons.club_id=clubs.id
		join team_club_persons on team_club_persons.club_person_id=club_persons.id
		join team_club_persons_club_managers on team_club_persons_club_managers.team_club_person_id=team_club_persons.id
                where club_persons.person_id = 27; 

		select * from team_club_persons_club_managers;

