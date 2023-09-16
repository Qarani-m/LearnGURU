\echo 'Delete and recreate learnGuru db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE learnguru;
CREATE DATABASE learnguru;
\connect learnguru

-- execute the schema file
\i schema.sql


\connect learnguru


-- execute the seed file 
\i seed.sql