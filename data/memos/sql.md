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
 SHOW TABLES FORM wordpress LIKE "%meta";

```

```
DROP TABLE test_db_transaction_lua;

CREATE TABLE IF NOT EXISTS test_db_transaction_lua (
    id BIGINT(20) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ins_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

INSERT INTO test_db_transaction_lua (name) VALUES ("one");

DESCRIBE article;
DROP DATABASE media;
```

CREATE DATABASE db;
SHOW databases;
USE db;
.

CREATE TABLE no.test (
id INT VARCHAR(56) AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(50),
content TEXT,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

"SELECT from*unixtime(ins_t, '%Y/%m/%d') as '日付け',
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'あたり数',
SUM( CASE WHEN msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS 'はずれ数',
SUM( CASE WHEN msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS '参加数'
FROM msgs*$bid WHERE oname='line' AND `from`='bot' AND ins_t between $start and $end
AND msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' GROUP BY from_unixtime(ins_t, '%Y/%m/%d');"

SELECT
Date(from_unixtime(ins_t)) as date,
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS 'fail'
FROM msgs_741 WHERE oname='line' AND `from`='bot' AND ins_t between 1 and 1625497200 AND msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' GROUP BY Date(from_unixtime(ins_t));

SELECT oid as uid,
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck-fail%' THEN 1 ELSE 0 END) AS 'fail'
FROM msgs_741 WHERE oname='line' AND `from`='bot' AND ins_t between 1 and 1625497200 AND msg LIKE 'Greet-suc%' OR msg LIKE 'fuck-fail%' GROUP BY CAST(ins_t as DATE);

SELECT CASE WHEN name LIKE 'nick-1%' THEN 'nick'
WHEN name LIKE 'vicky-1%' THEN 'vicky'
ELSE NULL END AS Name,
COUNT(\*) AS Count
FROM dummytable
GROUP BY CASE WHEN name LIKE 'nick-1%' THEN 'nick'
WHEN name LIKE 'vicky-1%' THEN 'vicky'
ELSE NULL END

SELECT oid as uid, count(oid) as count from msgs_741 WHERE oname='line' AND `from`='bot' AND ins_t between 1 and 1625497200 AND msg LIKE 'fuck_fail%' GROUP BY oid

SELECT dept,
SUM( CASE WHEN gender = "1" THEN 1 ELSE 0 END) AS "男性社員の人数",
SUM( CASE WHEN gender = "2" THEN 1 ELSE 0 END) AS "女性社員の人数",
SUM( CASE WHEN gender = "3" THEN 1 ELSE 0 END) AS "その他の社員の人数"
FROM name_dept_gender_score
GROUP BY dept;

SELECT oid as uid,
SUM( CASE WHEN msg LIKE)
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck_fail%' THEN 1 ELSE 0 END) AS 'fail',
FROM msgs_741
GROUP BY oid

SELECT oid as uid,
SUM( CASE WHEN msg LIKE 'Greet-suc%' THEN 1 ELSE 0 END) AS 'suc',
SUM( CASE WHEN msg LIKE 'fuck_fail%' THEN 1 ELSE 0 END) AS 'fail'
FROM msgs_741
GROUP BY oid;

SELECT CASE
WHEN msg LIKE 'fuck_fail%' THEN 'fail'
WHEN msg LIKE 'Greet-suc%' THEN 'suc'
ELSE NULL END as Name,
COUNT(\*) AS Count
FROM msgs_741 WHERE oname='line' AND `from`='bot'
GROUP BY CASE
WHEN msg LIKE 'fuck_fail%' THEN 'fail'
WHEN msg LIKE 'Greet-suc%' THEN 'suc'
ELSE NULL END;

```

```
