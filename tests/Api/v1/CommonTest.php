<?php

namespace Tests\Api\v1\Controllers;

use PHPUnit\Framework\Attributes\Test;
use Tests\FeatureTestCase;

/**
 * CommonTest test class
 */
class CommonTest extends FeatureTestCase
{
    #[Test]
    public function test_unknowk_endpoint_returns_404()
    {
        $this->json('GET', '/api/v1/an_unknown_endpoint/')
            ->assertNotFound();
    }
}
