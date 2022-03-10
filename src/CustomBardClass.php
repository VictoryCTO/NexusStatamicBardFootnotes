<?php

namespace VictoryCTO\CustomBardClasses;

use ProseMirrorToHtml\Marks\Mark;

class CustomBardClass extends Mark
{
    protected $markType = 'customBardClass';
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
                    'url' => 'bard-class '.$this->mark->attrs->url,
                    'text' => 'bard-class '.$this->mark->attrs->text
                ],
            ],
        ];
    }
}
