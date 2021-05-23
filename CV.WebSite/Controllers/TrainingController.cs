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
    public class TrainingController : ControllerBase
    {
        private readonly ILogger<EmailController> _logger;
        private readonly IResumeService _resumeService;


        public TrainingController(ILogger<EmailController> logger, IResumeService resumeService)
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
                await _resumeService.DeleteTrainingAsync(language, id);
            }
            catch (KeyNotFoundException e)
            {
                _logger.LogError(e, "Training not found (id: {0})", id);
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
        public async Task<ActionResult<int>> Post([FromBody] Training job)
        {
            try
            {
                var language = Request.GetCurrentLanguage();
                var result = await _resumeService.AddTrainingAsync(language, job);
                return Ok(result);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de lecture du CV");
                throw;
            }
        }


        // PUT: api/Products/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Authorize(AuthenticationSchemes = AzureADDefaults.AuthenticationScheme)]
        //[Authorize]
        //[Authorize(Policy = "B2CUsers")] // For B2C authentication
        [Authorize(Policy = "AADUsers")] // For AAD authentication
        public async Task<IActionResult> Put(int id, [FromBody] Training job)
        {


            if (job == null || job.Id != id)
            {
                return BadRequest();
            }

            try
            {
                var language = Request.GetCurrentLanguage();
                await _resumeService.SaveTrainingAsync(language, job);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de lecture du CV");
                throw;
            }
        }



        /// <summary>
        /// Get all training experiences.
        /// </summary>
        /// <returns>List of training experience.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<IQueryable<Training>> Get()
        {
            try
            {
                var language = Request.GetCurrentLanguage();
                var result = _resumeService.GetTrainings(language);
                return Ok(result.AsQueryable());
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Erreur de lecture du CV");
                throw;
            }   
        }

        /// <summary>
        /// Get a specific training experience.
        /// </summary>
        /// <returns>The requested training experience.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        //[ApiConventionMethod(typeof(DefaultApiConventions), nameof(DefaultApiConventions.Get))]
        public ActionResult<Training> Get(int id)
        {
            try
            {
                var language = Request.GetCurrentLanguage();
                var result = _resumeService.GetTrainings(language).FirstOrDefault(t => t.Id == id);
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
