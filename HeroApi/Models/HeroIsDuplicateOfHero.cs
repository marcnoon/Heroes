using System;
using System.Collections.Generic;

#nullable disable

namespace HeroApi.Models
{
    public partial class HeroIsDuplicateOfHero
    {
        public int HeroId1 { get; set; }
        public int HeroId2 { get; set; }
        public string DuplicateInfo { get; set; }
        public DateTime UploadDate { get; set; }
        public string FileDescription { get; set; }
    }
}
