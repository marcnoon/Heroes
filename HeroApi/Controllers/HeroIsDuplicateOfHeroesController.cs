using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HeroApi.Models;

namespace HeroApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroIsDuplicateOfHeroesController : ControllerBase
    {
        private readonly HeroApi_dbContext _context;

        public HeroIsDuplicateOfHeroesController(HeroApi_dbContext context)
        {
            _context = context;
        }

        // GET: api/HeroIsDuplicateOfHeroes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HeroIsDuplicateOfHero>>> GetHeroIsDuplicateOfHeroes()
        {
            return await _context.HeroIsDuplicateOfHeroes.ToListAsync();
        }

        // GET: api/HeroIsDuplicateOfHeroes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HeroIsDuplicateOfHero>> GetHeroIsDuplicateOfHero(int id)
        {
            var heroIsDuplicateOfHero = await _context.HeroIsDuplicateOfHeroes.FindAsync(id);

            if (heroIsDuplicateOfHero == null)
            {
                return NotFound();
            }

            return heroIsDuplicateOfHero;
        }

        // PUT: api/HeroIsDuplicateOfHeroes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHeroIsDuplicateOfHero(int id, HeroIsDuplicateOfHero heroIsDuplicateOfHero)
        {
            if (id != heroIsDuplicateOfHero.HeroId1)
            {
                return BadRequest();
            }

            _context.Entry(heroIsDuplicateOfHero).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HeroIsDuplicateOfHeroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HeroIsDuplicateOfHeroes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HeroIsDuplicateOfHero>> PostHeroIsDuplicateOfHero(HeroIsDuplicateOfHero heroIsDuplicateOfHero)
        {
            _context.HeroIsDuplicateOfHeroes.Add(heroIsDuplicateOfHero);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HeroIsDuplicateOfHeroExists(heroIsDuplicateOfHero.HeroId1))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHeroIsDuplicateOfHero", new { id = heroIsDuplicateOfHero.HeroId1 }, heroIsDuplicateOfHero);
        }

        // DELETE: api/HeroIsDuplicateOfHeroes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeroIsDuplicateOfHero(int id)
        {
            var heroIsDuplicateOfHero = await _context.HeroIsDuplicateOfHeroes.FindAsync(id);
            if (heroIsDuplicateOfHero == null)
            {
                return NotFound();
            }

            _context.HeroIsDuplicateOfHeroes.Remove(heroIsDuplicateOfHero);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HeroIsDuplicateOfHeroExists(int id)
        {
            return _context.HeroIsDuplicateOfHeroes.Any(e => e.HeroId1 == id);
        }
    }
}
