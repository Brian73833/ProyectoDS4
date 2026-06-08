using StoreBackend.Domain.Entities;
using StoreBackend.Infrastructure.Repositories;
using StoreBackend.Dto;
using StoreBackend.Exceptions;

namespace StoreBackend.DomainService;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;

    public UserService(IUserRepository userRepository, IRoleRepository roleRepository)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
    }

    public async Task<User> LoginAsync(LoginUserDto loginDto)
    {
        var user = await _userRepository.GetByEmailAsync(loginDto.Email);
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            throw new BadRequestResponseException("Invalid email or password");
        }

        return user;
    }

    public async Task<User> CreateAsync(CreateUserDto userDto)
    {
        if (await _userRepository.HasUserByEmailAsync(userDto.Email))
        {
            throw new BadRequestResponseException("Email is already taken");
        }

        var customerRole = await _roleRepository.GetByNameAsync(RoleNames.Customer);
        if (customerRole == null)
        {
            throw new ResourceNotFoundException("Default role 'Customer' not found");
        }

        var userEntity = new User
        {
            UserResourceId = Guid.NewGuid(),
            Name = userDto.Name,
            Email = userDto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
        };

        userEntity.UserRoles.Add(new UserRole
        {
            User = userEntity,
            Role = customerRole,
            UserRoleResourceId = Guid.NewGuid()
        });

        return await _userRepository.CreateAsync(userEntity);
    }
}
