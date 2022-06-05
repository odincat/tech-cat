const generateComponent = require('./codegen/generateComponent');
const generatePage = require('./codegen/generatePage');

module.exports = function (plop) {
    plop.setGenerator('component', generateComponent);
    plop.setGenerator('cp', generateComponent);
    plop.setGenerator('page', generatePage);
    plop.setGenerator('p', generatePage);
};
