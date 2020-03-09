<?php
declare(strict_types=1);

namespace ExtDN\Badge\Information;

use SimpleXMLElement;

/**
 * Class ModuleInfo
 * @package ExtDN\Badge\Information
 */
class ModuleInfo
{
    /**
     * @var string
     */
    private $path = '';

    /**
     * @return string
     */
    public function getPath(): string
    {
        return $this->path;
    }

    /**
     * @param string $path
     */
    public function setPath(string $path)
    {
        $this->path = $path;
    }

    /**
     * @return array
     */
    public function getDetails(): array
    {
        $details = [];
        $details = array_merge($details, $this->getMagentoDetails());
        $details = array_merge($details, $this->getComposerDetails());
        return $details;
    }

    private function getComposerDetails(): array
    {
        $composerFile = $this->getPath() . '/composer.json';
        $composerData = json_decode(file_get_contents($composerFile), true);

        return [
            'composer_name' => $composerData['name'],
            'composer_version' => $composerData['version']
        ];
    }

    /**
     * @return array
     */
    private function getMagentoDetails(): array
    {
        $moduleXmlFile = $this->getPath() . '/etc/module.xml';
        $moduleXmlContents = file_get_contents($moduleXmlFile);
        $xml = new SimpleXMLElement($moduleXmlContents);

        return [
            'type' => 'magento2-module',
            'module_name' => (string)$xml->module['name']
        ];
    }
}
