alter table Products add index ProductIDIndex (ProductID);
alter table Photos add index StyleIDIndex (StyleID);
alter table Styles add index StyleIDIndex (StyleID);
alter table Styles add index ProductIDIndex (ProductID);