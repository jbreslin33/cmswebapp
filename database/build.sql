--warmup ,global integraged, global structure, return to calmness
--***************************************************************
--******************  DROP TABLES *************************
--**************************************************************
--OLD DROPS
--DROP TABLE users_teams_roles CASCADE; --player, coach, manager, liason, parent
--DROP TABLE teams_users CASCADE;
--DROP TABLE event_types CASCADE; 
--DROP TABLE events_sessions CASCADE; 
--DROP TABLE events_users_attendance CASCADE; 
--DROP TABLE events_users_availability CASCADE; 
--DROP TABLE teams_users CASCADE; 
--DROP TABLE uniforms_events CASCADE; 
--DROP TABLE users_teams_roles CASCADE; 
--DROP TABLE event_type CASCADE; 
--DROP TABLE events CASCADE; 
--DROP TABLE evento_type CASCADE; 
--DROP TABLE games CASCADE; 
--DROP TABLE practices CASCADE; 
--DROP TABLE practices_sessions CASCADE; 
--DROP TABLE practices_users_attendance CASCADE; 
--DROP TABLE practices_users_availability CASCADE; 
--DROP TABLE games_users_attendance CASCADE; 
--DROP TABLE games_users_availability CASCADE; 
--DROP TABLE uniforms_games CASCADE; 

--DROP TABLE affairs CASCADE; 
--DROP TABLE affairs_types CASCADE; 
--DROP TABLE affairs_users_attendance CASCADE; 
--DROP TABLE affairs_users_availability CASCADE; 
--DROP TABLE uniforms_affairs CASCADE; 
--DROP TABLE players CASCADE; 

--DROP TABLE eventos_users_attendance CASCADE;
--DROP TABLE eventos_users_availability CASCADE;

--DROP TABLE members CASCADE;
--DROP TABLE users_system_roles CASCADE; --admin, data-entry
--DROP TABLE users_clubs_roles_teams CASCADE; --instantiation of player, coach, manager, liason, parent for a specific team tied to users_clubs_roles class type table
--DROP TABLE users_clubs_roles CASCADE; -- techninal director, cfo, coordinator, cms-admin, board member, president, ceo 

--DROP TABLE roles CASCADE;

--DROP TABLE system_users CASCADE;
--DROP TABLE clubs_users CASCADE;
--DROP TABLE emails CASCADE;
--DROP TABLE members CASCADE;
--DROP TABLE user_members_players CASCADE;
--DROP TABLE club_members_players CASCADE;
--DROP TABLE members CASCADE;
--DROP TABLE player CASCADE;
--DROP TABLE parent CASCADE;
--DROP TABLE manager CASCADE;
--DROP TABLE coach CASCADE;
--DROP TABLE users_clubs_roles CASCADE;
--DROP TABLE users_clubs_roles_teams CASCADE;
--DROP TABLE players CASCADE;
--DROP TABLE coaches CASCADE;
--DROP TABLE managers CASCADE;
--DROP TABLE parents CASCADE;


--LIVE DROPS
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


--USERS
DROP TABLE parents_players CASCADE;

DROP TABLE team_players CASCADE;
DROP TABLE team_coaches CASCADE;
DROP TABLE team_managers CASCADE;
DROP TABLE team_parents CASCADE;
DROP TABLE team_members CASCADE;

DROP TABLE club_players CASCADE;
DROP TABLE club_coaches CASCADE;
DROP TABLE club_managers CASCADE;
DROP TABLE club_parents CASCADE;

DROP TABLE players CASCADE;
DROP TABLE coaches CASCADE;
DROP TABLE managers CASCADE;
DROP TABLE parents CASCADE;

DROP TABLE club_members CASCADE;

drop table users_families cascade;
drop table families cascade;

DROP TABLE members CASCADE;

drop table login_credentials cascade;
DROP TABLE user_guardians CASCADE;
DROP TABLE users CASCADE;
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

--****************************************************************
--***************************************************************
--******************  CREATE TABLES *************************
--**************************************************************
--**************************************************************

--==================================================================
--==================== users  ========================
--==================================================================

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
        name text NOT NULL,
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
    	first_name text,
    	middle_name text,
    	last_name text,
    	email text not null, --jbreslin33
    	phone text,
	address text,
	coordinates text,
	PRIMARY KEY (id)
);

