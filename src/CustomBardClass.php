<?php

namespace BrunoSubert\CustomBardClasses;

use ProseMirrorToHtml\Marks\Mark;

class CustomBardClass extends Mark
{
    protected $markType = 'customBardClass';
    protected $tagName = 'span';

    public function matching(): bool
    {
        return $this->mark->type === $this->markType;
    }

    public function tag(): ?array
    {
        return [
            [
                'tag'   => 'span',
                'attrs' => [
                    'class' => 'bard-class '.$this->mark->attrs->key
                ],
            ],
        ];
    }
}
