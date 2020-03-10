var getExtDNBadge = function (extensionId, badgeCallback) {
    getExtDNBadgeInformation(extensionId, function (status, badgeInformation) {
        console.log('ExtDN badge information', badgeInformation);
        var badgeHtml = '<div class="extdn-extension-badge">'
            + '<div class="image">' + getPictureSet(badgeInformation) + '</div>'
            + '<div class="heading">'
            + '<h4>ExtDN verified</h4>'
            + '<h3>' + badgeInformation.module_name + '</h3>'
            + '</div>'
            + '<div class="content">' + getChecksContent(badgeInformation) + '</div>'
            + '</div>';

        badgeCallback(badgeHtml);

        function getYesOrNo(value) {
            return (value === true ? '<span class="yes">Yes</span>' : '<span class="no">No</span>');
        }

        function getPictureSet(badgeInformation) {
            return '<picture>'
                + '<source srcset="' + badgeInformation.image_webp + '" type="image/webp">'
                + '<source srcset="' + badgeInformation.image_png + '" type="image/png">'
                + '<img alt="' + badgeInformation.module_name + '" title="' + badgeInformation.module_name + '" src="' + badgeInformation.image_png + '">'
                + '</picture>';
        }

        function getChecksContent(badgeInformation) {
            var html = '';

            function printLine(name, value, hint) {
                if (name) html += '<span class="name" title="' + hint + '">' + name + '</span>: ';
                html += '<span class="value" title="' + hint + '">' + value + '</span><br/>'
            }

            printLine('', '<div class="stars">Rating ' + badgeInformation.checks.coding_standard.stars + '</div>', 'A simple rating calculated from the PHPCS warning level');
            printLine('Composer', badgeInformation.composer_name, 'The composer key of this extension package');

            printLine('GraphQL endpoint', getYesOrNo(badgeInformation.checks.graphql_endpoint));
            printLine('Marketplace compliant', getYesOrNo(badgeInformation.checks.coding_standard.warnings_at_level < 10), 'Quick check to see if this extension is compliant to Magento Marketplace coding rules');
            printLine('PHPCS Warning Level', badgeInformation.checks.coding_standard.warnings_at_level, 'The level at which there are warnings from the Magento Coding Standard. Level 10 means that the extension is not accepted on the Magento Marketplace.');

            if (badgeInformation.checks.graphql_endpoint > 0) {
                printLine('GraphQL endpoint', getYesOrNo(badgeInformation.checks.graphql_endpoint));
            }

            printLine('Unit tests', getYesOrNo(badgeInformation.checks.test_unit));
            printLine('Integration tests', getYesOrNo(badgeInformation.checks.test_integration));
            printLine('MFTF tests', getYesOrNo(badgeInformation.checks.test_mftf));
            printLine('Number of files', badgeInformation.checks.coding_standard.number_of_files);

            return html;
        }
    })
};

var getExtDNBadgeInformation = function (extensionId, callback) {
    var badgeUrl = '../extensions/' + extensionId + '.json';
    //var badgeUrl = 'https://raw.githubusercontent.com/extdn/extdn-badge-repository/master/extensions/' + extensionId + '.json';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', badgeUrl, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            var response = xhr.response;
            response.image_png = '../images/extdn-badge-logo.png';
            response.image_webp = '../images/extdn-badge-logo.webp';
            callback(null, response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
