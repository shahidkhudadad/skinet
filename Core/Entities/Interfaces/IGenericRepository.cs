using Core.Specifications;

namespace Core.Entities.Interfaces
{
    public interface IGenericRepository<T> where T:BaseEntity
    {
        Task<T> GetByIdSync(int id);
        Task<IReadOnlyList<T>> ListAllSync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
         
    }
}