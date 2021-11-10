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
    loding_name text NOT NULL,
    loding_transportation text,
    loding_availability text,
    loding_image text,
    park_id integer REFERENCES parks(id)
);