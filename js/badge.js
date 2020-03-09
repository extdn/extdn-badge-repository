var getExtDNBadge = function (extensionId, badgeCallback) {
    getExtDNBadgeInformation(extensionId, function (status, badgeInformation) {
        function getYesOrNo(value) {
            return (value ? '<span class="yes">Yes</span>' : '<span class="no">No</span>');
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
            + '<h4>' + badgeInformation.module_name + '</h4>'
            + 'Composer: <code>' + badgeInformation.composer_name + '</code><br/>'
            + 'Warning-free level: ' + badgeInformation.checks.coding_standard.warnings_at_level + '<br/>'
            + 'GraphQL endpoint: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>'
            + 'Unit tests: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>'
            + 'Integration tests: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>'
            + 'MFTF tests: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>'
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
