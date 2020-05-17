		select 
			teams.id, teams.name  
	
		from 
			teams 
		where
			teams.club_id = 1;
		
		select 
                      	club_players.id as club_players_id

		from 
			club_players		

		join
			club_persons on club_persons.id=club_players.club_person_id

		join 
			persons on persons.id=club_persons.person_id

		where 
			persons.id = 25 AND club_persons.club_id = 1

		;

                select
                        club_parents.id as club_parents_id

                from
                        club_parents

                join
                        club_persons on club_persons.id=club_parents.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = 25 AND club_persons.club_id = 1

                ;


                select
                        club_coaches.id as club_coach_id

                from
                        club_coaches

                join
                        club_persons on club_persons.id=club_coaches.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = 25 AND club_persons.club_id = 1

                ;

                select
                        club_managers.id as club_managers_id

                from
                        club_managers

                join
                        club_persons on club_persons.id=club_managers.club_person_id

                join
                        persons on persons.id=club_persons.person_id

                where
                        persons.id = 25 AND club_persons.club_id = 1

                ;



		select 
                        team_club_persons.team_id as team_id,
                        team_club_persons_club_players.id as player

			from 
				team_club_persons_club_players
		join
			team_club_persons on team_club_persons.id=team_club_persons_club_players.team_club_person_id

		join    
			club_persons on club_persons.id=team_club_persons.club_person_id


		where 
			club_persons.person_id = 25 AND club_persons.club_id = 1

		;		

                select
                        team_club_persons.team_id as team_id,
                        team_club_persons_club_managers.id as manager

                        from
                                team_club_persons_club_managers
                join
                        team_club_persons on team_club_persons.id=team_club_persons_club_managers.team_club_person_id

                join
                        club_persons on club_persons.id=team_club_persons.club_person_id


                where
                        club_persons.person_id = 25 AND club_persons.club_id = 1

                ;

