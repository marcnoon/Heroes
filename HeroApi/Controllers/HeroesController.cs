using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HeroApi.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.IO;
using System.Collections.Specialized;
using System.Text.RegularExpressions;
using HeroApi.Models_ViewModels;
using System.Net.Http;

namespace HeroApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroesController : ControllerBase
    {
        private readonly HeroApi_dbContext _context;

        public HeroesController(HeroApi_dbContext context)
        {
            _context = context;
        }

        // GET: api/Heroes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hero>>> GetHeroes()
        {
            return await _context.Heroes.ToListAsync();
        }

        // GET: api/Heroes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hero>> GetHero(int id)
        {
            var hero = await _context.Heroes.FindAsync(id);

            if (hero == null)
            {
                return NotFound();
            }

            return hero;
        }

        // PUT: api/Heroes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHero(int id, Hero hero)
        {
            if (id != hero.HeroId)
            {
                return BadRequest();
            }

            _context.Entry(hero).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw new Exception("An error occured saving db context PutHero");
                }
            }

            return NoContent();
        }

        // POST: api/Heroes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Hero>> PostHero(Hero hero)
        {
            if (ModelState.IsValid)
            {
                _context.Heroes.Add(hero);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetHero", new { id = hero.HeroId }, hero);
            }
            else
            {
                return ValidationProblem(ModelState);
            }
        }

        // DELETE: api/Heroes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHero(int id)
        {
            var hero = await _context.Heroes.FindAsync(id);
            if (hero == null)
            {
                return NotFound();
            }

            _context.Heroes.Remove(hero);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Route("PostUpload")]
        [HttpPost]
        public async Task<IActionResult> PostUpload(IFormFile formFile)
        {
            if (formFile == null || formFile.Length == 0)
            {
                return Problem("No File Uploaded");
            }

            // TODO add a service
            string str_file;
            using (var reader = new StreamReader(formFile.OpenReadStream()))
            {
                var x = await reader.ReadToEndAsync();
                if (x.GetType() == typeof(string))
                {
                    str_file = x;
                }
                else
                {
                    return BadRequest("Not uploading in correct format.");
                }
            }

            Console.Write(str_file);
            str_file = str_file.Replace("\n\r", "\n");
            var lines = str_file.Split(new char[] { '\n' }).ToList();
            List<string> headers = new List<string>();

            foreach (string header in lines[0].Split(new char[] { ',' }))
            {
                headers.Add(Regex.Replace(header, @"\s+", ""));
            }
            List<List<string>> rows = new List<List<string>>();

            foreach (string line in lines.GetRange(1, lines.Count - 1))
            {
                List<string> cols = new List<string>();
                foreach (string col in line.Split(new char[] { ',' }))
                {
                    cols.Add(Regex.Replace(col, @"\s+", ""));
                }
                rows.Add(cols);

                // TODO: verify cols and header counts match else throw error

                Heros heros = new Heros
                {
                    Headers = headers,
                    Rows = rows
                };
                
                List<Hero> heroes = new List<Hero>();

                foreach(var row in heros.Rows)
                {
                    foreach(var header in heros.Headers)
                    {
                        // match  rows to header
                        
                    }
                }
                Models.HeroApi_dbContext db = new HeroApi_dbContext();
                db.Heroes.Add(new Hero
                {
                    
                });
            }

            //if (this.Request.HasJsonContentType())
            //{
            //        return Ok("HasJsonContentType()");
            //}
            //else if (this.Request.HasFormContentType)
            //{
            //    // TODO call service
            //    return Ok("HasFormContentType");
            //}
            //else
            //{

            //}
            return BadRequest("Not uploading in correct format.");
        }

        private bool HeroExists(int id)
        {
            return _context.Heroes.Any(e => e.HeroId == id);
        }
    }
}
