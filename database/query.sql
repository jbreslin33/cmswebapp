select row_to_json(t)
	from 
	(
    		select 
    		(
      			select array_to_json(array_agg(row_to_json(d)))
      			from 
			(
        			select event_date, start_time, address  
        			from practices
        			order by event_date asc
      			) d
    		) as definitions
  		from clubs
	) t
