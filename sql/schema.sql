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

CREATE TABLE plan ( 
    id serial PRIMARY KEY,
    -- need to figure out Auth0 to grab user id
    park_id integer REFERENCES parks(id),
    activity_id integer REFERENCES activities(id),
    dining_id integer REFERENCES dining(id),
    lodging_id integer REFERENCES lodging(id)
);