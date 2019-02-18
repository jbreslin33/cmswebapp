select logins.password from logins 
join emails on emails.id=logins.email_id
where emails.email = 'j@j.com';
