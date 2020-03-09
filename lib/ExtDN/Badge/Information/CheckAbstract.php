<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information;

/**
 * Class CheckAbstract
 * @package ExtDN\Badge\Information
 */
abstract class CheckAbstract implements CheckInterface
{
    /**
     * @var ModuleInfo
     */
    private $moduleInfo;

    /**
     * @return ModuleInfo
     */
    public function getModuleInfo(): ModuleInfo
    {
        return $this->moduleInfo;
    }

    /**
     * @param ModuleInfo $moduleInfo
     */
    public function setModuleInfo(ModuleInfo $moduleInfo): void
    {
        $this->moduleInfo = $moduleInfo;
    }
}
