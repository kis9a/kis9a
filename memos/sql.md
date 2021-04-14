# [SQLBolt - Learn SQL - Introduction to SQL](https://sqlbolt.com/)

## SQL Lesson 1: SELECT queries 101

```sql

SELECT title FROM movies;
SELECT * FROM movies;
SELECT title, description FROM movies;

```

### SQL Lesson 2: Queries with constraints (Pt. 1)

```sql
SELECT id, title FROM movies WHERE id = 6;
# Find the movies released in the years between 2000 and 2010 ✓
SELECT title, year FROM movies WHERE year BETWEEN 2000 AND 2010;
# Find the movies not released in the years between 2000 and 2010 ✓
SELECT title, year FROM movies WHERE year < 2000 OR year > 2010;

show table status from emails where name='email_threads_10'
"select * from email_threads_10 where bid=", bid, "limit 20"

```


```
CREATE table bots_cp AS SELECT * FROM bots
```
