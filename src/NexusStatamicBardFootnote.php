<?php

namespace VictoryCTO\NexusStatamicBardFootnotes;

use ProseMirrorToHtml\Marks\Mark;

class NexusStatamicBardFootnote extends Mark
{
    protected $markType = 'nexusStatamicBardFootnote';
    protected $tagName = 'footnote';

    public function matching(): bool
    {
        return $this->mark->type === $this->markType;
    }

    public function tag(): ?array
    {
        return [
            [
                'tag'   => 'footnote',
                'attrs' => [
                    'url' => $this->mark->attrs->url,
                    'text' => $this->mark->attrs->text,
                    'class' => 'nexus-statamic-bard-footnote'
                ],
            ],
        ];
    }
}
