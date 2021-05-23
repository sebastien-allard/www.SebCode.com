using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CV.WebSite.Extensions;
using CV.WebSite.Models;
using CV.WebSite.Services;

namespace CV.WebSite.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechnologyController : ControllerBase
    {
        private readonly ILogger<EmailController> _logger;
        private readonly IResumeService _resumeService;


        public TechnologyController(ILogger<EmailController> logger, IResumeService resumeService)
        {
            _logger = logger;
            _resumeService = resumeService;
        }

        [Authorize(Policy = "AADUsers")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var language = Request.GetCurrentLanguage();
                await _resumeService.DeleteTechnologyAsync(language, id);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogError(e, "Technology not found (id: {0})", id);
                return NotFound(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de traitement du CV");
                throw;
            }
            return Ok();
        }

        [Authorize(Policy = "AADUsers")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public async Task<ActionResult<int>> Post([FromBody] Technology technology)
        {
            try
            {
                var language = Request.GetCurrentLanguage();
                var result = await _resumeService.AddTechnologyAsync(language, technology);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de lecture du CV");
                throw;
            }
        }

        [Authorize(Policy = "AADUsers")]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Put))]
        public async Task<ActionResult> Put(/*int id, */[FromBody] Technology technology)
        {
            try
            {
                var language = Request.GetCurrentLanguage();
                await _resumeService.SaveTechnologyAsync(language, technology);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de lecture du CV");
                throw;
            }
        }

        /// <summary>
        /// Get all technology experiences.
        /// </summary>
        /// <returns>List of technology experience.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<IQueryable<Technology>> Get()
        {
            try
            {
                var language = Request.GetCurrentLanguage();
                var result = _resumeService.GetTechnologies(language);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de lecture du CV");
                throw;
            }
        }
    }
}
