--warmup ,global integraged, global structure, return to calmness
--***************************************************************
--******************  DROP TABLES *************************
--**************************************************************
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


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
CREATE table clubs 
(
        id SERIAL,
        name text NOT NULL unique,
        address text,
        coordinates text,
	created_at timestamp not null default now(),
	PRIMARY KEY (id)
);

CREATE TABLE pitches 
(
        id SERIAL,
        name text NOT NULL,
        club_id integer NOT NULL,
	created_at timestamp not null default now(),
        PRIMARY KEY (id),
        FOREIGN KEY(club_id) REFERENCES clubs(id)
);

--2004,2005,2006
create table birth_year
(
	id serial,
	year integer,
        primary key (id)
);


--u9,u10,u11
--also you could have a generic promote all teams or demote all teams function, as well as for individual teams.
create table ages
(
	id serial,
	name text unique,
        primary key (id)
);

--male,female
create table genders
(
	id serial,
	name text,
	primary key (id)
);

create table years
(
	id serial,
	year integer,
	primary key (id)
);

--so an administrator would create the season and then join teams to it.
create table seasons
(
	id serial,
	name text,
	club_id integer not null,	
	start_date timestamp not null,
	end_date timestamp not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(club_id) REFERENCES clubs(id),
	primary key (id)
);

--TEAM
CREATE TABLE teams 
(
        id SERIAL,
	name text,
        club_id integer,
        FOREIGN KEY(club_id) REFERENCES clubs(id),
	UNIQUE (name,club_id),
        PRIMARY KEY (id)
);


create table teams_seasons
(
        id SERIAL,
	team_id integer,
	season_id integer,
        PRIMARY KEY (id),
        FOREIGN KEY(team_id) REFERENCES teams(id),
        FOREIGN KEY(season_id) REFERENCES seasons(id)
);

--principles
create table tactical_principles
(
        id SERIAL,
	name text,
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);

create table technical_principles
(
        id SERIAL,
	name text,
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);


--season
CREATE TABLE periodizations
(
        id SERIAL,
	name text,
	url text,
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);

CREATE TABLE macrocycles
(
        id SERIAL,
	periodization_id integer,
	start_timestamp timestamp,
	end_timestamp timestamp,
	name text,
	url text,
	created_at timestamp not null default now(),
	FOREIGN KEY (periodization_id) REFERENCES periodizations(id),
        PRIMARY KEY (id)
);

CREATE TABLE mesocycles
(
        id SERIAL,
	name text,
	url text,
	start_timestamp timestamp,
	end_timestamp timestamp,
	macrocycle_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (macrocycle_id) REFERENCES macrocycles(id),
        PRIMARY KEY (id)
);


CREATE TABLE microcycles
(
        id SERIAL,
	name text,
	url text,
	start_timestamp timestamp,
	end_timestamp timestamp,
	mesocycle_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (mesocycle_id) REFERENCES mesocycles(id),
        PRIMARY KEY (id)
);

CREATE TABLE teams_periodizations 
(
	id serial,
	team_id integer,
	periodization_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (team_id) REFERENCES teams(id),
	FOREIGN KEY (periodization_id) REFERENCES periodizations(id),
        PRIMARY KEY (id)
);

CREATE TABLE practices 
(
        id SERIAL,
	event_date date,
        arrival_time time, --only 1 arrival time leave it
        start_time time, --only 1 start time leave it
        end_time time,
        address text,
        coordinates text,
	pitch_id integer, --all you need for a session	
	field_name text, --field 3, field A, 9v9 field etc if nothing in db
	team_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (pitch_id) REFERENCES pitches(id),
	FOREIGN KEY (team_id) REFERENCES teams(id),
	PRIMARY KEY (id)
);

CREATE TABLE games 
(
        id SERIAL,
	event_date date,
        arrival_time time, --only 1 arrival time leave it
        start_time time, --only 1 start time leave it
        end_time time,
        address text,
        coordinates text,
	pitch_id integer, --all you need for a session	
	field_name text, --field 3, field A, 9v9 field etc if nothing in db
	team_id integer,
	opponent text,
	created_at timestamp not null default now(),
	FOREIGN KEY (pitch_id) REFERENCES pitches(id),
	FOREIGN KEY (team_id) REFERENCES teams(id),
	PRIMARY KEY (id)
);

CREATE TABLE uniforms 
(
	id SERIAL,
    	name text UNIQUE, 
	created_at timestamp not null default now(),
	PRIMARY KEY (id)
);

CREATE TABLE uniforms_sizes
(
	id SERIAL,
	name text, 
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);

CREATE TABLE uniforms_order 
(
	id SERIAL,
	name text, --primary, secondary, tertiary
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);


CREATE TABLE media 
(
	id SERIAL,
	name text, --pic, text, video, link
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);


CREATE TABLE availability 
(
	id SERIAL,
	name text,
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);

CREATE TABLE attendance 
(
	id SERIAL,
	name text,
	created_at timestamp not null default now(),
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
	created_at timestamp not null default now(),
	PRIMARY KEY (id)
);

create table emails 
(
	id serial,
	email text not null unique,
	created_at timestamp not null default now(),
	PRIMARY KEY (id)
);

CREATE TABLE emails_persons
(
        id SERIAL,
	email_id integer not null,
	person_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(email_id) REFERENCES emails(id),
        FOREIGN KEY(person_id) REFERENCES persons(id),
	unique (email_id, person_id),
        PRIMARY KEY (id)
);

create table relationships
(
	id serial,
	name text not null unique,
	created_at timestamp not null default now(),
	primary key (id)
);


