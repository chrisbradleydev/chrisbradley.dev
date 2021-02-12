const path = require('path');

module.exports = {
    sassOptions: {
        includePaths: ['node_modules', 'styles'].map(d => path.join(__dirname, d)),
    },
};
