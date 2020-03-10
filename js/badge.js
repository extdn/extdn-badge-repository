var getExtDNBadge = function (extensionId, badgeCallback) {
    getExtDNBadgeInformation(extensionId, function (status, badgeInformation) {
        function getYesOrNo(value) {
            return (value === true ? '<span class="yes">Yes</span>' : '<span class="no">No</span>');
        }

        console.log('ExtDN badge information', badgeInformation);
        var badgeHtml = '<div class="extdn-extension-badge">'
            + '<div class="image">'
            + '<picture>'
            + '<source srcset="' + badgeInformation.image_webp + '" type="image/webp">'
            + '<source srcset="' + badgeInformation.image_png + '" type="image/png">'
            + '<img alt="' + badgeInformation.module_name + '" title="' + badgeInformation.module_name + '" src="' + badgeInformation.image_png + '">'
            + '</picture>'
            + '</div>'
            + '<div class="heading">'
            + '<h4>ExtDN verified</h4>'
            + '<h3>' + badgeInformation.module_name + '</h3>'
            + '</div>'
            + '<div class="content">'
            + '<span title="The composer key of this extension package"><code>' + badgeInformation.composer_name + '</code></span><br/>'
            + '<span title="The level at which there are no warnings from the Magento Coding Standard. Level 10 means that the extension is not accepted on the Magento Marketplace.">Warning-free level: ' + (badgeInformation.checks.coding_standard.warnings_at_level + 1) + '</span><br/>'
            + '<span title="If a GraphQL endpoint exists, this could be used within PWA technologies.">GraphQL endpoint: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '</span><br/>'
            + 'Unit tests: ' + getYesOrNo(badgeInformation.checks.test_unit) + '<br/>'
            + 'Integration tests: ' + getYesOrNo(badgeInformation.checks.test_integration) + '<br/>'
            + 'MFTF tests: ' + getYesOrNo(badgeInformation.checks.test_mftf) + '<br/>'
            + '</div>'
            + '</div>';

        badgeCallback(badgeHtml);
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
