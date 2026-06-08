using StoreBackend.Domain.Entities;

namespace StoreBackend.Infrastructure.Repositories;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<bool> HasUserByEmailAsync(string email);
    Task<User> CreateAsync(User user);
}
