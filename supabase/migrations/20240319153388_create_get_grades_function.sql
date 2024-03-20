create
or replace function get_grades (query text, sort text, page int) returns setof grade as $$
DECLARE
    result_grade grade;
BEGIN
    FOR result_grade IN
        SELECT grade.*, student.*, subject.*
        FROM grade
        JOIN student ON grade.student_id = student.id
        JOIN subject ON grade.subject_id = subject.id
        WHERE student.name ILIKE '%' || query || '%'
        OR subject.name ILIKE '%' || query || '%'
        ORDER BY CASE WHEN sort = 'asc' THEN student.name END ASC,
                 CASE WHEN sort = 'desc' THEN student.name END DESC
        LIMIT 10 OFFSET ((page - 1) * 10)
    LOOP
        RETURN NEXT result_grade;
    END LOOP;
    RETURN;
END;
$$ language plpgsql;