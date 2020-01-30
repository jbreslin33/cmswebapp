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
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
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

CREATE TABLE practice
(
	id SERIAL,

	--dates
	start_date date,
	end_date date,

	--day of week	
	sunday_checked boolean,
	monday_checked boolean,
	tuesday_checked boolean,
	wednesday_checked boolean,
	thursday_checked boolean,
	friday_checked boolean,
	saturday_checked boolean,

	--info	
	team_id integer,

	--meta
	created_at timestamp not null default now(),

	--keys
	FOREIGN KEY (team_id) REFERENCES teams(id),
	PRIMARY KEY (id)
);

CREATE TABLE practices 
(
	--keys
        id SERIAL,
	practice_id integer not null,

	--dates
	event_date date, --the date of this instance of practice
	
	--time
        arrival_time time, --only 1 arrival time leave it
        start_time time, --only 1 start time leave it
        end_time time,
	
	--info
	address text,
        coordinates text,
	pitch_id integer, --all you need for a session	
	field_name text, --field 3, field A, 9v9 field etc if nothing in db

	--meta
	created_at timestamp not null default now(),

	--keys
	FOREIGN KEY (pitch_id) REFERENCES pitches(id),
	FOREIGN KEY (practice_id) REFERENCES practice(id),
	PRIMARY KEY (id)
);

CREATE TABLE games 
(
        id SERIAL,

	--dates
	event_date date,

	--times
        arrival_time time, --only 1 arrival time leave it
        start_time time, --only 1 start time leave it
        end_time time,

	--info
        address text,
        coordinates text,
	pitch_id integer, --all you need for a session	
	field_name text, --field 3, field A, 9v9 field etc if nothing in db
	team_id integer,
	opponent text,

	--meta
	created_at timestamp not null default now(),

	--keys
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
	phones text [],
	address text,
	coordinates text,
	created_at timestamp not null default now(),
	PRIMARY KEY (id)
);

create table emails 
(
	id serial,
	email text not null unique,
	token uuid DEFAULT uuid_generate_v4 (),
	created_at timestamp not null default now(),
	PRIMARY KEY (id)
);

create table confirm_emails 
(
	id serial,
	email_id integer,
	created_at timestamp not null default now(),
        FOREIGN KEY(email_id) REFERENCES emails(id),
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
--you need a native_login, native_login_token_sents AND native_login_tokens_received THEN it replaces the previous
--so for update password make a new native_logins insert and a native_login_token_sent
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

create TABLE insert_native_login_tokens 
(
        id serial,
        email_id integer,
        token text,
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

CREATE TABLE team_club_persons_club_players 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_player_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_player_id) REFERENCES club_players(id),
	PRIMARY KEY (id)
);


CREATE TABLE team_club_persons_club_coaches 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_coach_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_coach_id) REFERENCES club_coaches(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_club_persons_club_managers 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_manager_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_manager_id) REFERENCES club_managers(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_club_persons_club_administrators 
(
	id SERIAL,
	team_club_person_id integer not null,
	club_administrator_id integer not null,
	created_at timestamp not null default now(),
        FOREIGN KEY(team_club_person_id) REFERENCES team_club_persons(id),
        FOREIGN KEY(club_administrator_id) REFERENCES club_administrators(id),
	PRIMARY KEY (id)
);

CREATE TABLE practices_players_availability 
(
        id SERIAL,
        practice_id integer NOT NULL,
	team_club_persons_club_players_id integer NOT NULL,
	availability_id integer NOT NULL,
	notes text,
	modified timestamp not null default now(),
	FOREIGN KEY (practice_id) REFERENCES practices(id),
	FOREIGN KEY (team_club_persons_club_players_id) REFERENCES team_club_persons_club_players(id),
	FOREIGN KEY (availability_id) REFERENCES availability(id),
	UNIQUE (practice_id,team_club_persons_club_players_id),
        PRIMARY KEY (id)
);

CREATE TABLE games_players_availability 
(
        id SERIAL,
        game_id integer NOT NULL,
	team_club_persons_club_players_id integer NOT NULL,
	availability_id integer NOT NULL,
	notes text,
	created_at timestamp not null default now(),
	FOREIGN KEY (game_id) REFERENCES games(id),
	FOREIGN KEY (team_club_persons_club_players_id) REFERENCES team_club_persons_club_players(id),
	FOREIGN KEY (availability_id) REFERENCES availability(id),
	UNIQUE (game_id,team_club_persons_club_players_id),
        PRIMARY KEY (id)
);

CREATE TABLE practices_players_attendance 
(
        id SERIAL,
        practice_id integer NOT NULL,
       	team_club_persons_club_players_id integer NOT NULL,
	attendance_id integer NOT NULL,
	created_at timestamp not null default now(),
	FOREIGN KEY (practice_id) REFERENCES practices(id),
	FOREIGN KEY (team_club_persons_club_players_id) REFERENCES team_club_persons_club_players(id),
	FOREIGN KEY (attendance_id) REFERENCES attendance(id),
	UNIQUE (practice_id,team_club_persons_club_players_id),
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


