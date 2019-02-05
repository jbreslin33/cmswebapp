                        select eventos.id, evento_date, arrival_time, start_time, end_time, eventos.address, eventos.coordinates, pitches.name, field_name, teams.name, evento_types.name, availability.id, clubs.name  

                        from eventos

                        full outer join pitches on pitches.id=eventos.pitch_id
                        full outer join evento_types on evento_types.id=eventos.evento_types_id

                        full outer join eventos_players_availability on eventos_players_availability.evento_id=eventos.id
                        full outer join availability on availability.id=eventos_players_availability.availability_id

                        full outer join teams on teams.id=eventos.team_id
                        full outer join clubs on clubs.id=teams.club_id

                        full outer join team_players on team_players.team_id=teams.id
                        full outer join club_players on club_players.id=team_players.club_players_id
                        full outer join club_members on club_members.id=club_players.club_member_id
                        full outer join site_members on site_members.id=club_members.site_member_id
                        full outer join users on users.id=site_members.user_id








                        where evento_date >= now()
                        and users.username = 'l'
                        order by evento_date asc;



