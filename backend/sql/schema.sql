CREATE TABLE parks (
    id serial PRIMARY KEY,
    park_name text,
    park_description text
);

CREATE TABLE activities (
    id serial PRIMARY KEY,
    activity_name text NOT NULL,
    activity_type text,
    activity_height text,
    activity_hours text,
    activity_image text,
    activity_description text, 
    park_id integer REFERENCES parks(id)
);

CREATE TABLE dining (
    id serial PRIMARY KEY,
    dining_name text NOT NULL,
    dining_type text,
    dining_price text,
    dining_image text,
    park_id integer REFERENCES parks(id)
);

CREATE TABLE lodging (
    id serial PRIMARY KEY,
    lodging_name text NOT NULL,
    lodging_transportation text,
    lodging_availability_link text,
    lodging_image text,
    park_id integer REFERENCES parks(id)
);

CREATE TABLE users(
    id UUID DEFAULT uuid_generate_v4(),
    nickname VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email_Verified BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
);

CREATE TABLE plan ( 
    id serial PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    park_id integer REFERENCES parks(id),
    activity_id integer REFERENCES activities(id),
    dining_id integer REFERENCES dining(id),
    lodging_id integer REFERENCES lodging(id)
);