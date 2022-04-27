<?php

namespace VictoryCTO\NexusStatamicBardFootnotes;

use Statamic\Fieldtypes\Bard\Augmentor;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        __DIR__.'/../dist/js/nexus-statamic-bard-footnotes.js',
    ];

    protected $stylesheets = [
        __DIR__.'/../dist/css/nexus-statamic-bard-footnotes.css'
    ];

    protected $publishables = [
        __DIR__.'/../dist/css/fonts' => 'css/fonts'
    ];

    public function boot()
    {
        parent::boot();
        Augmentor::addMark(NexusStatamicBardFootnote::class);
    }
}
