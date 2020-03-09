<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information;

use ExtDN\Badge\Information\Check\GraphQL;
use ExtDN\Badge\Information\Check\Test\Integration;
use ExtDN\Badge\Information\Check\Test\Mftf;
use ExtDN\Badge\Information\Check\Test\Unit;
use RuntimeException;

/**
 * Class Generator
 * @package ExtDN\Badge\Information
 */
class Generator
{
    /**
     * @var array
     */
    private $data = [];

    /**
     * @var ModuleInfo
     */
    private $moduleInfo = null;

    /**
     * @return string
     */
    public function getJson(): string
    {
        return json_encode($this->data, JSON_PRETTY_PRINT + JSON_UNESCAPED_SLASHES)."\n";
    }

    /**
     * @return array
     */
    public function generate(string $modulePath): array
    {
        $this->setModuleInfo($modulePath);
        $this->data = $this->getModuleInfo()->getDetails();
        $this->data['checks'] = [];

        foreach ($this->getCheckList() as $check) {
            $check->setModuleInfo($this->moduleInfo);
            $this->data['checks'][$check->getCode()] = $check->getResult();
        }

        return $this->data;
    }

    /**
     * @return CheckInterface[]
     */
    public function getCheckList(): array
    {
        return [
            new GraphQL,
            new Unit,
            new Integration,
            new Mftf
        ];
    }

    /**
     * @param string $modulePath
     */
    private function setModuleInfo(string $modulePath)
    {
        if (!is_dir($modulePath)) {
            throw new RuntimeException('Unable to read from module path "'.$modulePath.'"');
        }

        $this->moduleInfo = new ModuleInfo();
        $this->moduleInfo->setPath($modulePath);
    }

    /**
     * @return ModuleInfo
     */
    private function getModuleInfo(): ModuleInfo
    {
        return $this->moduleInfo;
    }
}
