CREATE DATABASE IF NOT EXISTS SDCY;
USE SDCY;

DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Styles;
DROP TABLE IF EXISTS Features;
DROP TABLE IF EXISTS SKU;
DROP TABLE IF EXISTS Related;
DROP TABLE IF EXISTS Photos;

CREATE TABLE Products (
  ProductID INT,
  Name VARCHAR(64),
  Slogan VARCHAR(255),
  Description VARCHAR(1024),
  Category VARCHAR(64),
  DefaultPrice DECIMAL,
  PRIMARY KEY (ProductID)
);

CREATE TABLE Styles (
  StyleID INT,
  ProductID INT,
  StyleName VARCHAR(64),
  StyleSalePrice DECIMAL,
  StyleOriginalPrice DECIMAL,
  StyleDefault BIT,
  PRIMARY KEY (StyleID)
);

CREATE TABLE Features(
  TblID INT,
  ProductID INT,
  FeatureCategory VARCHAR(64),
  FeatureValue VARCHAR(64),
  PRIMARY KEY (TblID)
);

CREATE TABLE SKU (
  SkuID INT,
  StyleID INT,
  SkuSize VARCHAR(64),
  SkuQuantity INT,
  PRIMARY KEY (SkuID)
);

CREATE TABLE Related (
  TblID INT,
  ProductID INT,
  RelatedID INT,
  PRIMARY KEY (TblID)
);

CREATE TABLE Photos (
  TblID INT,
  StyleID INT,
  URL VARCHAR(1024),
  ThumbnailURL VARCHAR(1024),
  PRIMARY KEY (TblID)
);
