 SELECT id FROM native_logins
 WHERE email_id = 1 AND password = (CRYPT('a', password));

select * from native_logins;

select * from native_logins where password = (CRYPT('a',password));