--jbreslin33@gmail.com this is if you want a login???
--some person needs to own this????
CREATE TABLE users 
(
	id SERIAL,
	person_id integer not null,
	password text not null,
	username text not null unique,  --jbreslin33@gmail.com, lbreslin6@gmail.com
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

create table login_credentials
(
	id SERIAL,
	user_id integer, --owner
	username text not null unique,  --jbreslin33@gmail.com, lbreslin6@gmail.com
    	password text not null,  --Iggles_13           , toy_bot_6 
        FOREIGN KEY(user_id) REFERENCES users(id),
        PRIMARY KEY (id)
);

CREATE TABLE families 
(
	id SERIAL,
	head_of_family_id integer,
        FOREIGN KEY(head_of_family_id) REFERENCES users(id),
	PRIMARY KEY (id)
);

CREATE TABLE users_families 
(
	id SERIAL,
	user_id integer,
	family_id integer,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(family_id) REFERENCES families(id),
	PRIMARY KEY (id)
);

--just extra logins that dont pay and won't be managers or anything but need to be linked to users for schedules they dont even need names really
CREATE TABLE user_guardians
(
	id SERIAL,
	username text not null unique, --this needs to be unique and can be username or password matter of fact can I check memmber email as well during login check?
    	password text NOT NULL UNIQUE, 
	name text, --mom mom, poppy, uncle brian
	email text, --email to send schedule updates to.
	user_id integer NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id),
	PRIMARY KEY (id)
);


--Luke Breslin
CREATE TABLE members 
(
	id SERIAL,
    	first_name text,
    	middle_name text,
    	last_name text,
    	email text not null, --lbreslin6 or this could be parent email for player Luke Breslin email of parent jbreslin33@gmail.com
    	phone text,
	address text,
	coordinates text,
	user_id integer not null, 
        FOREIGN KEY(user_id) REFERENCES users(id), 
	PRIMARY KEY (id)
);


--Luke Breslin, Celta Vigo
CREATE TABLE club_members 
(
	id SERIAL,
	club_id integer,
	person_id integer,
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
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

CREATE TABLE coaches 
(
	id SERIAL,
	person_id integer,
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

CREATE TABLE managers 
(
	id SERIAL,
	person_id integer,
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);
CREATE TABLE parents 
(
	id SERIAL,
	person_id integer,
        FOREIGN KEY(person_id) REFERENCES persons(id),
	PRIMARY KEY (id)
);

--PARENT PLAYER
CREATE TABLE parents_players
(
	id SERIAL,
	parent_id integer not null,
	player_id integer not null,
        FOREIGN KEY(parent_id) REFERENCES parents(id),
        FOREIGN KEY(player_id) REFERENCES players(id),
	unique (parent_id, player_id),
	PRIMARY KEY (id)
);



CREATE TABLE club_players 
(
	id SERIAL,
	uniform_number integer,
	club_member_id integer,
        FOREIGN KEY(club_member_id) REFERENCES club_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE club_coaches 
(
	id SERIAL,
	--uniform_number integer,
	club_member_id integer,
        FOREIGN KEY(club_member_id) REFERENCES club_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE club_managers 
(
	id SERIAL,
	--uniform_number integer,
	club_member_id integer,
        FOREIGN KEY(club_member_id) REFERENCES club_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE club_parents 
(
	id SERIAL,
	--uniform_number integer,
	club_member_id integer,
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
        FOREIGN KEY(club_members_id) REFERENCES club_members(id),
        FOREIGN KEY(team_id) REFERENCES teams(id),
	primary key(id)
);

CREATE TABLE team_players 
(
	id SERIAL,
	team_member_id integer not null,
        FOREIGN KEY(team_member_id) REFERENCES team_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_coaches 
(
	id SERIAL,
	team_member_id integer not null,
        FOREIGN KEY(team_member_id) REFERENCES team_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_managers 
(
	id SERIAL,
	team_member_id integer not null,
        FOREIGN KEY(team_member_id) REFERENCES team_members(id),
	PRIMARY KEY (id)
);

CREATE TABLE team_parents 
(
	id SERIAL,
	team_member_id integer not null,
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
	member_id integer,
	FOREIGN KEY (member_id) REFERENCES members(id),
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

