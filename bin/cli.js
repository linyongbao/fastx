#!/usr/bin/env node
const { program } = require('commander');
const path = require('path');
const { loadConfig } = require('../lib/config');
const { createProjectStructure } = require('../lib/create');

program
  .version('1.0.0')
  .command('create <project-name>')
  .description('Create a new project')
  .action(async (projectName) => {
    const projectPath = path.resolve(process.cwd(), projectName);
    // 2. 调用 create.js 中的 createProjectStructure 方法
    await createProjectStructure(projectPath, projectName);

  });

program.parse(process.argv);