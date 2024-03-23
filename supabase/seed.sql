ALTER SEQUENCE public.student_id_seq RESTART WITH 1;
ALTER SEQUENCE public.subject_id_seq RESTART WITH 1;
ALTER SEQUENCE public.grade_id_seq RESTART WITH 1;

INSERT INTO public.student (name, age, gender)
VALUES
  ('Matej', 27, 'male'),
  ('Alan', 22, 'male'),
  ('Marko', 21, 'male'),
  ('Ivana', 19, 'female'),
  ('Bruna', 23, 'female'),
	('Ivan', 19, 'male'),
	('Ana', 21, 'female');

INSERT INTO public.subject (name, description)
VALUES
	('Matematika', 'najgori predmet'),
	('Hrvatski', 'najgori predmet zapravo'),
	('Povijest', 'actually zanimljiv predmet kad postanes stariji'),
	('Likovni', 'najbolji predmet'),
	('Informatika', 'najbolji predmet'),
	('Engleski', 'najbolji predmet'),
	('Kemija', 'užas'),
	('Fizika', 'rani me');

INSERT INTO public.grade (student_id, subject_id, grade)
VALUES
	(4, 2, 1),
	(1, 3, 3),
	(2, 1, 4),
	(3, 5, 5),
	(4, 6, 2),
	(5, 4, 3),
	(6, 7, 4),
	(7, 8, 2),
	(1, 2, 5),
	(2, 3, 4),
	(3, 4, 3),
	(4, 5, 2),
	(5, 6, 1),
	(6, 7, 5),
	(7, 8, 4),
	(1, 1, 3),
	(2, 2, 4),
	(3, 3, 5),
	(4, 4, 2),
	(5, 5, 3),
	(6, 6, 4),
	(7, 7, 5),
	(1, 8, 2);