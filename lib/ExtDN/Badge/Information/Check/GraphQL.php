<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information\Check;

use ExtDN\Badge\Information\CheckAbstract;

/**
 * Class GraphQL
 * @package ExtDN\Badge\Information\Check
 */
class GraphQL extends CheckAbstract
{
    /**
     * @return string
     */
    public function getLabel(): string
    {
        return 'GraphQL Support';
    }

    /**
     * @inheritDoc
     */
    public function getCode(): string
    {
        return 'graphql';
    }

    /**
     * @inheritDoc
     */
    public function getResult(): bool
    {
        if (is_file($this->getModuleInfo()->getPath().'/etc/schema.graphqls')) {
            return true;
        }

        return false;
    }
}
