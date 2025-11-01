CREATE TABLE [dbo].[Blog]
(
  [Id] INT IDENTITY(1,1) not null PRIMARY KEY,
  [DateCreated] datetime2 not null,
  [Text] VARCHAR(MAX) not null,
  [LinksTo] VARCHAR(MAX) null,

)
