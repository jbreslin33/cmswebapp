sudo -u postgres psql -d footballhome -f database/backup/drop_db.sql
sudo -u postgres dropdb footballhome
sudo -u postgres pg_restore -C -d postgres database/backup/backup
