<?php

namespace VictoryCTO\CustomBardClasses;

use Statamic\Fieldtypes\Bard\Augmentor;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        __DIR__.'/../dist/js/custom-bard-classes.js',
    ];

    protected $stylesheets = [
        __DIR__.'/../dist/css/custom-bard-classes.css'
    ];

    protected $publishables = [
        __DIR__.'/../dist/css/fonts' => 'css/fonts'
    ];

    public function boot()
    {
        parent::boot();
        Augmentor::addMark(CustomBardClass::class);
    }
}
