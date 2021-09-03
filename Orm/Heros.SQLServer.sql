CREATE SCHEMA Heros
GO

GO


CREATE TABLE dbo.Hero
(
	heroId int IDENTITY (1, 1) NOT NULL,
	birthDate date,
	firstName nvarchar(75),
	gender nchar(1) CHECK (gender IN (N'M', N'F')),
	lastName nvarchar(75),
	CONSTRAINT Hero_PK PRIMARY KEY(heroId)
)
GO


CREATE TABLE dbo.HeroIsDuplicateOfHero
(
	heroId1 int NOT NULL,
	heroId2 int NOT NULL,
	duplicateInfo nvarchar(255) NOT NULL,
	uploadDate datetime NOT NULL,
	fileDescription nvarchar(255),
	CONSTRAINT HeroIsDuplicateOfHero_PK PRIMARY KEY(heroId1, heroId2)
)
GO


ALTER TABLE Heros.HeroIsDuplicateOfHero ADD CONSTRAINT HeroIsDuplicateOfHero_FK1 FOREIGN KEY (heroId1) REFERENCES Heros.Hero (heroId) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


ALTER TABLE Heros.HeroIsDuplicateOfHero ADD CONSTRAINT HeroIsDuplicateOfHero_FK2 FOREIGN KEY (heroId2) REFERENCES Heros.Hero (heroId) ON DELETE NO ACTION ON UPDATE NO ACTION
GO


GO