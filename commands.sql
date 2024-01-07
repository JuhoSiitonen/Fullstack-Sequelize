CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
);
insert into blogs (author, url, title, likes) values ('Testings test', 'testingblogs.com', 'Test till you drop', 0);
insert into blogs (author, url, title, likes) values ('Some more testing', 'testingblogs.com', 'Test and Test some more', 1);

