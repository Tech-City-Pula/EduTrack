create
or replace function calculate_total_pages (query text, page_size int) returns int as $$
DECLARE
    total_rows INT;
    total_pages INT;
BEGIN
    SELECT COUNT(*) INTO total_rows
    FROM grade
    JOIN student ON grade.student_id = student.id
    JOIN subject ON grade.subject_id = subject.id
    WHERE student.name ILIKE '%' || query || '%'
    OR subject.name ILIKE '%' || query || '%';

    total_pages := CEIL(total_rows::NUMERIC / page_size::NUMERIC);

    RETURN total_pages;
END;
$$ language plpgsql;