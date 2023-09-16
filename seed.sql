INSERT INTO users (user_id, username, first_name, last_name, email, password, profile_picture)
VALUES
  ('12b8a160-d896-42e0-a324-5c75578a0aa1', 'john.doe', 'John', 'Doe', 'john@example.com', 'password123', 'profile1.jpg'),
  ('12b8a160-d896-42e0-a324-5c75578a0aa2', 'jane.smith', 'Jane', 'Smith', 'jane@example.com', 'password456', 'profile2.jpg'),
  ('12b8a160-d896-42e0-a324-5c75578a0aa3', 'mike.johnson', 'Mike', 'Johnson', 'mike@example.com', 'password789', 'profile3.jpg'),
  ('12b8a160-d896-42e0-a324-5c75578a0aa5', 'sarah.davis', 'Sarah', 'Davis', 'sarah@example.com', 'passwordabc', 'profile4.jpg'),
  ('12b8a160-d896-42e0-a324-5c75578a0aa6', 'alex.brown', 'Alex', 'Brown', 'alex@example.com', 'passworddef', 'profile5.jpg');

INSERT INTO instructors (instructor_id, name, bio, profile_picture, email, password)
VALUES
  (1, 'John Instructor', 'Experienced programmer and instructor.', 'instructor1.jpg', 'johninstructor@example.com', 'password321'),
  (2, 'Prof. Smith', 'Web development expert with a passion for teaching.', 'instructor2.jpg', 'smithinstructor@example.com', 'password333'),
  (3, 'Mister Johnson', 'Data scientist and industry professional.', 'instructor3.jpg', 'johnsoninstructor@example.com', 'password543'),
  (4, 'Dr. Sarah', 'Mobile app developer and instructor.', 'instructor4.jpg', 'sarahinstructor@example.com', 'password544'),
  (5, 'Alec Brown', 'Graphic designer with extensive experience.', 'instructor5.jpg', 'aliceinstructor@example.com', 'password654');

  INSERT INTO courses (course_id, title, description, instructor_id, price, rating)
VALUES
  (1, 'Introduction to Programming', 'Learn the basics of programming with this introductory course.', 1, 49.99, 4.5),
  (2, 'Web Development 101', 'Get started with web development and learn HTML, CSS, and JavaScript.', 2, 69.99, 4.2),
  (3, 'Data Science Fundamentals', 'Explore the world of data science and learn essential data analysis techniques.', 3, 89.99, 4.8),
  (4, 'Mobile App Development', 'Build your own mobile apps for iOS and Android with this comprehensive course.', 4, 99.99, 4.6),
  (5, 'Graphic Design Masterclass', 'Learn graphic design principles and create stunning visual designs.', 5, 79.99, 4.3);


INSERT INTO enrollments (enrollment_id, user_id, course_id, enrollment_date)
VALUES
  (1, '12b8a160-d896-42e0-a324-5c75578a0aa1', 1, '2022-01-15'),
  (2, '12b8a160-d896-42e0-a324-5c75578a0aa2', 1, '2022-02-20'),
  (3, '12b8a160-d896-42e0-a324-5c75578a0aa3', 2, '2022-03-10'),
  (4, '12b8a160-d896-42e0-a324-5c75578a0aa5', 3, '2022-04-05'),
  (5, '12b8a160-d896-42e0-a324-5c75578a0aa6', 4, '2022-05-08');


INSERT INTO ratings (rating_id, user_id, course_id, rating, review)
VALUES
  (1, '12b8a160-d896-42e0-a324-5c75578a0aa1', 1,  4.5, 'Great course! Highly recommended.'),
  (2, '12b8a160-d896-42e0-a324-5c75578a0aa2', 1,  5.0, 'Excellent content and explanations.'),
  (3, '12b8a160-d896-42e0-a324-5c75578a0aa3', 2, 4.0, 'Good course, but could use more exercises.'),
  (4,'12b8a160-d896-42e0-a324-5c75578a0aa5', 3, 5.0, 'Fantastic course! Comprehensive and well-structured.'),
  (5, '12b8a160-d896-42e0-a324-5c75578a0aa6', 4, 4.5, 'Enjoyed building apps with the course materials.');

