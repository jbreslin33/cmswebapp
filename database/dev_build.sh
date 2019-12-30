echo ----------------------------------------------------------BUILD TABLES------------------------------------------
sudo -u postgres psql -d footballhome -f database/build.sql
echo -----------------------------------------------------------INSERTS----------------------------------------
sudo -u postgres psql -d footballhome -f database/insert.sql


