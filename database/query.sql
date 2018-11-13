select array_to_json(array_agg(row_to_json(t)))
                        from (
                                select event_date, start_time, address from practices where event_date > now() - INTERVAL '1 days' AND event_date < NOW() + INTERVAL '7 days'
                        ) t

