 select practices_players_availability.id, practices_players_availability.practice_id, practices_players_availability.team_club_player_id, practices_players_availability.availability_id

                from
                        practices_players_availability

                        join team_club_players on team_club_players.id = practices_players_availability.team_club_player_id
                        join club_players on club_players.id = team_club_players.club_player_id
                        join club_persons on club_persons.id = club_players.club_person_id
                        join families_persons on families_persons.person_id = club_persons.person_id

                        where families_persons.family_id = 10
			;

