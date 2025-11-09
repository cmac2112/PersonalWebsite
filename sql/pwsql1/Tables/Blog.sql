CREATE TABLE [dbo].[Blog]
(
  [Id] INT IDENTITY(1,1) not null PRIMARY KEY,
  [DateCreated] datetime2 null,
  [Topic] VARCHAR(255) null,
  [Text] VARCHAR(MAX) null,
  [LinksTo] VARCHAR(MAX) null,

)
