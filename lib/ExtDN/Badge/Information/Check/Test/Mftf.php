<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information\Check\Test;

use ExtDN\Badge\Information\CheckAbstract;

class Mftf extends CheckAbstract
{
    public function getLabel(): string
    {
        return 'MFTF tests';
    }

    /**
     * @inheritDoc
     */
    public function getCode(): string
    {
        return 'test.mftf';
    }

    /**
     * @inheritDoc
     */
    public function getResult(): bool
    {
        if (is_dir($this->getModuleInfo()->getPath().'/Test/Mftf')) {
            return true;
        }

        return false;
    }
}
