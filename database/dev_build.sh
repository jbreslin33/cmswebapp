echo ----------------------------------------------------------BUILD TABLES------------------------------------------
sudo -u postgres psql -d cms -f database/build.sql
echo -----------------------------------------------------------INSERTS----------------------------------------
sudo -u postgres psql -d cms -f database/insert.sql


