<?php

namespace App\Services;

use App\Services\Classes\UploadFeaturedImage;
use App\Services\Classes\UploadSocialMediaImage;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use InvalidArgumentException;

class ImageUploadServiceResolver
{
    /**
     * Mapping of upload types to their corresponding service classes
     */
    protected static array $typeMapping = [
        'featured' => UploadFeaturedImage::class,
        'socialmedia' => UploadSocialMediaImage::class,
    ];

    /**
     * Resolve upload service based on type
     *
     * @param string $type
     * @return ProductImageUploadServiceInterface
     * @throws InvalidArgumentException
     */
    public static function resolve(string $type): ProductImageUploadServiceInterface
    {
        $normalizedType = strtolower(trim($type));
        
        if (!isset(static::$typeMapping[$normalizedType])) {
            throw new InvalidArgumentException("Unsupported upload type: {$type}. Supported types: " . implode(', ', array_keys(static::$typeMapping)));
        }
        
        $serviceClass = static::$typeMapping[$normalizedType];
        
        return new $serviceClass();
    }

    /**
     * Get all available upload types
     *
     * @return array
     */
    public static function getAvailableTypes(): array
    {
        return array_keys(static::$typeMapping);
    }

    /**
     * Check if a type is supported
     *
     * @param string $type
     * @return bool
     */
    public static function isSupported(string $type): bool
    {
        return isset(static::$typeMapping[strtolower(trim($type))]);
    }

    /**
     * Register a new upload type
     *
     * @param string $type
     * @param string $serviceClass
     * @return void
     * @throws InvalidArgumentException
     */
    public static function register(string $type, string $serviceClass): void
    {
        if (!class_exists($serviceClass)) {
            throw new InvalidArgumentException("Service class {$serviceClass} does not exist.");
        }
        
        if (!in_array(ProductImageUploadServiceInterface::class, class_implements($serviceClass))) {
            throw new InvalidArgumentException("Service class {$serviceClass} must implement ProductImageUploadServiceInterface.");
        }
        
        static::$typeMapping[strtolower(trim($type))] = $serviceClass;
    }
}