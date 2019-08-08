 select team_club_persons.id from team_club_persons
        join club_persons on club_persons.id=team_club_persons.club_person_id
        where club_persons.person_id = 1;

	        select club_managers.id from club_managers
        join club_persons on club_persons.id=club_managers.club_person_id
        where club_persons.person_id = 1;


