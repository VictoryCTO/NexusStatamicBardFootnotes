<?php

namespace BrunoSubert\CustomBardClasses;

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
                    'class' => 'bard-class '.$this->mark->attrs->value
                ],
            ],
        ];
    }
}
