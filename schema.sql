CREATE TABLE parks (
    id serial PRIMARY KEY,
    park_name text,
    park_description text
);

CREATE TABLE activities (
    id serial PRIMARY KEY,
    activity_name text NOT NULL,
    activity_type text,
    height text,
    activity_hours text,
    activity_image text,
    activity_learn_more_link text, 
    park_id integer REFERENCES parks(id)
);