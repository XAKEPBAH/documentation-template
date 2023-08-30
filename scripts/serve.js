const {startDevServer} = require('@web/dev-server');
const path = require('path');
const {exec} = require('child_process');

const options = {
  config: {
    rootDir: process.cwd(),
    basePath: path.join(process.cwd(), 'docs-html'),
    open: path.join('docs-html', 'index.html'),
    watch: true,
    plugins: [{
      name: '@diplodoc/docs rebuild',
      serverStart(parameters) {
        const {fileWatcher} = parameters;

        fileWatcher.on('change', (path, stats) => {
          exec('npm run build:docs');
        });

        fileWatcher.add('docs/**/*')
      }
    }],
  },
};

(async () => {
  const server = await startDevServer(options);
})();