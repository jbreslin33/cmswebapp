--warmup ,global integraged, global structure, return to calmness
--***************************************************************
--******************  DROP TABLES *************************
--**************************************************************
--OLD DROPS
--drop procedure p_insert_native_login(text,text,text,text,text,text,text); 
--drop procedure p_insert_google_login(text,text,text,text,text); 
--drop function f_add_club(text,text); 
--LIVE DROPS
--drop procedure triple(int);
--drop procedure p_insert_club(text,text,int); 
--drop procedure p_insert_club(text,text); 

--PROCEDURE DROPS
drop procedure p_insert_google_login(text,text,text,text,text,int); 
drop procedure p_update_google_login(text,text,text,text,text,int); 

drop procedure p_insert_native_login(text,text,text,text,text,text,text,int); 

drop procedure p_insert_club(text,text,int,int); 

--FUNCTION DROPS
drop function f_get_email_id(text); 
drop function f_get_native_email_id(text); 
drop function f_get_google_email_id(text); 

drop function f_native_login(text,text); 
drop function f_google_login(text,text,text,text,text); 

drop function f_insert_native_login(text,text,text,text,text,text,text); 

drop function f_insert_club(text,text,int); 



--TABLE DROPS
DROP TABLE error_log CASCADE; 

DROP TABLE sessions_media CASCADE; 
DROP TABLE media CASCADE; 

DROP TABLE genders_sessions CASCADE;
DROP TABLE formations_sessions CASCADE;
DROP TABLE ages_sessions CASCADE;
DROP TABLE levels_sessions CASCADE;
DROP TABLE possesions_sessions CASCADE;
DROP TABLE zones_sessions CASCADE;

DROP TABLE genders CASCADE;
DROP TABLE ages CASCADE;
DROP TABLE levels CASCADE;
DROP TABLE possessions CASCADE;
DROP TABLE zones CASCADE;
DROP TABLE formations CASCADE;

--ORDER SYSTEM
DROP TABLE order_items CASCADE;
DROP TABLE orders CASCADE;

DROP TABLE product_pricing CASCADE;

DROP TABLE product_types_products CASCADE;
DROP TABLE product_discount CASCADE;
DROP TABLE product_type_discount CASCADE;
DROP TABLE product_types CASCADE;


DROP TABLE products CASCADE;
DROP TABLE discount_units CASCADE;

--EVENTS
DROP TABLE eventos_players_attendance CASCADE;
DROP TABLE eventos_players_availability CASCADE;


DROP TABLE eventos_sessions CASCADE;
DROP TABLE sessions CASCADE;

--PERSON RELATIONSHIPS
--drop table parent_child cascade; --let the person choose sex
--drop table siblings cascade;  -- if you add a grace a daughter then it automatically makes grace and luke siblings as it checks father_daughter table and father_son table and then if there is no current sibling entry it makes one for luke and grace
--drop table friends cascade;


--USERS
DROP TABLE team_players CASCADE;
DROP TABLE team_coaches CASCADE;
DROP TABLE team_managers CASCADE;
DROP TABLE team_members CASCADE;

DROP TABLE club_players CASCADE;
DROP TABLE club_coaches CASCADE;
DROP TABLE club_managers CASCADE;
DROP TABLE club_administrators CASCADE;

DROP TABLE players CASCADE;
DROP TABLE coaches CASCADE;
DROP TABLE managers CASCADE;

DROP TABLE club_members CASCADE;

DROP TABLE native_logins CASCADE;
DROP TABLE google_logins CASCADE;

drop table follow_schedules cascade;
drop table persons_relationships cascade;
drop table relationships cascade;

DROP TABLE users_persons CASCADE;
DROP TABLE users CASCADE;
drop table emails cascade;
DROP TABLE persons CASCADE;

--UNIFORMS
DROP TABLE uniforms_eventos CASCADE;
DROP TABLE uniforms_order CASCADE;
DROP TABLE uniforms_sizes CASCADE;
DROP TABLE uniforms CASCADE;

