<?php

namespace App\Providers;

use App\Factories\MigratorFactoryInterface;
use App\Services\IconService;
use App\Services\IconStoreService;
use App\Services\LogoLib\LogoLibManager;
use App\Services\ReleaseRadarService;
use App\Services\SettingService;
use App\Services\TwoFAccountService;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;
use InvalidArgumentException;
use Zxing\QrReader;

class TwoFAuthServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(TwoFAccountService::class, function ($app) {
            return new TwoFAccountService($app->make(MigratorFactoryInterface::class));
        });

        $this->app->singleton(SettingService::class, function () {
            return new SettingService;
        });

        $this->app->singleton(IconStoreService::class, function ($app) {
            return new IconStoreService($app->make(Sanitizer::class));
        });

        $this->app->singleton(IconService::class, function ($app) {
            return new IconService;
        });

        $this->app->singleton(ReleaseRadarService::class, function () {
            return new ReleaseRadarService;
        });

        $this->app->singleton('logolib', function ($app) {
            return new LogoLibManager($app);
        });

        $this->app->bind(QrReader::class, function ($app, array $parameters) {
            $imgSource  = $parameters['imgSource'] ?? throw new InvalidArgumentException('QrReader requires "imgSource" when resolved from the container.');
            $sourceType = $parameters['sourceType'] ?? throw new InvalidArgumentException('QrReader requires "sourceType" when resolved from the container.');

            return new QrReader($imgSource, $sourceType);
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Get the services provided by the provider.
     *
     * @codeCoverageIgnore
     *
     * @return array
     */
    public function provides()
    {
        return [
            IconService::class,
            IconStoreService::class,
            'logolib',
            QrReader::class,
            ReleaseRadarService::class,
        ];
    }
}
