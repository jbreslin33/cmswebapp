sudo -u postgres psql -d cms -f database/backup/drop_db.sql
sudo -u postgres dropdb cms
sudo -u postgres pg_restore -C -d postgres database/backup/backup
