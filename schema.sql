
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(25),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL CHECK (email LIKE '%@%'),
    password TEXT NOT NULL,
    profile_picture VARCHAR(255)
);

CREATE TABLE instructors (
  instructor_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  email TEXT NOT NULL CHECK (email LIKE '%@%'),
  password TEXT NOT NULL,
  profile_picture VARCHAR(255)
);
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    instructor_id INTEGER REFERENCES instructors(instructor_id),
    description TEXT NOT NULL,
    price DECIMAL(10,2),
    rating DECIMAL(2,1)
);

CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(user_id),
    course_id INTEGER REFERENCES courses(course_id),
    enrollment_date DATE,
    -- Unique together constraint on user_id, course_id
    CONSTRAINT unique_enrollment_id UNIQUE (user_id, course_id)
);

CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(user_id),
  course_id INTEGER REFERENCES courses(course_id),
  rating DECIMAL(2,1),
  review TEXT
);
