<?php

namespace App\Services\LogoLib;

class DashboardiconsLogoLib extends AbstractLogoLib implements LogoLibInterface
{
    /**
     * The prefix to be aplied to cached filename.
     */
    protected string $cachePrefix = 'dashboardicons_';

    /**
     * Base url of the icon collection
     */
    protected string $libUrl = 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/';
}