CREATE TABLE sessions 
(
        id SERIAL,
	name text,
	created_at timestamp not null default now(),
	person_id integer,	
	FOREIGN KEY (person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

create table sessions_practices
(
	id serial,
	session_id integer,
	practice_id integer,
	FOREIGN KEY (session_id) REFERENCES sessions(id),
	FOREIGN KEY (practice_id) REFERENCES practices(id),
	unique (session_id, practice_id),
	primary key (id)

);

CREATE TABLE uniforms_sessions 
(
	id SERIAL,
	uniform_id integer,
	uniforms_order_id integer,
	session_id integer,
	created_at timestamp not null default now(),
        PRIMARY KEY (id),
	FOREIGN KEY (session_id) REFERENCES sessions(id),
	FOREIGN KEY (uniform_id) REFERENCES uniforms(id),
	FOREIGN KEY (uniforms_order_id) REFERENCES uniforms_order(id)
);

CREATE TABLE exercises
(
        id SERIAL,
	url text UNIQUE, --link
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);

create table sessions_exercises
(
	id serial,
	session_id integer,
	exercise_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (session_id) REFERENCES sessions(id),
	FOREIGN KEY (exercise_id) REFERENCES exercises(id),
        PRIMARY KEY (id)
);

create table tags 
(
	id SERIAL,
	name text unique,
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);

create table exercises_tags
(
	id serial,
	exercise_id integer,
	tag_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (exercise_id) REFERENCES exercises(id),
	FOREIGN KEY (tag_id) REFERENCES tags(id),
        PRIMARY KEY (id)
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
	created_at timestamp not null default now(),
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
	created_at timestamp not null default now(),
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
	created_at timestamp not null default now(),
 	FOREIGN KEY(email_id) REFERENCES emails(id),
	PRIMARY KEY (id)
);

CREATE TABLE google_logins 
(
	id SERIAL,
    	email_id integer not null unique,  
    	google_id text not null unique, 
    	id_token text not null,  --big send what you have on client with all updates inserts deletes and it should match this which we update as soon as google auths us   
	created_at timestamp not null default now(),
 	FOREIGN KEY(email_id) REFERENCES emails(id),
	PRIMARY KEY (id)
);


create TABLE forgot_passwords 
(
        id serial,
        email_id integer,
        forgot_password_token text,
        expires timestamp,
	created_at timestamp not null default now(),
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
--actually this is officially that you are part of a club this way if the master account leaves you could also still stay, as the master email propels this to an insert
--so if we delete club then it takes with it all club_persons???

--new idea than above, club members are associated with an email/club via clubs_emails table.... thus if you share an email you share a club
--this will allow persons less power related to club membership and relate it directly to email where it belongs instead of iterating through each time email joins a club to associate all persons with said club, now instead a person will automagically be a member of club but NOT a team member, team_player etc...that is for the club to decide. Its as if anyone with an email can join a club but it is up to the club to place them in a role such as teamplayer, teamcoach etc., team parent maybe.... 

CREATE TABLE club_emails
(
	id SERIAL,
	club_id integer not null,
	email_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(club_id) REFERENCES clubs(id),
        FOREIGN KEY(email_id) REFERENCES emails(id),
	unique (email_id, club_id),
        PRIMARY KEY (id)
);


--this only gets deleted when player leaves club if you want to
--Luke Breslin is a player at Celta Vigo
--oh crap an email should create a player....
--so emails_players/....

--PERSONS
CREATE TABLE dobs
(
	id SERIAL,
	dob date not null,
	PRIMARY KEY (id)
);

CREATE TABLE players 
(
	id SERIAL,
	dob_id int not null,
	person_id integer not null unique,
	created_at timestamp not null default now(),
        FOREIGN KEY(person_id) REFERENCES persons(id),
        FOREIGN KEY(dob_id) REFERENCES dobs(id),
	PRIMARY KEY (id)
);


CREATE TABLE coaches 
(
	id SERIAL,
	person_id integer not null unique,
	created_at timestamp not null default now(),
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

CREATE TABLE managers 
(
	id SERIAL,
	person_id integer not null unique,
	created_at timestamp not null default now(),
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

--god help you
CREATE TABLE administrators 
(
	id SERIAL,
	person_id integer not null unique,
	created_at timestamp not null default now(),
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

-- CLUBS

-- CLUBS

CREATE TABLE club_persons
(
	id SERIAL,
	club_id integer not null,
	person_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(club_id) REFERENCES clubs(id),
        FOREIGN KEY(person_id) REFERENCES persons(id),
	unique (person_id, club_id),
        PRIMARY KEY (id)
);

--to be a club player you need to be a club_person and player
CREATE TABLE club_players 
(
	id SERIAL,
	club_person_id integer,
	player_id integer,
	uniform_number integer,
	created_at timestamp not null default now(),
        FOREIGN KEY(player_id) REFERENCES players(id),
        FOREIGN KEY(club_person_id) REFERENCES club_persons(id),
	PRIMARY KEY (id)
);

CREATE TABLE club_coaches 
(
	id SERIAL,
	club_person_id integer,
	coach_id integer,
	created_at timestamp not null default now(),
        FOREIGN KEY(coach_id) REFERENCES coaches(id),
        FOREIGN KEY(club_person_id) REFERENCES club_persons(id),
	PRIMARY KEY (id)
);

CREATE TABLE club_managers 
(
	id SERIAL,
	club_person_id integer,
	manager_id integer,
	created_at timestamp not null default now(),
        FOREIGN KEY(manager_id) REFERENCES managers(id),
        FOREIGN KEY(club_person_id) REFERENCES club_persons(id),
	PRIMARY KEY (id)
);

--so add club will auto pop you in this table then you can add other club members into this
CREATE TABLE club_administrators 
(
	id SERIAL,
	club_person_id integer,
	administrator_id integer,
	created_at timestamp not null default now(),
        FOREIGN KEY(club_person_id) REFERENCES club_persons(id),
        FOREIGN KEY(administrator_id) REFERENCES administrators(id),
	PRIMARY KEY (id)
);

--this will take user to join page and then also make them a member of a club via a check of a club_token....
--whereas a simple join will only make them a user and a person
--also when you send the invite we will check email and if email is already in system then we simply add to club and then send an email saying welcome to celta! 
--later when adding someone to a team or manager etc we will simply send email saying 'you have been added to ardillos team etc.'
--actually this is only for 
--you have been invited to join celta click here to accept...then it takes you to either a your in or join page depending on if email exists
--whoever you invite will have an email_id because we will create it on the fly???
create table invite_club_emails 
(
	id serial,
        email_id integer,
	club_id integer,
	club_invite_token text,
	expires timestamp,
	created_at timestamp not null default now(),
 	FOREIGN KEY(email_id) REFERENCES emails(id),
 	FOREIGN KEY(club_id) REFERENCES club_administrators(id),
	primary key(id)
);

create table invite_club_emails_club_administrators
(
	id serial,
        invite_club_person_id integer,
	club_administrator_id integer,
	created_at timestamp not null default now(),
 	FOREIGN KEY(invite_club_person_id) REFERENCES invite_club_emails(id),
 	FOREIGN KEY(club_administrator_id) REFERENCES club_administrators(id),
	primary key(id)
);

--this gets deleted if player goes from a team to b team within club

--this gets deleted if player goes from a team to b team within club
--Luke Breslin is a player for U15 Boys (which we know is part of Celta Vigo because teams table has fk club_id) 

--new idea than above...club_persons_id need be changed to person_id, person is linked back to club and email

--this will show when a player was added to a team....should we delete or list as not-active????

CREATE TABLE team_club_persons 
(
	id SERIAL,
	club_person_id integer not null,
	team_id integer not null,
        FOREIGN KEY(club_person_id) REFERENCES club_persons(id),
        FOREIGN KEY(team_id) REFERENCES teams(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_club_players 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_player_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_player_id) REFERENCES club_players(id),
	PRIMARY KEY (id)
);


CREATE TABLE team_club_coaches 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_coach_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_coach_id) REFERENCES club_coaches(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_club_managers 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_manager_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_manager_id) REFERENCES club_managers(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_club_administrators 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_administrator_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_administrator_id) REFERENCES club_administrators(id),
	PRIMARY KEY (id)
);


CREATE TABLE sessions_players_availability 
(
        id SERIAL,
        session_id integer NOT NULL,
       	team_club_player_id integer NOT NULL,
	availability_id integer NOT NULL,
	notes text,
	created_at timestamp not null default now(),
	FOREIGN KEY (session_id) REFERENCES sessions(id),
	FOREIGN KEY (team_club_player_id) REFERENCES team_club_players(id),
	FOREIGN KEY (availability_id) REFERENCES availability(id),
        PRIMARY KEY (id)
);

CREATE TABLE sessions_players_attendance 
(
        id SERIAL,
        session_id integer NOT NULL,
       	team_club_player_id integer NOT NULL,
	attendance_id integer NOT NULL,
	created_at timestamp not null default now(),
	FOREIGN KEY (session_id) REFERENCES sessions(id),
	FOREIGN KEY (team_club_player_id) REFERENCES team_club_players(id),
	FOREIGN KEY (attendance_id) REFERENCES attendance(id),
        PRIMARY KEY (id)
);


--magnets, shirts, fall/spring season for u15 boys, full season for u15, winter season, 
create table products 
(
        id SERIAL,
	name text,
	description text, 
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);


create table product_pricing 
(
        id SERIAL,
	product_id text,
	base_price money,
	start_date timestamp, --order by create_date desc limit 1 to get just the latest price, if there is not valid price than the product is still with company in theory but not for sale currently
	end_date timestamp,
	created_at timestamp not null default now(),
	active boolean,
        PRIMARY KEY (id)
);

create table product_types
(
        id SERIAL,
	name text,
	description text,
	created_at timestamp not null default now(),
        PRIMARY KEY (id)
);

--teams, shirts, these are basically tags
create table product_types_products
(
        id SERIAL,
	product_type_id integer,
	product_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (product_type_id) REFERENCES product_types(id),
	FOREIGN KEY (product_id) REFERENCES products(id),
        PRIMARY KEY (id)
);

create table discount_units
(
	id serial,
	name text,
	created_at timestamp not null default now(),
	primary key(id)
);

--discounts
create table product_discount
(
	id serial,
	product_id integer,
	discount_value integer,
	discount_unit_id integer,
	start_date timestamp,
	end_date timestamp,
	coupon_code text,
	minimum_order_value integer,
	maximum_discount_amount integer,
	is_redeem_allowed boolean,
	created_at timestamp not null default now(),
	FOREIGN KEY (discount_unit_id) REFERENCES discount_units(id),
        PRIMARY KEY (id)
);

create table product_type_discount
(
	id serial,
	product_type_id integer,
	discount_value integer,
	discount_unit_id integer,
	start_date timestamp,
	end_date timestamp,
	coupon_code text,
	minimum_order_value integer,
	maximum_discount_amount integer,
	is_redeem_allowed boolean,
	created_at timestamp not null default now(),
	FOREIGN KEY (product_type_id) REFERENCES product_types(id),
	FOREIGN KEY (discount_unit_id) REFERENCES discount_units(id),
        PRIMARY KEY (id)
);


--ORDERS
CREATE TABLE orders 
(
	id SERIAL,
	person_id integer,
	created_at timestamp not null default now(),
	FOREIGN KEY (person_id) REFERENCES persons(id),
        PRIMARY KEY (id)
);

CREATE TABLE order_items
(
	id SERIAL,
	order_id integer,
	product_id integer,
	price money, --this is calced frozen in at time of order.....
	created_at timestamp not null default now(),
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

-- UPDATE FORGOT PASSWORD
CREATE OR REPLACE FUNCTION f_update_forgot_password(update_forgot_password_token TEXT, password TEXT)
RETURNS text AS $$
DECLARE
        found_email_id forgot_passwords.email_id%TYPE;
        result_set text;
        DECLARE x int := -1;
BEGIN
        SELECT email_id INTO found_email_id FROM forgot_passwords WHERE expires > NOW() and forgot_password_token = update_forgot_password_token;
        IF found_email_id THEN
		update native_logins set password = CRYPT($2, GEN_SALT('md5')) where email_id = found_email_id;     
                result_set = f_format_result_set(found_email_id);
        ELSE
                result_set = '-101, Something went wrong can you submit a new request please?';
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_format_result_set(int)
RETURNS text AS $$
DECLARE
        json_result_persons text;
        json_result_teams text;
        json_result_clubs text;
	result_set text;
BEGIN
	select into json_result_persons j_select_persons($1);
	select into json_result_teams j_select_teams($1);
        select into json_result_clubs j_select_clubs($1);
        result_set = CONCAT($1,',','{',json_result_clubs,',',json_result_teams,',',json_result_persons,'}');
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_format_result_set_events(int)
RETURNS text AS $$
DECLARE
        json_result_persons text;
        json_result_teams text;
        json_result_clubs text;
        json_result_practices text;
        json_result_games text;
	result_set text;
BEGIN
	select into json_result_persons j_select_persons($1);
	select into json_result_teams j_select_teams($1);
        select into json_result_clubs j_select_clubs($1);
	select into json_result_practices j_select_practices($1);
	select into json_result_games j_select_games($1);
        result_set = CONCAT($1,',','{',json_result_clubs,',',json_result_teams,',',json_result_persons,',',json_result_practices,',',json_result_games,'}');
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_format_result_set_invite_club_emails(int,TEXT)
RETURNS text AS $$
DECLARE
        json_result_invite_club_emails text;
        result_set text;
BEGIN
        select into json_result_invite_club_emails j_select_invite_club_emails($2);
        result_set = CONCAT($1,',','{',json_result_invite_club_emails,'}');
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--NATIVE INSERT LOGIN

CREATE OR REPLACE FUNCTION f_insert_native_login(email_name TEXT, password TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, phone TEXT, address TEXT)
RETURNS text AS $$
DECLARE
	found_email_id emails.id%TYPE;
	result_set text;
	DECLARE x int := -1; 
BEGIN

    	SELECT id INTO found_email_id FROM emails WHERE email = email_name;
	IF found_email_id > 0 THEN
		result_set = '-101, Email already exists. Do you want to login instead?';
	ELSE
		CALL p_insert_native_login($1,$2,$3,$4,$5,$6,$7,x);
		IF x > 0 THEN
			result_set = f_format_result_set(x);
                ELSE
                	result_set = '-105';
			result_set = '-101, Something went wrong with signup. Sorry! Please try again.';
		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN J_SELECT PITCHES
--params:club_id
CREATE OR REPLACE FUNCTION j_select_pitches(int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select pitches.id, pitches.name from pitches where club_id = $1 
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"pitches": []', raw_json);
        ELSE
                result_set = CONCAT('"pitches": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PITCHES


--BEGIN J_SELECT PERSONS
CREATE OR REPLACE FUNCTION j_select_persons(email_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
	from
        (
		select persons.id, first_name, middle_name, last_name from persons join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = $1 
        ) t;
	IF raw_json is NULL THEN
		result_set = CONCAT('"persons": []', raw_json);
	ELSE
		result_set = CONCAT('"persons": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PERSONS

--BEGIN J_SELECT TEAMS
CREATE OR REPLACE FUNCTION j_select_teams(email_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select teams.id, teams.name from teams
        ) t;

	IF raw_json is NULL THEN
		result_set = CONCAT('"teams": []', raw_json);
	ELSE
		result_set = CONCAT('"teams": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT TEAMS

--BEGIN J_SELECT CLUBS
CREATE OR REPLACE FUNCTION j_select_clubs(email_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		--select clubs.id, clubs.name from clubs join club_persons on club_persons.club_id=clubs.id join persons on persons.id=club_persons.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = $1
		
		select clubs.id, clubs.name from clubs join club_emails on club_emails.club_id=clubs.id where club_emails.email_id = $1
        ) t;

	IF raw_json is NULL THEN
		result_set = CONCAT('"clubs": []', raw_json);
	ELSE
		result_set = CONCAT('"clubs": ', raw_json);
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT CLUBS

--BEGIN J_SELECT PRACTICES
CREATE OR REPLACE FUNCTION j_select_practices(email_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
		select practices.id, practices.event_date, practices.arrival_time, practices.start_time, practices.end_time, practices.address, practices.coordinates, pitches.name as pitch_name, practices.field_name, teams.name as team_name
                from practices

                join teams on teams.id=practices.team_id
		join team_club_persons on team_club_persons.team_id=teams.id
		join club_persons on club_persons.id=team_club_persons.club_person_id
		join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

                join pitches on pitches.club_id=teams.club_id

                where emails_persons.email_id = 1 AND practices.event_date > now() - interval '1 day'
	) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"practices": []', raw_json);
        ELSE
                result_set = CONCAT('"practices": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PRACTICES

--BEGIN J_SELECT GAMES
CREATE OR REPLACE FUNCTION j_select_games(email_id int)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
               	select games.id, games.event_date, games.arrival_time, games.start_time, games.end_time, games.address, games.coordinates, pitches.name as pitch_name, games.field_name, teams.name as team_name
                from games

                join teams on teams.id=games.team_id
                join team_club_persons on team_club_persons.team_id=teams.id
                join club_persons on club_persons.id=team_club_persons.club_person_id
                join persons on persons.id=club_persons.person_id
                join emails_persons on emails_persons.person_id=persons.id

                join pitches on pitches.club_id=teams.club_id

                where emails_persons.email_id = 1 AND games.event_date > now() - interval '1 day'
	
	) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"games": []', raw_json);
        ELSE
                result_set = CONCAT('"games": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT PRACTICES

CREATE OR REPLACE FUNCTION j_select_invite_club_emails(text)
RETURNS text AS $$
DECLARE
raw_json text;
result_set text;
BEGIN

SELECT json_agg(t) INTO raw_json
        from
        (
                select invite_club_emails.id, invite_club_emails.email_id, invite_club_emails.club_id, invite_club_emails.club_invite_token from invite_club_emails where club_invite_token = $1
        ) t;

        IF raw_json is NULL THEN
                result_set = CONCAT('"invite_club_emails": []', raw_json);
        ELSE
                result_set = CONCAT('"invite_club_emails": ', raw_json);
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END J_SELECT INVITE_CLUB_MEMBERS


CREATE OR REPLACE PROCEDURE p_insert_native_login(email_name TEXT, password TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, phone TEXT, address TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
	returning_person_id integer;
BEGIN
	insert into emails (email) values (email_name) returning id into x;
	insert into native_logins (email_id, password) values (x, CRYPT($2, GEN_SALT('md5')));
	insert into persons (first_name, middle_name, last_name, phone, address) values (first_name, middle_name, last_name, phone, address) returning id into returning_person_id;
	insert into emails_persons (email_id, person_id) values (x, returning_person_id); 
END;
$$;

--insert_native_login_club
CREATE OR REPLACE FUNCTION f_insert_native_login_club(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT)
RETURNS text AS $$
DECLARE
	found_email_id emails.id%TYPE;
	found_club_id clubs.id%TYPE;
        result_set text;
        DECLARE x int := -1;
BEGIN
    	SELECT email_id, club_id INTO found_email_id, found_club_id FROM invite_club_emails WHERE club_invite_token = $7;
	IF found_club_id > 0 THEN
		CALL p_insert_native_login_club(found_email_id,found_club_id,$1,$2,$3,$4,$5,$6,$7,x);
                result_set = f_format_result_set(found_email_id);
	ELSE --for some reason email does not exist
		result_set = '-101, Something went wrong dog!';
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_native_login_club(int, int, password TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, phone TEXT, address TEXT, club_invite_token TEXT, INOUT x int)
LANGUAGE plpgsql    
AS $$
DECLARE
	returning_email_id integer;
	returning_native_login_id integer;
BEGIN
	insert into native_logins (email_id, password) values ($1, CRYPT($3, GEN_SALT('md5')));
	insert into persons (first_name, middle_name, last_name, phone, address) values (first_name, middle_name, last_name, phone, address) returning id into x;
	insert into emails_persons (email_id, person_id) values ($1,x);
	insert into club_persons (club_id,person_id) values ($2,x);
END;
$$;

--get_native_email
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
-- this is where you realize lukes idea of multiple people
--you will return a result set of persons
--BEGIN SAMPLE JSON
CREATE OR REPLACE FUNCTION f_select_club_administrator_clubs(person_id int)
  RETURNS json AS $$
   SELECT json_agg(t)
        from
        (
                select clubs.id, clubs.name from clubs join club_persons on club_persons.club_id=clubs.id join club_administrators on club_administrators.club_person_id=club_persons.id join persons on persons.id=club_persons.person_id where persons.id = person_id
        ) t;
$$ LANGUAGE sql;

--END SAMPLE JSON


--select clubs.id, clubs.name from clubs join club_persons on club_persons.club_id=clubs.id join persons on persons.id=club_persons.person_id join emails_persons on emails_persons.person_id=persons.id where emails_persons.id = 1;

CREATE OR REPLACE FUNCTION f_native_login(TEXT, TEXT)
RETURNS text AS $$
DECLARE
	found_email_id native_logins.email_id%TYPE;
	found_native_login_id native_logins.id%TYPE;
	result_set text;
BEGIN
	select into found_email_id f_get_native_email_id($1);	

	IF found_email_id > 0 THEN

        	SELECT id INTO found_native_login_id FROM native_logins 
        	WHERE email_id = found_email_id AND password = (CRYPT($2, password));
                
		IF found_native_login_id > 0 THEN
			 result_set = f_format_result_set(found_email_id);
                ELSE
			result_set = '-101, Bad password.';
                END IF;

	ELSE
		result_set = '-101, Email does not exist.';
	END IF;
RETURN result_set;
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
	insert into emails (email) values (email_name) returning id into x;
        insert into google_logins (email_id, google_id, id_token) values (x, google_id, id_token) returning id into returning_google_login_id;
        insert into persons (first_name, last_name) values (first_name, last_name) returning id into returning_person_id;
	insert into emails_persons (email_id, person_id) values (x, returning_person_id); 
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
END;
$$;


CREATE OR REPLACE FUNCTION f_google_login(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT)
RETURNS text AS $$
DECLARE
	
        found_email_id emails.id%TYPE;
        found_google_login_id google_logins.id%TYPE;
        found_email_person_id emails_persons.id%TYPE;
        --returning_user_id users.id%TYPE;
        found_person_id persons.id%TYPE;
        found_club_id clubs.id%TYPE;
        
	found_club_invite_token invite_club_emails.club_invite_token%TYPE;
        
	returning_person_id integer;

        result_set text;
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

                SELECT id INTO found_email_person_id FROM emails_persons
                WHERE email_id = found_email_id;
                IF found_email_person_id > 0 THEN
                	--SELECT person_id INTO found_person_id FROM emails_persons
			--where emailperson_id = found_person_id;

                        --update persons set first_name = $4 , last_name = $5
			--where id = found_person_id;
			--return_code = found_person_id;
                ELSE
        		insert into persons (first_name, last_name) values ($4,$5) returning id into found_person_id;
                        insert into emails_persons (email_id,person_id) values (found_email_id,found_person_id);
			--return_code = found_email_id;
                END IF;

        ELSE --if there is no email then logically you cannot have the other tables so do a full insert, also we wont have an invite as we would have made an insert into email
		CALL p_insert_google_login($1,$2,$3,$4,$5,x);
		found_email_id = x;
	END IF;


        IF found_email_id > 0 THEN
		result_set = f_format_result_set(found_email_id);
        ELSE
                result_set = '-105';
        END IF;

	IF $6 is NULL THEN
		--do nothing
	ELSE
		--insert into emails (email) values ($6);
		SELECT club_id into found_club_id from invite_club_emails where club_invite_token = $6;
		insert into club_persons (club_id, person_id) values (found_club_id, found_person_id);
	END IF;	

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

	--RAISE INFO 'information message %', now() ;
  	--RAISE LOG 'log message %', now();
  	--RAISE DEBUG 'debug message %', now();
  	--RAISE WARNING 'warning message %', now();
  	--RAISE NOTICE 'notice message %', now();

CREATE OR REPLACE FUNCTION f_insert_accept_club_invite(TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
        found_club_id clubs.id%TYPE;
	result_set text;
	DECLARE x int := -1;
BEGIN
	select email_id into found_email_id from invite_club_emails where club_invite_token = $1; 
	--RAISE INFO 'found_email_id: %', found_email_id;
  	RAISE LOG 'found_email_id: %', found_email_id;

	IF found_email_id > 0 THEN
		--lets grab the club_id then add all persons to club from email_id
		SELECT club_id INTO found_club_id FROM invite_club_emails WHERE club_invite_token = $1;
		CALL p_insert_club_persons(found_club_id,found_email_id,x);
		IF x > 0 THEN --we are already a member so give normal result set to send to main
                	result_set = f_format_result_set(found_email_id);
		ELSE -- we were not already a member so a join club needs to be done.
                	result_set = f_format_result_set_invite_club_emails(found_email_id,$1);
                	--result_set = '-101, Something went wrong adding your persons to club.';
		END IF;
	ELSE
                result_set = '-101, You need to fill out form to finish signup.';
	
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--INSERT CLUB MEMBERS
CREATE OR REPLACE PROCEDURE p_insert_club_persons(club_id int,email_id int)
LANGUAGE plpgsql
AS $$
DECLARE
        rec RECORD;
BEGIN
        FOR rec IN
                select persons.id from persons join emails_persons on emails_persons.person_id=persons.id where emails_persons.email_id = $2
        LOOP
                insert into club_persons (club_id, person_id) values (club_id, rec.id);
        END LOOP;
END;
$$;

--INSERT CLUB MEMBERS
CREATE OR REPLACE PROCEDURE p_insert_club_administrator(club_person_id_p int, person_id_p int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_administrator_id administrators.id%TYPE;
BEGIN
        insert into administrators (person_id) values (person_id_p) returning id into returning_administrator_id;
        insert into club_administrators (club_person_id,administrator_id) values (club_person_id_p, returning_administrator_id) returning id into x;
END;
$$;


--INSERT CLUB
CREATE OR REPLACE PROCEDURE p_insert_club(name TEXT, address TEXT, email_id int, person_id int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_club_person_id integer;
        returning_club_id integer;
        returning_club_email_id integer;
        found_club_person_id integer;
BEGIN
        insert into clubs (name,address) values (name,address) returning id into returning_club_id;
	insert into club_emails (club_id, email_id) values (returning_club_id,$3);

	--loop for other persons....
	CALL p_insert_club_persons(returning_club_id,$3);

	--get the club_person that is me
	select club_persons.id into found_club_person_id from club_persons where club_persons.club_id = returning_club_id AND club_persons.person_id = $4; 

	--then if you found one insert into admistrators and club_administrators
	IF found_club_person_id > 0 THEN 
		CALL p_insert_club_administrator(found_club_person_id,$4,x);
	ELSE
	END IF;
END;
$$;

CREATE OR REPLACE FUNCTION f_insert_club(TEXT, TEXT, email_id int, person_id int)
RETURNS text AS $$
DECLARE
        found_club_id clubs.id%TYPE;
	DECLARE x int := -1;
	result_set text;
BEGIN
        SELECT id INTO found_club_id FROM clubs
        WHERE name = $1;

        IF found_club_id > 0 THEN
                result_set = '-101, Club name already taken.';
       	ELSE
		CALL p_insert_club($1,$2,email_id,person_id,x);
		IF x > 0 THEN
			result_set = f_format_result_set(email_id);
		ELSE
                	result_set = '-101, Something went wrong with adding club. Sorry!';
		END IF;
        END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN INSERT PRACTICE
CREATE OR REPLACE PROCEDURE p_insert_practice(int,date,time,time,time,text,text,int,text,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
	insert into practices (team_id, event_date, arrival_time, start_time, end_time, address, coordinates, pitch_id, field_name) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id into x;
END;
$$;
--END INSERT PRACTICE

--BEGIN INSERT GAME
CREATE OR REPLACE PROCEDURE p_insert_game(int,date,time,time,time,text,text,int,text,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE

BEGIN
	insert into games (team_id, event_date, arrival_time, start_time, end_time, address, coordinates, pitch_id, field_name) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id into x;
END;
$$;
--END INSERT GAME


--BEGIN INSERT PRACTICE
CREATE OR REPLACE FUNCTION f_insert_practice(int,int,date,time,time,time,text,text,int,text,int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
	found_team_club_person_id team_club_persons.id%TYPE;
	found_club_manager_id club_managers.id%TYPE;

BEGIN
--cms=# select * from team_club_managers;
-- id | team_club_person_id | club_manager_id | created_at 

	select team_club_persons.id into found_team_club_person_id from team_club_persons 
	join club_persons on club_persons.id=team_club_persons.club_person_id
	where club_persons.person_id = $11;

	select club_managers.id into found_club_manager_id from club_managers 
	join club_persons on club_persons.id=club_managers.club_person_id
	where club_persons.person_id = $11;

	--IF found_team_club_person_id > 0 AND found_club_manager_id > 0 THEN
	IF found_team_club_person_id > 0 THEN
        	CALL p_insert_practice($2,$3,$4,$5,$6,$7,$8,$9,$10,x);
        	IF x > 0 THEN
                	result_set = f_format_result_set($1);
        	ELSE
			result_set = '-101, Something went wrong with adding practice.';
        	END IF;
	ELSE
		result_set = '-101,You must be a manager of this team to create a practice. Contact your administrator.';
	END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT PRACTICE

--BEGIN INSERT GAME
CREATE OR REPLACE FUNCTION f_insert_game(int,int,date,time,time,time,text,text,int,text)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
BEGIN
        CALL p_insert_game($2,$3,$4,$5,$6,$7,$8,$9,$10,x);

        IF x > 0 THEN
                result_set = f_format_result_set($1);
        ELSE
                result_set = '-105';
        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;
--END INSERT GAME


--BEGIN SELECT PITCHES
CREATE OR REPLACE FUNCTION f_select_pitches(club_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result_pitches text;
        json_result text;
BEGIN
        select into json_result_pitches j_select_pitches($1);
        result_set = CONCAT($1,',','{',json_result_pitches,'}');
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN SELECT EVENTS
CREATE OR REPLACE FUNCTION f_select_events(email_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        --DECLARE x int := -111;
        --json_result_events text;
BEGIN
        --select into json_result_events j_select_events($1);
        --result_set = CONCAT($1,',','{',json_result_events,'}');
--	     result_set = f_format_result_set(x);
	result_set = f_format_result_set_events(email_id);

RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--BEGIN SELECT PERSON
CREATE OR REPLACE FUNCTION f_select_person(email_id int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result_persons text;
        json_result text;
BEGIN
        select into json_result_persons j_select_persons($1);
        result_set = CONCAT($1,',','{',json_result_persons,'}');
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

--BEGIN INSERT PERSON
CREATE OR REPLACE FUNCTION f_insert_person(TEXT, TEXT, TEXT, TEXT, TEXT, email_id int)
RETURNS text AS $$
DECLARE
        result_set text;
	DECLARE x int := -111;
	json_result text; 
BEGIN
	CALL p_insert_person($1,$2,$3,$4,$5,email_id,x);

        IF x > 0 THEN
		result_set = f_format_result_set(email_id);
        ELSE
                result_set = '-105';
        END IF;

RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_person(first_name TEXT, middle_name TEXT, last_name TEXT, phone TEXT, address TEXT, int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_person_id integer;
	rec RECORD;
BEGIN
        insert into persons (first_name, middle_name, last_name, phone, address) values (first_name, middle_name, last_name, phone, address) returning id into returning_person_id;
	insert into emails_persons (email_id, person_id) values ($6, returning_person_id) returning id into x; 
END;
$$;
--END INSERT PERSON

--BEGIN DELETE PERSON
CREATE OR REPLACE FUNCTION f_delete_person(int, int)
RETURNS text AS $$
DECLARE
        result_set text;
        DECLARE x int := -111;
        json_result text;
	total_persons int;
BEGIN
	select count(*) into total_persons from emails_persons where email_id = $1;
	IF total_persons > 1 THEN
        	CALL p_delete_person($1,$2,x);
        	IF x > 0 THEN
			result_set = f_format_result_set($1);
        	ELSE
                	result_set = '-132';
        	END IF;
	ELSE
                result_set = '-131';
		--not enuf persons
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_delete_person(int, int, INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_person_id integer;
        rec RECORD;
BEGIN
	delete from emails_persons where person_id = $2;
	delete from club_persons where person_id = $2;
	delete from persons where id = $2 returning id into x;
END;
$$;
--END INSERT PERSON

--email_id,club_id,person_id,club_persons_id,name
CREATE OR REPLACE PROCEDURE p_insert_team(int,text,int,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
	returning_team_id teams.id%TYPE;
	found_club_person_id club_persons.id%TYPE;
	returning_team_club_person_id team_club_persons.id%TYPE;
	returning_manager_id managers.id%TYPE;
	returning_club_manager_id club_managers.id%TYPE;
BEGIN
       	insert into teams (club_id,name) values ($1,$2) returning id into returning_team_id;
	select id into found_club_person_id from club_persons where club_id = $1 AND person_id = $3;
	insert into team_club_persons (team_id,club_person_id) values (returning_team_id,found_club_person_id) returning id into returning_team_club_person_id;

	insert into managers (person_id) values ($3) returning id into returning_manager_id;
	insert into club_managers (club_person_id,manager_id) values (found_club_person_id,returning_manager_id) returning id into returning_club_manager_id;
	insert into team_club_managers (team_club_person_id,club_manager_id) values (returning_team_club_person_id, returning_club_manager_id) returning id into x;
END;
$$;

--not using person id to check if club admin but need too!!!!!!!!!!!!!
--email_id,club_id,person_id,name
CREATE OR REPLACE FUNCTION f_insert_team(int,int,int,text)
RETURNS text AS $$
DECLARE
	result_set text;
	DECLARE x int := -1;
	found_club_administrator_id club_administrators.id%TYPE;
	found_club_persons_id club_persons.id%TYPE;
	found_team_id teams.id%TYPE;
BEGIN
		
	select id into found_team_id from teams where name = $4;  	

        IF found_team_id > 0 THEN
                result_set = '-101, Team name already taken.';
	ELSE
		--are you a club admin of club $2????
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id where club_persons.club_id = $2 AND club_persons.person_id = $3; 

		IF found_club_administrator_id > 0 THEN

			CALL p_insert_team($2,$4,$3,x);

			IF x > 0 THEN
                     		result_set = f_format_result_set($1);
			ELSE
                		result_set = '-101, Something went wrong with adding team. Sorry!';
			END IF;
		ELSE
                	result_set = '-101, You are not a club administrator. So you cannot add a team to this club.';
		END IF;
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION f_insert_forgot_password(TEXT, TEXT)
RETURNS text AS $$
DECLARE
        found_email_id emails.id%TYPE;
        returning_forgot_passwords_id forgot_passwords.id%TYPE;
        result_set text;
BEGIN
        select into found_email_id f_get_email_id($1);
        IF found_email_id > 0 THEN 
		delete from forgot_passwords where email_id = found_email_id; 
		insert into forgot_passwords (email_id, forgot_password_token, expires) values (found_email_id, $2, NOW() + interval '1 hour') returning id into returning_forgot_passwords_id;	
		IF returning_forgot_passwords_id > 0 THEN
			--result_set = '-101, Success. We sent you an email to help you login.';
                     	result_set = f_format_result_set(found_email_id);
		ELSE
			result_set = '-101, Something went wrong with process. Sorry! Please try again.';
		END IF;
	ELSE
		result_set = '-101, That email does not exist in our system. Please try a valid email address.';
	END IF;
RETURN result_set;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE p_insert_invite_club_email(int, int, TEXT, int,TEXT,INOUT x int)
LANGUAGE plpgsql
AS $$
DECLARE
        found_administrator_email_id emails.id%TYPE;
        returning_email_id emails.id%TYPE;
        returning_invite_club_person_id invite_club_emails.id%TYPE;
        found_invite_club_person_id invite_club_emails.id%TYPE;
        found_club_administrator_id club_administrators.id%TYPE;
BEGIN
        IF $1 > 0 THEN 

		select invite_club_emails.id into found_invite_club_person_id from invite_club_emails where email_id = found_email_id and club_id = $2;
		insert into invite_club_emails (email_id, club_id, club_invite_token, expires) values (found_email_id, $2, $3, NOW() + interval '1 week') returning id into returning_invite_club_person_id;	
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id join persons on persons.id=club_persons.person_id join clubs on clubs.id=club_persons.club_id where club_id = $2 and persons.id = $4; 
		insert into invite_club_emails_club_administrators (invite_club_person_id, club_administrator_id) values (returning_invite_club_person_id, found_club_administrator_id);

	ELSE --actually just do insert of email then invite...
		insert into emails (email) values ($5) returning id into returning_email_id; 
		select invite_club_emails.id into found_invite_club_person_id from invite_club_emails where email_id = returning_email_id and club_id = $2;
		insert into invite_club_emails (email_id, club_id, club_invite_token, expires) values (returning_email_id, $2, $3, NOW() + interval '1 week') returning id into returning_invite_club_person_id;	
		select club_administrators.id into found_club_administrator_id from club_administrators join club_persons on club_persons.id=club_administrators.club_person_id join persons on persons.id=club_persons.person_id join clubs on clubs.id=club_persons.club_id where club_id = $2 and persons.id = $4; 
		insert into invite_club_emails_club_administrators (invite_club_person_id, club_administrator_id) values (returning_invite_club_person_id, found_club_administrator_id);

	END IF;
	select email_id into x from emails_persons where person_id = $4;
END;
$$;


CREATE OR REPLACE FUNCTION f_insert_invite_club_email(TEXT, int, TEXT, int) --email,club_id,token,person_id associated with club_admin
RETURNS text AS $$
DECLARE
	DECLARE x int := -1;
        found_email_id emails.id%TYPE;
        found_club_email_id club_emails.id%TYPE;
        result_set text;
BEGIN
        select into found_email_id f_get_email_id($1);

	IF found_email_id > 0 THEN
		select id into found_club_email_id from club_emails where club_id = $2 AND email_id = found_email_id; 

		IF found_club_email_id > 0 THEN
			result_set = '-101, this email is already associated with this club';
		ELSE
			CALL p_insert_invite_club_email(found_email_id,$2,$3,$4,$1,x);
		END IF;
	ELSE --call without a found_email_id
		CALL p_insert_invite_club_email(found_email_id,$2,$3,$4,$1,x);
	END IF;

	IF x > 0 THEN
		result_set = f_format_result_set(x);
	ELSE
		result_set = '-101, something went wrong.';
	END IF;

        
RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--------------------------------------------------------------INSERTS
--INSERT CAOS
CREATE OR REPLACE PROCEDURE p_insert_caos(int)
LANGUAGE plpgsql
AS $$
DECLARE
        returning_team_id teams.id%TYPE;

        returning_person_id_player_a persons.id%TYPE;
        returning_person_id_player_b persons.id%TYPE;
        returning_person_id_father persons.id%TYPE;
        returning_person_id_mother persons.id%TYPE;
        returning_person_id_other persons.id%TYPE;

        returning_email_id_player_a emails.id%TYPE;
        returning_email_id_player_b emails.id%TYPE;
        returning_email_id_father emails.id%TYPE;
        returning_email_id_mother emails.id%TYPE;
        returning_email_id_other emails.id%TYPE;
        
	returning_dob_id dobs.id%TYPE;

	returning_club_person_id_player_a club_persons.id%TYPE;
	returning_club_person_id_father club_persons.id%TYPE;
	returning_club_person_id_mother club_persons.id%TYPE;

	returning_player_id players.id%TYPE;
	returning_club_player_id club_players.id%TYPE;
	returning_team_club_person_id team_club_persons.id%TYPE;

BEGIN

	--TEAM
	insert into teams (club_id,name) values (1,'u16 Caos') returning id into returning_team_id;
	insert into team_club_persons (team_id,club_person_id) values (1,1);

	insert into managers (person_id) values (1);
	insert into club_managers (club_person_id,manager_id) values (1,1);
	insert into team_club_managers (team_club_person_id,club_manager_id) values (1,1);

	--PLAYERS
	---------------------------Akmal Tokhirov

	--EMAILS
	insert into emails (email) values ('tokabduaziz@gmail.com') returning id into returning_email_id_player_a;

	--PERSONS
	insert into persons (first_name, middle_name, last_name, phone, address) values ('Akmal', null, 'Tokhirov', null, null) returning id into returning_person_id_player_a;

	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);

	--CLUB_EMAILS
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);

	--CLUB_PERSONS
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;

	--PLAYERS
	insert into dobs (dob) values ('2004-08-25') returning id into returning_dob_id;
	insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

	--CLUB_PLAYERS
	insert into club_players (club_person_id, player_id, uniform_number) values (returning_club_person_id_player_a, returning_player_id, 7) returning id into returning_club_player_id;

	--TEAM_CLUB_PERSONS
	insert into team_club_persons (club_person_id, team_id) values (returning_club_person_id_player_a, returning_team_id) returning id into returning_team_club_person_id;
	
	--TEAM_CLUB_PLAYERS
	insert into team_club_players (team_club_person_id, club_player_id) values (returning_team_club_person_id, returning_club_player_id);

	-------------------------------Alex Rodriguez
	--EMAILS
	insert into emails (email) values ('alexjoaorodriguez@Gmail.com') returning id into returning_email_id_player_a;
	insert into emails (email) values ('lizrsouza13@gmail.com') returning id into returning_email_id_mother;

	--PERSONS
	insert into persons (first_name, middle_name, last_name, phone, address) values ('Alex', 'Joao', 'Rodriquez', '+1 (267)528-5061', null) returning id into returning_person_id_player_a;
	insert into persons (first_name, middle_name, last_name, phone, address) values ('Alex', null, 'Rodriquez', '(732)930-3314', null) returning id into returning_person_id_father;
	insert into persons (first_name, middle_name, last_name, phone, address) values ('Liz', null, 'Rodriquez', '(908)205-4535', null) returning id into returning_person_id_mother;
	
	--EMAILS_PERSONS
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_father);
	insert into emails_persons (email_id, person_id) values (returning_email_id_player_a, returning_person_id_mother);

	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_player_a);
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_father);
	insert into emails_persons (email_id, person_id) values (returning_email_id_mother, returning_person_id_mother);
	
	--CLUB_EMAILS
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_player_a);
      	insert into club_emails (club_id, email_id) values ($1,returning_email_id_mother);

	--CLUB_PERSONS
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_player_a) returning id into returning_club_person_id_player_a;
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_father) returning id into returning_club_person_id_father;
	insert into club_persons (club_id, person_id) values ($1, returning_person_id_mother) returning id into returning_club_person_id_mother;

	--PLAYERS
	--insert into dobs (dob) values ('2005-08-30') returning id into returning_dob_id;
	--insert into players (dob_id,person_id) values (returning_dob_id,returning_person_id_player_a) returning id into returning_player_id;

	-----------------------------------Arber Canole
	--Arber Canole
	insert into emails (email) values ('arberc11@gmail.com');

	--Ergita Canole
	insert into emails (email) values ('canolegita@hotmail.com');

	---------------------------------Ben Barnieu
	--Loic Barnieu
	insert into emails (email) values ('lbarnieu@gmail.com');
	insert into emails (email) values ('Loic@sterlingpig.com');

	--Joanne Barnieu
	insert into emails (email) values ('jbarnieu@yahoo.com');

	--------------------------------Yancarlos Corredor
	insert into emails (email) values ('mystical943@gmail.com');

	----------------------------------Daniel McCallister
	--Bradley McCallister
	insert into emails (email) values ('Meek.McCallister@gmail.com');

	--Mom
	insert into emails (email) values ('miss.b.7712@gmail.com');

	---------------------------------------Dominic Evangelista
	--Amanda Evangelista
	insert into emails (email) values ('all210@comcast.net');

	--Paul Evangelista
	insert into emails (email) values ('paul.evangelista@comcast.net');

	--Dominic Evangelista
	insert into emails (email) values ('dominice1@comcast.net');

	---------------------------------Eric Girsh
	--Leonard Girsh
	insert into emails (email) values ('lguirch@aol.com');


	------------------------------------Fabrizio Franceschelli
	--Claudio Franceschelli
	insert into emails (email) values ('claudio11@msn.com');

	--Fabrizio Franceschelli
	insert into emails (email) values ('fabriziofrances@gmail.com');

	--Marilia Franceschelli
	insert into emails (email) values ('marilia_twins@hotmail.com');


	---------------------------------------Joshua Vidro
	--Katja Pigur
	insert into emails (email) values ('katjapigur@yahoo.com');

	--Joshua Vidro
	insert into emails (email) values ('josh_redninjago@yahoo.com');


	-----------------------------------Luke Breslin
	--Luke Breslin
	insert into emails (email) values ('jbreslin33@gmail.com');

	--------------------------------Marcelo Franceschelli
	--Marcelo Franceschelli
	insert into emails (email) values ('marcelofrance3@gmail.com');


	--------------------------------------Nacho Obando
	--Nacho Obando
	insert into emails (email) values ('Maxwell.obando27@gmail.com');

	--Michelle Obando
	insert into emails (email) values ('Missyobando50@gmail.com');

	----------------------------------Tedi Shaho
	--Tedi Shaho
	insert into emails (email) values ('stiljanshaho@gmail.com');

	-----------------------------------Tristan Burns
	--Kevin Burns
	insert into emails (email) values ('kdburns31@yahoo.com');

	--Jen Burns
	insert into emails (email) values ('Jlynn_mo@yahoo.com');

	--Tristan Burns
	insert into emails (email) values ('Zenbuddhaburns@gmail.com');


	----------------------------------Victor Baidal
	--Alex Baidal
	insert into emails (email) values ('alejo1016@hotmail.com');

	--Victor Baidal
	insert into emails (email) values ('vebaidal@gmail.com');

END;
$$;
--END INSERT PERSON


--BEGIN INSERT CAOS
CREATE OR REPLACE FUNCTION f_insert_celta()
RETURNS text AS $$
DECLARE
        result_set text;
	returning_person_id persons.id%TYPE;
	returning_email_id emails.id%TYPE;
	returning_club_id clubs.id%TYPE;
BEGIN
	--JOE
	insert into persons (first_name, last_name, phone, address) values ('Joe', 'Hurst', '215-555-1212', '2913 Street Road, Bensalem PA 19020') returning id into returning_person_id;
	insert into emails (email) values ('jbreslin33@yahoo.com') returning id into returning_email_id;
	insert into emails_persons (email_id, person_id) values (returning_email_id, returning_person_id);
	insert into native_logins (email_id, password) values (returning_email_id,'$1$X4BpfXnz$G2rqMRjrK0DiTi9P7XdJL.');



	--clubs
	insert into administrators (person_id) values (1);

	insert into clubs (name,address) values ('RC CELTA USA', '2913 Street Rd, Bensalem, PA 19020') returning id into returning_club_id;

	insert into club_persons (club_id,person_id) values (1,1);
	insert into club_administrators (club_person_id,administrator_id) values (1,1);

	insert into club_emails (club_id,email_id) values (1,1);

	--teams
	CALL p_insert_caos(returning_club_id);


RETURN result_set;
END;
$$ LANGUAGE plpgsql;


--RUN STORED PROCEDURES
SELECT f_insert_celta();
