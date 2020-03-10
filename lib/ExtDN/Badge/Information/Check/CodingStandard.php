<?php
namespace ExtDN\Badge\Information\Check;

use ExtDN\Badge\Information\CheckAbstract;

class CodingStandard extends CheckAbstract
{

    /**
     * @inheritDoc
     */
    public function getLabel(): string
    {
        return 'Magento Coding Standard';
    }

    /**
     * @inheritDoc
     */
    public function getCode(): string
    {
        return 'coding_standard';
    }

    /**
     * @inheritDoc
     */
    public function getResult(): array
    {
        // @todo: Ugly stuff going on here, but hey, the PHP_CodeSniffer code API is worse
        chdir(__DIR__.'/../../../../..');
        $cmd = 'vendor/bin/phpcs --standard=Magento2 '.$this->getModuleInfo()->getPath().' --ignore-annotations  --report=json';

        ob_start();
        passthru($cmd);
        $contents = ob_get_contents();
        ob_end_clean();

        $data = json_decode($contents, true);
        $warningLevel = 0;
        $warningLevels = [];
        $fileCount = 0;

        foreach ($data['files'] as $file) {
            $fileCount++;

            foreach ($file['messages'] as $message) {
                if(!isset($warningLevels[$message['severity']][$message['source']])) {
                    $warningLevels[$message['severity']][$message['source']] = 0;
                }
                $warningLevels[$message['severity']][$message['source']]++;
                if ($warningLevel < $message['severity']) {
                    $warningLevel = $message['severity'];
                }
            }
        }

        $result = [
            'stars' => min(10 - $warningLevel,5),
            'warnings_at_level' => $warningLevel,
            'warning_level_details' => $warningLevels,
            'number_of_files' => $fileCount,
        ];

        return $result;
    }
}
