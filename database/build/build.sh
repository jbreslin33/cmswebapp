sudo -u postgres psql -d footballhome -f database/build/tables.sql

sudo -u postgres psql -d footballhome -f database/build/native_login.sql
sudo -u postgres psql -d footballhome -f database/build/google_login.sql
sudo -u postgres psql -d footballhome -f database/build/sign_up.sql
sudo -u postgres psql -d footballhome -f database/build/forgot_password.sql

sudo -u postgres psql -d footballhome -f database/build/procedures.sql

sudo -u postgres psql -d footballhome -f database/build/inserts.sql
sudo -u postgres psql -d footballhome -f database/build/celta.sql
