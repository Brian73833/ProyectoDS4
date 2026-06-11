using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using StoreBackend.Exceptions;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StoreBackend.Api.Services;

public class ImageService : IImageService
{
    private readonly string _connectionString;
    private readonly ILogger<ImageService> _logger;
    private const string ContainerName = "productos";

    public ImageService(IConfiguration configuration, ILogger<ImageService> logger)
    {
        _connectionString = configuration.GetConnectionString("AzureBlobStorage")
            ?? throw new InvalidOperationException("La cadena de conexión 'AzureBlobStorage' no está configurada.");
        _logger = logger;
    }

    public async Task<string> SaveImageAsync(IFormFile imageFile, string subFolder)
    {
        if (imageFile.Length > 5 * 1024 * 1024)
        {
            throw new BadRequestResponseException("El archivo de imagen no puede superar los 5MB.");
        }

        var allowedExtensions = new[] { ".jpg", ".png", ".jpeg" };
        var extension = Path.GetExtension(imageFile.FileName).ToLowerInvariant();
        if (string.IsNullOrEmpty(extension) || !allowedExtensions.Contains(extension))
        {
            throw new BadRequestResponseException("Tipo de archivo no permitido. Solo se permiten imágenes (jpg o png).");
        }

        var allowedContentTypes = new[] { "image/jpeg", "image/png" };
        if (!allowedContentTypes.Contains(imageFile.ContentType.ToLowerInvariant()))
        {
            throw new BadRequestResponseException("El Content-Type del archivo no es válido.");
        }

        var blobServiceClient = new BlobServiceClient(_connectionString);
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(ContainerName);

        try
        {
            await blobContainerClient.CreateIfNotExistsAsync();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "No se pudo asegurar la creación del contenedor '{ContainerName}'. Si ya existe, este error puede ignorarse.", ContainerName);
        }

        string uniqueFileName = $"{subFolder}/{Guid.NewGuid()}{extension}";
        var blobClient = blobContainerClient.GetBlobClient(uniqueFileName);

        using (var stream = imageFile.OpenReadStream())
        {
            var uploadOptions = new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = imageFile.ContentType }
            };
            await blobClient.UploadAsync(stream, uploadOptions);
        }

        return blobClient.Uri.ToString();
    }

    public void DeleteImage(string imagePath)
    {
        if (string.IsNullOrEmpty(imagePath)) return;

        try
        {
            var uri = new Uri(imagePath);
            string containerSegment = $"/{ContainerName}/";
            int index = uri.AbsolutePath.IndexOf(containerSegment, StringComparison.OrdinalIgnoreCase);
            
            if (index >= 0)
            {
                string blobName = uri.AbsolutePath.Substring(index + containerSegment.Length);
                var blobServiceClient = new BlobServiceClient(_connectionString);
                var blobContainerClient = blobServiceClient.GetBlobContainerClient(ContainerName);
                var blobClient = blobContainerClient.GetBlobClient(Uri.UnescapeDataString(blobName));
                
                blobClient.DeleteIfExists();
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "No se pudo eliminar el blob en la ruta '{ImagePath}'. Es posible que el archivo ya no exista.", imagePath);
        }
    }
}
