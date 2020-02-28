        FOR recI IN
                select id from club_persons where club_id = $1
        LOOP
                FOR recJ IN
                        select id from club_players where club_person_id = recI.id
                LOOP
                        FOR recK IN
                                select id from team_club_persons_club_players where club_player_id = recJ.id
                        LOOP
                                delete from practices_players_availability where team_club_persons_club_players_id = recK.id;
                        END LOOP;
                END LOOP;
        END LOOP;

