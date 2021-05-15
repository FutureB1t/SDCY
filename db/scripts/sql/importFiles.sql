-- Running SQL script:
-- cd ~/Desktop/SDCY/db
-- mysql --local-infile=1 -u root < importFiles.sql
USE SDCY;

DELETE FROM Features;
DELETE FROM Photos;
DELETE FROM Products;
DELETE FROM Related;
DELETE FROM SKU;
DELETE FROM Styles;

LOAD DATA LOCAL INFILE 'csv/cleaned_files/photos.csv'
INTO TABLE Photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'csv/cleaned_files/features.csv'
INTO TABLE Features
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'csv/cleaned_files/product.csv'
INTO TABLE Products
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'csv/cleaned_files/related.csv'
INTO TABLE Related
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'csv/cleaned_files/skus.csv'
INTO TABLE SKU
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'csv/cleaned_files/styles.csv'
INTO TABLE Styles
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- There are 2 errors that I had to fix:
-- 1. "The MySQL server is running with the --secure-file-priv option so it cannot execute this statement"
-- SOLUTION: Use "LOCAL" in LOAD DATA solved the security error
--
-- 2. "Loading local data is disabled; this must be enabled on both the client and server side"
-- SOLUTION: run SQL script with parameter --local-infile=1