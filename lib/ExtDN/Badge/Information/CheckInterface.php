<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information;

/**
 * Interface CheckInterface
 * @package ExtDN\Badge\Information
 */
interface CheckInterface
{
    /**
     * @return string
     */
    public function getLabel(): string;

    /**
     * @return string
     */
    public function getCode(): string;

    /**
     * @return mixed
     */
    public function getResult();
}
