using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace HeroApi.Models
{
    public partial class HeroApi_dbContext : DbContext
    {
        public HeroApi_dbContext()
        {
        }

        public HeroApi_dbContext(DbContextOptions<HeroApi_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Hero> Heroes { get; set; }
        public virtual DbSet<HeroIsDuplicateOfHero> HeroIsDuplicateOfHeroes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=tcp:heroapidbserver.database.windows.net,1433;Initial Catalog=HeroApi_db;User Id=DB_113805_noonbb_user@heroapidbserver;Password=Ddkdk3Ddkd444kdk#fj@");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Hero>(entity =>
            {
                entity.ToTable("Hero");

                entity.Property(e => e.HeroId).HasColumnName("heroId");

                entity.Property(e => e.BirthDate)
                    .HasColumnType("date")
                    .HasColumnName("birthDate");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(75)
                    .HasColumnName("firstName");

                entity.Property(e => e.Gender)
                    .HasMaxLength(1)
                    .HasColumnName("gender")
                    .IsFixedLength(true);

                entity.Property(e => e.LastName)
                    .HasMaxLength(75)
                    .HasColumnName("lastName");
            });

            modelBuilder.Entity<HeroIsDuplicateOfHero>(entity =>
            {
                entity.HasKey(e => new { e.HeroId1, e.HeroId2 })
                    .HasName("HeroIsDuplicateOfHero_PK");

                entity.ToTable("HeroIsDuplicateOfHero");

                entity.Property(e => e.HeroId1).HasColumnName("heroId1");

                entity.Property(e => e.HeroId2).HasColumnName("heroId2");

                entity.Property(e => e.DuplicateInfo)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("duplicateInfo");

                entity.Property(e => e.FileDescription)
                    .HasMaxLength(255)
                    .HasColumnName("fileDescription");

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasColumnName("uploadDate");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
