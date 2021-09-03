using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroApi.Models_ViewModels
{
    public class Heros
    {
        public List<string> Headers { get; set; }
        public List<List<string>> Rows { get; set; }
    }
}
