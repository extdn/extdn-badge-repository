<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information\Check\Test;

use ExtDN\Badge\Information\CheckAbstract;

class Unit extends CheckAbstract
{
    public function getLabel(): string
    {
        return 'Unit tests';
    }

    /**
     * @inheritDoc
     */
    public function getCode(): string
    {
        return 'test.unit';
    }

    /**
     * @inheritDoc
     */
    public function getResult(): bool
    {
        if (is_dir($this->getModuleInfo()->getPath() . '/Test/Unit')) {
            return true;
        }

        return false;
    }
}
