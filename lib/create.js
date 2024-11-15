const fs = require('fs').promises;
const path = require('path')

const version = require('../package.json').version;
// 使用版本号

async function createProjectStructure(projectPath, projectName) {
try {
    // 创建项目目录
    await fs.mkdir(projectPath);
    await fs.mkdir(path.join(projectPath, 'src'));
    await fs.mkdir(path.join(projectPath, 'public'));
    
    // 创建其他必要文件
    const templatePath = path.join(__dirname, '../templates');
    
    // 复制模板文件
    const templates = {
      'fastp.config.js': '/',
      'public/index.html': '/public/',
      'src/index.js': '/src/',
      'src/store.js': '/src/',
      'src/styles.css': '/src/'
    };

    for (const [file, dir] of Object.entries(templates)) {
      const content = await fs.readFile(path.join(templatePath, file), 'utf-8');
      await fs.writeFile(path.join(projectPath, dir, path.basename(file)), content);
    }

    // 创建 package.json
    const packageJson = {
      name: projectName,
      version: '1.0.0',
      scripts: {
        dev: 'fastp dev',
        build: 'fastp build'
      },
      dependencies: {
        "lyb-fastp":  `^1.1.5-alpha.3`,
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "mobx": "^6.3.12",
        "mobx-react-lite": "^3.2.2"
      }
    };

    await fs.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    console.log(`
Project ${projectName} created successfully!
To get started:

cd ${projectName}
npm install
npm run dev
    `);
  } catch (err) {
    console.error('Failed to create project:', err);
  }
}
module.exports = { createProjectStructure };