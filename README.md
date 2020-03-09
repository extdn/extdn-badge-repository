# ExtDN Badge Repository
Repository for generating ExtDN extension badges.

## Magento 2 checks
The following checks are made on a Magento 2 extension:

### Composer support
An extension needs to include a `composer.json` file. There is no check for this, because it is a bare minimum, not a base for a badge.

### Magento Coding Standard
An extension needs to comply to the Magento Coding Standard.

@todo: Generate this information.

### GraphQL endpoints
An extension is able to offer GraphQL endpoints. The following checks are in place for this:

- See whether a file `etc/schema.graphqls` exists.

### Unit tests
An extension is able to offer unit tests. The following checks are in place for this:

- See whether a folder `Test/Unit` exists.

@todo: Add additional tests when tests are located elsewhere.

### Integration tests
An extension is able to offer integration tests. The following checks are in place for this:

- See whether a folder `Test/Integration` exists.

@todo: Add additional tests when tests are located elsewhere.

### MFTF tests
An extension is able to offer MFTF tests. The following checks are in place for this:

- See whether a folder `Test/Mftf` exists.

@todo: Add additional tests when tests are located elsewhere.

## Development
This repository ships with various tools to generate badgets. First of all, the `extensions/` folder holds JSON files, each file representing a badge for a specific extension. To generate a new JSON file, clone this repository and run `composer install`. Next, you can use the CLI tool `scripts/extdn_badge_information_generator.php` to point it to an extension folder:

    php scripts/extdn_badge_information_generator.php /my/extension/folder

The output will show JSON which can then be added to a new file in the `extensions/` folder.
