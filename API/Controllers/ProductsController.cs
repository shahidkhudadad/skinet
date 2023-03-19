
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> productRepo;
        private readonly IGenericRepository<ProductBrand> productbrandRepo;
        private readonly IGenericRepository<ProductType> productTypeRepo;
        private readonly IMapper mapper;

        public ProductsController(IGenericRepository<Product> productRepo,
         IGenericRepository<ProductBrand> productbrandRepo,
         IGenericRepository<ProductType> productTypeRepo,
         IMapper mapper)
        {
            this.productRepo = productRepo;
            this.productbrandRepo = productbrandRepo;
            this.productTypeRepo = productTypeRepo;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec= new ProductsWithTypesAndBrandsSpecifications();
            var products = await productRepo.ListAsync(spec);
            return Ok(mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec= new ProductsWithTypesAndBrandsSpecifications(id);
            var product= await  productRepo.GetEntityWithSpec(spec);
            return mapper.Map<Product,ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await productbrandRepo.ListAllSync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductTypes()
        {
            return Ok(await productTypeRepo.ListAllSync());
        }

    }
}