--ATTENDANCE
DROP TABLE availability CASCADE;
DROP TABLE attendance CASCADE;

--EVENTOS
DROP TABLE eventos CASCADE;
DROP TABLE evento_types CASCADE;

DROP TABLE teams CASCADE;
DROP TABLE pitches CASCADE;
DROP TABLE clubs CASCADE;

--****************************************************************
--***************************************************************
--******************  POSTGRESQL SETTINGS *************************
--**************************************************************
--**************************************************************

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

drop extension pgcrypto;
create extension pgcrypto;
--****************************************************************
--***************************************************************
--******************  CREATE TABLES *************************
--**************************************************************
--**************************************************************

--==================================================================
--=========================== HELPER  ========================
--==================================================================

--ERROR_LOG
CREATE TABLE error_log
(
	id SERIAL,
    	error text,
    	error_time timestamp,
    	username text,
	PRIMARY KEY (id) 	
);

-- a club should have admins in roles table
CREATE TABLE clubs 
(
        id SERIAL,
        name text NOT NULL unique,
        address text,
        coordinates text,
	PRIMARY KEY (id)
);

CREATE TABLE pitches 
(
        id SERIAL,
        name text NOT NULL,
        club_id integer NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY(club_id) REFERENCES clubs(id)
);

--TEAM
CREATE TABLE teams 
(
        id SERIAL,
	name text,
        club_id integer,
        PRIMARY KEY (id),
        FOREIGN KEY(club_id) REFERENCES clubs(id),
	UNIQUE (name,club_id)
);

--FOR SESSIONS LATER
CREATE TABLE genders 
(
        id SERIAL,
	name text UNIQUE,
        PRIMARY KEY (id)
);


--442 433 451
CREATE TABLE formations 
(
	id SERIAL,
    	name text UNIQUE, 
	PRIMARY KEY (id)
);

--u3 u4 u19  
CREATE TABLE ages 
(
	id SERIAL,
    	name text UNIQUE, 
	PRIMARY KEY (id)
);

--a b c  
CREATE TABLE levels 
(
	id SERIAL,
    	name text UNIQUE, 
	PRIMARY KEY (id)
);

-- possessions 
CREATE TABLE possessions 
(
	id SERIAL,
    	name text UNIQUE, 
	PRIMARY KEY (id)
);

--  zones
CREATE TABLE zones 
(
	id SERIAL,
    	name text UNIQUE, 
	PRIMARY KEY (id)
);


CREATE TABLE evento_types
(
	id SERIAL,
	name text,
	PRIMARY KEY (id)
);

CREATE TABLE eventos 
(
        id SERIAL,

	--time
	evento_date date NOT NULL,
        arrival_time time, --only 1 arrival time leave it
        start_time time, --only 1 start time leave it
        end_time time,
        address text,
        coordinates text,
	pitch_id integer, --all you need for a practice	
	field_name text, --field 3, field A, 9v9 field etc if nothing in db
	team_id integer,
	evento_types_id integer,

	FOREIGN KEY (team_id) REFERENCES teams(id),
	FOREIGN KEY (pitch_id) REFERENCES pitches(id),
	FOREIGN KEY (evento_types_id) REFERENCES evento_types(id),
	PRIMARY KEY (id)
);

CREATE TABLE uniforms 
(
	id SERIAL,
    	name text UNIQUE, 
	PRIMARY KEY (id)
);

CREATE TABLE uniforms_sizes
(
	id SERIAL,
	name text, 
        PRIMARY KEY (id)
);

CREATE TABLE uniforms_order 
(
	id SERIAL,
	name text, --primary, secondary, tertiary
        PRIMARY KEY (id)
);

