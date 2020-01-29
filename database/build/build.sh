sudo -u postgres psql -d footballhome -f database/build/tables.sql
sudo -u postgres psql -d footballhome -f database/build/procedures.sql
sudo -u postgres psql -d footballhome -f database/build/inserts.sql
sudo -u postgres psql -d footballhome -f database/build/celta.sql
