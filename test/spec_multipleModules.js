var path = require('path');
var expect = require('chai').expect;
var _ = require('lodash');
var ngRequire = require('../index');

var fixtures = {
    a: './fixtures/multipleModules/a.js',
    b: './fixtures/multipleModules/b.js',
    c: './fixtures/multipleModules/c.js'
};

var folder = './fixtures/multipleModules';

describe('Multiple modules', function () {
    before(function () {
        _.each(fixtures, function (value, key) {
            fixtures[key] = path.resolve(__dirname, value);
        });

        folder = path.resolve(__dirname, folder);
    });

    afterEach(function () {
        ngRequire.clean();
    });

    it('should create a file -> dependencies map', function () {
        ngRequire.update(folder);
        var fileDependenciesMap = ngRequire.getFileDependenciesMap();

        expect(fileDependenciesMap[fixtures.a]).to.have.members([ 'b' ]);
        expect(fileDependenciesMap[fixtures.b]).to.have.members(['a', 'c']);
        expect(fileDependenciesMap[fixtures.c]).to.have.members(['a', 'b']);
    });

    it('should create a module -> files map', function () {
        ngRequire.update(folder);
        var moduleFilesMap = ngRequire.getModuleFilesMap();

        expect(moduleFilesMap['a']).to.have.members([ fixtures.a ]);
        expect(moduleFilesMap['b']).to.have.members([ fixtures.b ]);
        expect(moduleFilesMap['c']).to.have.members([ fixtures.c ]);
    });
});
