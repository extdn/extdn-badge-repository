var getExtDNBadge = function (extensionId, badgeCallback) {
    getExtDNBadgeInformation(extensionId, function(status, badgeInformation) {
        function getYesOrNo(value) {
            return (value ? '<span class="yes">Yes</span>' : '<span class="no">No</span>');
        }

        console.log('ExtDN badge information', badgeInformation);
        var badgeHtml = '<div class="extdn-extension-badge">';
        badgeHtml += '<h4>' + badgeInformation.module_name + '</h4>';
        badgeHtml += 'Composer: <code>' + badgeInformation.composer_name + '</code><br/>';
        badgeHtml += 'Warning-free level: ' + badgeInformation.checks.coding_standard.warnings_at_level + '<br/>';
        badgeHtml += 'GraphQL endpoint: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>';
        badgeHtml += 'Unit tests: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>';
        badgeHtml += 'Integration tests: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>';
        badgeHtml += 'MFTF tests: ' + getYesOrNo(badgeInformation.checks.graphql_endpoint) + '<br/>';
        badgeHtml += '</div>';
        badgeCallback(badgeHtml);
    })
};

var getExtDNBadgeInformation = function (extensionId, callback) {
    var badgeUrl = 'https://raw.githubusercontent.com/extdn/extdn-badge-repository/master/extensions/' + extensionId + '.json';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', badgeUrl, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            var response = xhr.response;
            response.image_url = 'https://extdn.org/wp-content/uploads/2015/10/Logo-EXTDN-for-black-BG.png';
            callback(null, response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
