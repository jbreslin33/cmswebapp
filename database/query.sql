
                        select evento_date, arrival_time, start_time, end_time, eventos.address, eventos.coordinates, pitches.name, field_name, teams.name, evento_types.name, availability.id 



                        from eventos

			full outer join pitches on pitches.id=eventos.pitch_id
			full outer join evento_types on evento_types.id=eventos.evento_types_id

                        full outer join eventos_players_availability on eventos_players_availability.evento_id=eventos.id
                        full outer join availability on availability.id=eventos_players_availability.availability_id
			
			full outer join teams on teams.id=eventos.team_id

                        where evento_date >= now()
                        --and users.username = 'l'
                        order by evento_date asc;



