sudo -u postgres psql -d footballhome -f database/build/tables.sql

sudo -u postgres psql -d footballhome -f database/build/native_login.sql
sudo -u postgres psql -d footballhome -f database/build/google_login.sql
sudo -u postgres psql -d footballhome -f database/build/sign_up.sql
sudo -u postgres psql -d footballhome -f database/build/forgot_password.sql

sudo -u postgres psql -d footballhome -f database/build/choose_person.sql

sudo -u postgres psql -d footballhome -f database/build/calendar.sql

sudo -u postgres psql -d footballhome -f database/build/insert_practice.sql
sudo -u postgres psql -d footballhome -f database/build/insert_game.sql

sudo -u postgres psql -d footballhome -f database/build/insert_team.sql
sudo -u postgres psql -d footballhome -f database/build/insert_pitch.sql
sudo -u postgres psql -d footballhome -f database/build/invite_to_club.sql
sudo -u postgres psql -d footballhome -f database/build/edit_club_profile.sql

sudo -u postgres psql -d footballhome -f database/build/insert_person.sql
sudo -u postgres psql -d footballhome -f database/build/delete_person.sql


sudo -u postgres psql -d footballhome -f database/build/insert_club.sql
sudo -u postgres psql -d footballhome -f database/build/delete_club.sql


sudo -u postgres psql -d footballhome -f database/build/edit_profile.sql


sudo -u postgres psql -d footballhome -f database/build/functions.sql
sudo -u postgres psql -d footballhome -f database/build/procedures.sql
sudo -u postgres psql -d footballhome -f database/build/selects.sql

sudo -u postgres psql -d footballhome -f database/build/inserts.sql
sudo -u postgres psql -d footballhome -f database/build/celta.sql

sudo -u postgres psql -d footballhome -f database/build/delete_practice.sql
