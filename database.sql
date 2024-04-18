CREATE TABLE "person" (
"id" serial primary key,
"first_name" varchar (255) NOT NULL,
"last_name" varchar (255) NOT NULL,
"email" varchar (255) NOT NULL,
"is_instructor" boolean NOT NULL,
"has_left" boolean NOT NULL
);

CREATE TABLE "training" (
"id" serial primary key,
"title" varchar (255) NOT NULL,
"short_title" varchar (3) NOT NULL,
"validation_length" int NOT NULL
);

CREATE TABLE "person_training" (
"id" serial primary key,
"person_id" int REFERENCES "person"
"training_id" int REFERENCES "training"
);

INSERT INTO "training" ("title", "short_title", "validation_length")
VALUES 
('Blood Bourne Pathogen Training', 'BBP', 1),
('Occupation Health Program', 'OHP', 1),
('Biological Safety Training', 'BIO', 1),
('General Safety Training', 'GEN', 3),
('Hazmat Safety Training', 'HAZ', 3),
('Shipping Training', 'SHP', 3),
('Laboratory Safety Training', 'LAB', 2);
