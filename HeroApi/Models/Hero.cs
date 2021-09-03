using System;
using System.Collections.Generic;

#nullable disable

namespace HeroApi.Models
{
    public partial class Hero
    {
        public int HeroId { get; set; }
        public DateTime? BirthDate { get; set; }
        public string FirstName { get; set; }
        public string Gender { get; set; }
        public string LastName { get; set; }
    }
}
