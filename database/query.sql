select event_date, start_time, address from practices join teams on teams.id=practices.team_id order by event_date asc 
