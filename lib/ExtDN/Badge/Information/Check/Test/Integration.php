<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information\Check\Test;

use ExtDN\Badge\Information\CheckAbstract;

class Integration extends CheckAbstract
{
    public function getLabel(): string
    {
        return 'Integration tests';
    }

    /**
     * @inheritDoc
     */
    public function getCode(): string
    {
        return 'test.integration';
    }

    /**
     * @inheritDoc
     */
    public function getResult(): bool
    {
        if (is_dir($this->getModuleInfo()->getPath().'/Test/Integration')) {
            return true;
        }

        return false;
    }
}