CREATE TABLE uniforms_eventos 
(
	id SERIAL,
	uniform_id integer,
	uniforms_order_id integer,
	evento_id integer,
        PRIMARY KEY (id),
	FOREIGN KEY (evento_id) REFERENCES eventos(id),
	FOREIGN KEY (uniform_id) REFERENCES uniforms(id),
	FOREIGN KEY (uniforms_order_id) REFERENCES uniforms_order(id)
);


CREATE TABLE sessions 
(
        id SERIAL,
	url text UNIQUE, --link
        PRIMARY KEY (id)
);

CREATE TABLE media 
(
	id SERIAL,
	name text, --pic, text, video, link
        PRIMARY KEY (id)
);


CREATE TABLE sessions_media 
(
	id SERIAL,
	sessions_id integer,
	media_id integer, --picture, text, video, link
	url text, 
	FOREIGN KEY (media_id) REFERENCES media(id),
	FOREIGN KEY (sessions_id) REFERENCES sessions(id),
        PRIMARY KEY (id)
);

CREATE TABLE eventos_sessions 
(
        id SERIAL,
        evento_id integer NOT NULL,
        session_id integer NOT NULL,
        start_time timestamp, --if you want for each session
        end_time timestamp, --if you want for efficiency
        PRIMARY KEY (id),
	FOREIGN KEY (evento_id) REFERENCES eventos(id),
	FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE TABLE availability 
(
	id SERIAL,
	name text,
        PRIMARY KEY (id)
);

CREATE TABLE attendance 
(
	id SERIAL,
	name text,
        PRIMARY KEY (id)
);

--search fields for sessions

CREATE TABLE genders_sessions 
(
        id SERIAL,
	gender_id integer,
	session_id integer,
        PRIMARY KEY (id),
        FOREIGN KEY(gender_id) REFERENCES genders(id),
        FOREIGN KEY(session_id) REFERENCES sessions(id)
);

CREATE TABLE formations_sessions 
(
        id SERIAL,
	formation_id integer,
	session_id integer,
        PRIMARY KEY (id),
        FOREIGN KEY(formation_id) REFERENCES formations(id),
        FOREIGN KEY(session_id) REFERENCES sessions(id)
);

CREATE TABLE ages_sessions 
(
        id SERIAL,
	age_id integer,
	session_id integer,
        PRIMARY KEY (id),
        FOREIGN KEY(age_id) REFERENCES ages(id),
        FOREIGN KEY(session_id) REFERENCES sessions(id)
);

CREATE TABLE levels_sessions 
(
        id SERIAL,
	level_id integer,
	session_id integer,
        PRIMARY KEY (id),
        FOREIGN KEY(level_id) REFERENCES levels(id),
        FOREIGN KEY(session_id) REFERENCES sessions(id)
);

CREATE TABLE possesions_sessions 
(
        id SERIAL,
	possession_id integer,
	session_id integer,
        PRIMARY KEY (id),
        FOREIGN KEY(possession_id) REFERENCES possessions(id),
        FOREIGN KEY(session_id) REFERENCES sessions(id)
);

CREATE TABLE zones_sessions 
(
        id SERIAL,
	zones_id integer,
	session_id integer,
        FOREIGN KEY(zones_id) REFERENCES zones(id),
        FOREIGN KEY(session_id) REFERENCES sessions(id),
        PRIMARY KEY (id)
);

CREATE TABLE persons 
(
	id SERIAL,
    	first_name text not null,
    	middle_name text,
    	last_name text not null,
    	phone text,
	address text,
	coordinates text,
	timestamp_created timestamp,
	PRIMARY KEY (id)
);

create table emails 
(
	id serial,
	email text not null unique,
	PRIMARY KEY (id)
);

CREATE TABLE users
(
        id SERIAL,
	person_id integer not null unique,
	email_id integer not null unique,
        timestamp_created timestamp,
        FOREIGN KEY(person_id) REFERENCES persons(id),
        FOREIGN KEY(email_id) REFERENCES emails(id),
        PRIMARY KEY (id)
);

CREATE TABLE users_persons
(
        id SERIAL,
	user_id integer not null unique,
	person_id integer not null unique,
        timestamp_created timestamp,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(person_id) REFERENCES persons(id),
        PRIMARY KEY (id)
);

create table relationships
(
	id serial,
	name text not null unique,
	primary key (id)
);


--person jim breslin
--relationship_person grace breslin
--relationship_id daugther

--person luke breslin 
--relationsip_person jim breslin 
--relationship_id father 

--when you add a person this should be encouraged or required to show a relationship
create table persons_relationships
(
	id serial,
	person_id integer not null,
	relationship_person_id integer not null,
	relationship_id integer not null,
        FOREIGN KEY(person_id) REFERENCES persons(id),
        FOREIGN KEY(relationship_person_id) REFERENCES persons(id),
        FOREIGN KEY(relationship_id) REFERENCES relationships(id),
	primary key (id)
);

--select id from persons where relationship_id = parent and person = male


--no permissions needed
create table follow_schedules
(
	id serial,
	person_id integer not null,
	follow_person_id integer not null,
        FOREIGN KEY(person_id) REFERENCES persons(id),
        FOREIGN KEY(follow_person_id) REFERENCES persons(id),
	unique (person_id, follow_person_id),
	primary key (id)
);

--jbreslin33@gmail.com this is if you want a login???
--some person needs to own this????
--user preferences could be placed here like see whole family etc
CREATE TABLE native_logins 
(
	id SERIAL,
    	email_id integer not null unique, --so you need atleast one email its the master email
    	password text not null,  --Iggles_13           , toy_bot_6 
	timestamp_created timestamp,
 	FOREIGN KEY(email_id) REFERENCES emails(id),
	PRIMARY KEY (id)
);

CREATE TABLE google_logins 
(
	id SERIAL,
    	email_id integer not null unique,  
    	google_id text not null unique, 
    	id_token text not null,  --big send what you have on client with all updates inserts deletes and it should match this which we update as soon as google auths us   
	timestamp_created timestamp,
 	FOREIGN KEY(email_id) REFERENCES emails(id),
	PRIMARY KEY (id)
);

--chance for email for luke or no email for grace or multiple emails for luke
--this table could we leave it and use it or not but it has nothing to do with logins???? so this would be a way for me to send luke updates to his email but he would not need a login..then once in a while we can ask him if he wants his own login???
--this was persons_emails...



--this would say Jim Breslin's family via foreign key persons_id
--person_id is the family creator
--familys are linked by people not logins
--Luke Breslin, Celta Vigo
CREATE TABLE club_members 
(
	id SERIAL,
	club_id integer,
	person_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(person_id) REFERENCES persons(id), 
        FOREIGN KEY(club_id) REFERENCES clubs(id), 
	PRIMARY KEY (id)
);

--this only gets deleted when player leaves club if you want to
--Luke Breslin is a player at Celta Vigo
CREATE TABLE players 
(
	id SERIAL,
	dob date not null,
	person_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

CREATE TABLE coaches 
(
	id SERIAL,
	person_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

CREATE TABLE managers 
(
	id SERIAL,
	person_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);


CREATE TABLE club_players 
(
	id SERIAL,
	uniform_number integer,
	club_member_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(club_member_id) REFERENCES club_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE club_coaches 
(
	id SERIAL,
	club_member_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(club_member_id) REFERENCES club_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE club_managers 
(
	id SERIAL,
	club_member_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(club_member_id) REFERENCES club_members(id),
	PRIMARY KEY (id)
);
--so add club will auto pop you in this table then you can add other club members into this
CREATE TABLE club_administrators 
(
	id SERIAL,
	club_member_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(club_member_id) REFERENCES club_members(id),
	PRIMARY KEY (id)
);

--this gets deleted if player goes from a team to b team within club
--Luke Breslin is a player for U15 Boys (which we know is part of Celta Vigo because teams table has fk club_id) 

CREATE TABLE team_members 
(
	id serial,
	team_id integer,
	club_members_id integer,
	timestamp_created timestamp,
        FOREIGN KEY(club_members_id) REFERENCES club_members(id),
        FOREIGN KEY(team_id) REFERENCES teams(id),
	primary key(id)
);

CREATE TABLE team_players 
(
	id SERIAL,
	team_member_id integer not null,
	timestamp_created timestamp,
        FOREIGN KEY(team_member_id) REFERENCES team_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_coaches 
(
	id SERIAL,
	team_member_id integer not null,
	timestamp_created timestamp,
        FOREIGN KEY(team_member_id) REFERENCES team_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_managers 
(
	id SERIAL,
	team_member_id integer not null,
	timestamp_created timestamp,
        FOREIGN KEY(team_member_id) REFERENCES team_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE eventos_players_availability 
(
        id SERIAL,
        evento_id integer NOT NULL,
       	team_player_id integer NOT NULL,
	availability_id integer NOT NULL,
	notes text,
	FOREIGN KEY (evento_id) REFERENCES eventos(id),
	FOREIGN KEY (team_player_id) REFERENCES team_players(id),
	FOREIGN KEY (availability_id) REFERENCES availability(id),
        PRIMARY KEY (id)
);

CREATE TABLE eventos_players_attendance 
(
        id SERIAL,
        evento_id integer NOT NULL,
       	team_player_id integer NOT NULL,
	attendance_id integer NOT NULL,
	FOREIGN KEY (evento_id) REFERENCES eventos(id),
	FOREIGN KEY (team_player_id) REFERENCES team_players(id),
	FOREIGN KEY (attendance_id) REFERENCES attendance(id),
        PRIMARY KEY (id)
);


--magnets, shirts, fall/spring season for u15 boys, full season for u15, winter season, 
create table products 
(
        id SERIAL,
	name text,
	description text, 
        PRIMARY KEY (id)
);


create table product_pricing 
(
        id SERIAL,
	product_id text,
	base_price money,
	create_date timestamp,
	start_date timestamp, --order by create_date desc limit 1 to get just the latest price, if there is not valid price than the product is still with company in theory but not for sale currently
	end_date timestamp,
	active boolean,
        PRIMARY KEY (id)
);

create table product_types
(
        id SERIAL,
	name text,
	description text,
        PRIMARY KEY (id)
);

--teams, shirts, these are basically tags
create table product_types_products
(
        id SERIAL,
	product_type_id integer,
	product_id integer,
	FOREIGN KEY (product_type_id) REFERENCES product_types(id),
	FOREIGN KEY (product_id) REFERENCES products(id),
        PRIMARY KEY (id)
);

create table discount_units
(
	id serial,
	name text,
	primary key(id)
);

--discounts
create table product_discount
(
	id serial,
	product_id integer,
	discount_value integer,
	discount_unit_id integer,
	create_date timestamp,
	start_date timestamp,
	end_date timestamp,
	coupon_code text,
	minimum_order_value integer,
	maximum_discount_amount integer,
	is_redeem_allowed boolean,
	FOREIGN KEY (discount_unit_id) REFERENCES discount_units(id),
        PRIMARY KEY (id)
);

create table product_type_discount
(
	id serial,
	product_type_id integer,
	discount_value integer,
	discount_unit_id integer,
	create_date timestamp,
	start_date timestamp,
	end_date timestamp,
	coupon_code text,
	minimum_order_value integer,
	maximum_discount_amount integer,
	is_redeem_allowed boolean,
	FOREIGN KEY (product_type_id) REFERENCES product_types(id),
	FOREIGN KEY (discount_unit_id) REFERENCES discount_units(id),
        PRIMARY KEY (id)
);


--ORDERS
CREATE TABLE orders 
(
	id SERIAL,
	create_time timestamp,
	person_id integer,
	FOREIGN KEY (person_id) REFERENCES persons(id),
        PRIMARY KEY (id)
);

CREATE TABLE order_items
(
	id SERIAL,
	order_id integer,
	product_id integer,
	price money, --this is calced frozen in at time of order.....
	FOREIGN KEY (order_id) REFERENCES orders(id),
	FOREIGN KEY (product_id) REFERENCES products(id),
        PRIMARY KEY (id)
);

--EMAIL

CREATE OR REPLACE FUNCTION f_get_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
BEGIN
        SELECT id INTO found_email_id FROM emails
        WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;

--NATIVE INSERT LOGIN

CREATE OR REPLACE FUNCTION f_insert_native_login(email_name TEXT, password TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, phone TEXT, address TEXT)
RETURNS text AS $$
DECLARE
	found_email emails.email%TYPE;
	return_code text;
	DECLARE x int := -111; --for bad insert attempt
BEGIN
    	SELECT email INTO found_email FROM emails WHERE email = email_name;
	IF FOUND THEN
		return_code = '-101';
	ELSE
		CALL p_insert_native_login($1,$2,$3,$4,$5,$6,$7,x);
		return_code = x;
	END IF;
RETURN return_code;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_native_login(email_name TEXT, password TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, phone TEXT, address TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
	returning_email_id integer;
	returning_native_login_id integer;
	returning_person_id integer;
BEGIN
	insert into emails (email) values (email_name) returning id into returning_email_id;
	insert into native_logins (email_id, password) values (returning_email_id, password) returning id into returning_native_login_id; 
	insert into persons (first_name, middle_name, last_name, phone, address) values (first_name, middle_name, last_name, phone, address) returning id into returning_person_id;
        insert into users (person_id, email_id) values (returning_person_id, returning_email_id) returning id into x;
END;
$$;

CREATE OR REPLACE FUNCTION f_get_native_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
	found_email_id native_logins.email_id%TYPE;
BEGIN
    	SELECT native_logins.email_id INTO found_email_id FROM native_logins 
	join emails on emails.id=native_logins.email_id
	WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;

--NATIVE LOGIN

CREATE OR REPLACE FUNCTION f_native_login(TEXT, TEXT)
RETURNS text AS $$
DECLARE
	found_email_id native_logins.email_id%TYPE;
	found_native_login_id native_logins.id%TYPE;
	found_user_id users.id%TYPE;
	return_code text;
BEGIN
	select into found_email_id f_get_native_email_id($1);	
	IF found_email_id THEN
        	SELECT id INTO found_native_login_id FROM native_logins 
        	WHERE email_id = found_email_id AND password = $2;
        	
		IF found_native_login_id THEN
			SELECT id INTO found_user_id FROM users
			where users.email_id = found_email_id;
                	return_code = found_user_id;
        	ELSE
                	return_code = '-105';
        	END IF;
	
	ELSE
		return_code = '-102'; 
	END IF;
RETURN return_code;
END;
$$ LANGUAGE plpgsql;

--END NATIVE


--GOOGLE

CREATE OR REPLACE FUNCTION f_get_google_email_id(email_name TEXT)
RETURNS text AS $$
DECLARE
        found_email_id google_logins.email_id%TYPE;
BEGIN
        SELECT google_logins.email_id INTO found_email_id FROM google_logins
        join emails on emails.id=google_logins.email_id
        WHERE email = email_name;
RETURN found_email_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE p_insert_google_login(email_name TEXT, google_id text, id_token TEXT, first_name TEXT, last_name TEXT, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	returning_email_id integer;
        returning_google_login_id integer;
        returning_person_id integer;
BEGIN
	insert into emails (email) values (email_name) returning id into returning_email_id;
        insert into google_logins (email_id, google_id, id_token) values (returning_email_id, google_id, id_token) returning id into returning_google_login_id;
        insert into persons (first_name, last_name) values (first_name, last_name) returning id into returning_person_id;
        insert into users (person_id, email_id) values (returning_person_id, returning_email_id) returning id into x;
END;
$$;

CREATE OR REPLACE PROCEDURE p_update_google_login(email_name TEXT, google_id text, id_token TEXT, first_name TEXT, last_name TEXT, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	returning_email_id integer;
        returning_google_login_id integer;
        returning_person_id integer;
BEGIN
	insert into emails (email) values (email_name) returning id into returning_email_id;
        insert into google_logins (email_id, google_id, id_token) values (returning_email_id, google_id, id_token) returning id into returning_google_login_id;
        insert into persons (first_name, last_name) values (first_name, last_name) returning id into returning_person_id;
        insert into users (person_id, email_id) values (returning_person_id, returning_email_id) returning id into x;
END;
$$;


CREATE OR REPLACE FUNCTION f_google_login(TEXT,TEXT,TEXT,TEXT,TEXT)
RETURNS text AS $$
DECLARE
	
        found_email_id emails.id%TYPE;
        found_google_login_id google_logins.id%TYPE;
        found_user_id users.id%TYPE;
        returning_user_id users.id%TYPE;
        found_person_id users.id%TYPE;
        
	returning_person_id integer;

        return_code text;
	DECLARE x int := -111;
BEGIN

        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN --do an update and if no person or user do an insert on them
        	SELECT id INTO found_google_login_id FROM google_logins
        	WHERE email_id = found_email_id;
		IF found_google_login_id THEN
			update google_logins set id_token = $3   
			where id = found_google_login_id; 
		ELSE
			insert into google_logins (email_id, google_id, id_token) values (found_email_id, $2, $3);
		END IF;

                SELECT id INTO found_user_id FROM users
                WHERE email_id = found_email_id;
                IF found_user_id THEN
                	SELECT person_id INTO found_person_id FROM users
			where id = found_user_id;

                        update persons set first_name = $4 , last_name = $5
			where id = found_person_id;
			return_code = found_user_user_id;
                ELSE
        		insert into persons (first_name, last_name) values ($4,$5) returning id into returning_person_id;
                        insert into users (person_id, email_id) values (returning_person_id,found_email_id) returning id into returning_user_id;
			return_code = returning_user_id;
                END IF;

        ELSE --if there is no email then logically you cannot have the other tables so do a full insert
		CALL p_insert_google_login($1,$2,$3,$4,$5,x);
		return_code = x;
	END IF;

RETURN return_code;
END;
$$ LANGUAGE plpgsql;


--ADD CLUB

CREATE OR REPLACE PROCEDURE p_insert_club(name TEXT, address TEXT, person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_club_id integer;
        returning_club_member_id integer;
BEGIN
        insert into clubs (name,address) values (name,address) returning id into returning_club_id;
        insert into club_members (club_id, person_id) values (returning_club_id, person_id) returning id into returning_club_member_id;
        insert into club_administrators (club_member_id) values (returning_club_member_id) returning id into x;
END;
$$;


CREATE OR REPLACE FUNCTION f_insert_club(TEXT, TEXT, user_id int)
RETURNS text AS $$
DECLARE
	found_person_id persons.id%TYPE;
        found_club_id clubs.id%TYPE;
        return_code text;
	DECLARE x int := -111;
BEGIN
        SELECT id INTO found_club_id FROM clubs
        WHERE name = $1;

        IF found_club_id THEN
                return_code = '-106';
       	ELSE
		select persons.id INTO found_person_id from persons 
		join users on persons.id=users.person_id
        	WHERE users.id = $3;

		CALL p_insert_club($1,$2,found_person_id,x);
		IF x > 0 THEN
			return_code = '-100';
		ELSE
			return_code = x;
		END IF;
        END IF;
RETURN return_code;
END;
$$ LANGUAGE plpgsql;


--100 no problems total authentication
--101 email exists
--102 email does not exist
--103 users exists
--104 user does not exist
--105 bad password
--106 club exists
--111 generic bad insert

