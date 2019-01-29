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

DROP TABLE eventos_users_attendance CASCADE;
DROP TABLE eventos_users_availability CASCADE;

DROP TABLE eventos_sessions CASCADE;
DROP TABLE sessions CASCADE;

DROP TABLE uniforms_eventos CASCADE;
DROP TABLE uniforms_order CASCADE;
DROP TABLE uniforms CASCADE;

DROP TABLE users_system_roles CASCADE; --admin, data-entry
DROP TABLE users_clubs_roles_teams CASCADE; --instantiation of player, coach, manager, liason, parent for a specific team tied to users_clubs_roles class type table
DROP TABLE users_clubs_roles CASCADE; -- techninal director, cfo, coordinator, cms-admin, board member, president, ceo 

DROP TABLE roles CASCADE;

DROP TABLE system_users CASCADE;
DROP TABLE clubs_users CASCADE;

DROP TABLE player CASCADE;
DROP TABLE parent CASCADE;
DROP TABLE manager CASCADE;
DROP TABLE coach CASCADE;

DROP TABLE members CASCADE;
DROP TABLE users CASCADE;

DROP TABLE availability CASCADE;
DROP TABLE attendance CASCADE;

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
        PRIMARY KEY (id),
        FOREIGN KEY(zones_id) REFERENCES zones(id),
        FOREIGN KEY(session_id) REFERENCES sessions(id)
);

CREATE TABLE users 
(
	id SERIAL,
	username text NOT NULL UNIQUE,
    	password text NOT NULL UNIQUE, 
	PRIMARY KEY (id)
);


-- we are going with a single user table so we do not need multiple logins instead you just need one and choose what role you want to view. 
--jbreslin33@gmail.com
CREATE TABLE members 
(
	id SERIAL,
    	first_name text,
    	middle_name text,
    	last_name text,
    	email text NOt NULL UNIQUE, --lbreslin6
    	phone text,
	address text,
	coordinates text,
	users_id integer, --if this points to jbreslin33@gmail.com no biggie becuase updates can be sent to jbreslin33@gmail.com and lbreslin6Gmail.com
        FOREIGN KEY(users_id) REFERENCES users(id), 
	PRIMARY KEY (id)
);

--alter table users add constraint username_email foreign key (username) references members (email);

--2 siblings 1 user above and a parent below
--Luke 
--Grace
CREATE TABLE player 
(
	id SERIAL,
	dob date,
	members_id integer,
        FOREIGN KEY(members_id) REFERENCES members(id), --luke member
	PRIMARY KEY (id)
);
--Jim
--Colleen
CREATE TABLE parent 
(
	id SERIAL,
	members_id integer,
        FOREIGN KEY(members_id) REFERENCES members(id), --louis member
	PRIMARY KEY (id)
);

CREATE TABLE manager 
(
	id SERIAL,
	members_id integer,
        FOREIGN KEY(members_id) REFERENCES members(id), --luke member
	PRIMARY KEY (id)
);
--Coach->user jbreslin33@gmail.com
CREATE TABLE coach 
(
	id SERIAL,
	members_id integer,
        FOREIGN KEY(members_id) REFERENCES members(id), --louis member
	PRIMARY KEY (id)
);

CREATE TABLE clubs_users 
(
	id SERIAL,
	user_id integer NOT NULL,
	club_id integer NOT NULL,
	--default_timestamp timestamp NOT NULL,
	UNIQUE (user_id, club_id),	
	FOREIGN KEY (club_id) REFERENCES clubs(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE system_users 
(
	id SERIAL,
	user_id integer NOT NULL,
	PRIMARY KEY (id),	
	FOREIGN KEY (user_id) REFERENCES users(id)
);
	
	
	
	
CREATE TABLE roles 
(
	id SERIAL,
	name text,
	PRIMARY KEY (id)
);

-- you choose what role you want to be at any time and that redoes gui
CREATE TABLE users_system_roles 
(
        id SERIAL,
        user_id integer NOT NULL,
        role_id integer NOT NULL,
	default_timestamp timestamp NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE users_clubs_roles 
(
        id SERIAL,
        users_id integer NOT NULL,
       	club_id integer NOT NULL,
        roles_id integer NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (users_id) REFERENCES users(id),
	FOREIGN KEY (club_id) REFERENCES clubs(id),
	FOREIGN KEY (roles_id) REFERENCES roles(id),
	unique (users_id,club_id,roles_id)
);

CREATE TABLE users_clubs_roles_teams
(
        id SERIAL,
        users_clubs_roles_id integer NOT NULL,
        team_id integer NOT NULL,
	default_timestamp timestamp NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (users_clubs_roles_id) REFERENCES users_clubs_roles(id),
	FOREIGN KEY (team_id) REFERENCES teams(id),
	unique (users_clubs_roles_id,team_id)
);

CREATE TABLE eventos_users_availability 
(
        id SERIAL,
        evento_id integer NOT NULL,
       	users_id integer NOT NULL,
	availability_id integer NOT NULL,
	notes text,
        PRIMARY KEY (id),
	FOREIGN KEY (evento_id) REFERENCES eventos(id),
	FOREIGN KEY (users_id) REFERENCES users(id),
	FOREIGN KEY (availability_id) REFERENCES availability(id),
	unique (evento_id,users_id)
);

CREATE TABLE eventos_users_attendance 
(
        id SERIAL,
        evento_id integer NOT NULL,
       	users_id integer NOT NULL,
	attendance_id integer NOT NULL,
        PRIMARY KEY (id),
	FOREIGN KEY (evento_id) REFERENCES eventos(id),
	FOREIGN KEY (users_id) REFERENCES users(id),
	FOREIGN KEY (attendance_id) REFERENCES attendance(id)
);
