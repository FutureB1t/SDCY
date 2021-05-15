-- before running this script, run the following commands to check the number of rows in the cleaned csv files
-- cd Desktop/SDCY/db/csv/cleaned_files/
-- wc -l *
-- 2219279 features.csv
-- 5655656 photos.csv
-- 1000011 product.csv
-- 4508263 related.csv
-- 11323917 skus.csv
-- 1958102 styles.csv

USE SDCY;

SELECT COUNT(*) FROM Features;
SELECT COUNT(*) FROM Photos;
SELECT COUNT(*) FROM Products;
SELECT COUNT(*) FROM Related;
SELECT COUNT(*) FROM SKU;
SELECT COUNT(*) FROM Styles;

-- all the rows counts match with the files
-- files were imported correctly!