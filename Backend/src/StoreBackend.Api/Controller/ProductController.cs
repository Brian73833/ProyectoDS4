using Microsoft.AspNetCore.Mvc;
using StoreBackend.Api.Mappers;
using StoreBackend.Facade;

namespace StoreBackend.Api.Controller
{
    [Route("api/products")]
    [ApiController]
    public class ProductController(IProductFacade productFacade) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await productFacade.GetAllAsync();
            var productModel = ProductMapper.ToModel(products);
            return Ok(productModel);
        }

        [HttpGet("{productResourceId}")]
        public async Task<IActionResult> GetProductAsync(Guid productResourceId)
        {
            var productDto = await productFacade.GetByResourceIdAsync(productResourceId);
            var productModel = ProductMapper.ToModel(productDto);
            return Ok(productModel);
        }
    }
}
