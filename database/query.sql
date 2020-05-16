                select
                persons.last_name as last_name,
                persons.first_name as first_name,
                persons.dob as dob,
                persons.id as person_id,
                players.id as player_id,
                parents.id as parent_id,
                coaches.id as coach_id,
                managers.id as manager_id,
                administrators.id as administrator_id

                from persons

                left join players on players.person_id=persons.id
                left join parents on parents.person_id=persons.id
                left join coaches on coaches.person_id=persons.id
                left join managers on managers.person_id=persons.id
                left join administrators on administrators.person_id=persons.id
                order by persons.last_name asc;

