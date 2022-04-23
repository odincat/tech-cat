module.exports = {
    description: 'Generate a new page with module stylesheet.',
    prompts: [
        {
            type: 'list',
            name: 'project',
            message: 'In which project should the page be placed in?',
            choices: [
                'frontend',
                'catmin'
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'What should the page be named?'
        },
        {
            type: 'confirm',
            name: 'withauth',
            default: false
        },
        {
            type: 'input',
            name: 'subdir',
            default: '/',
            prefix: '/',
            suffix: '/',
            message: 'Should the page be placed in a subdirectory?'
        }
    ],
    actions: [
        {
            type: 'add',
            path: 'apps/{{project}}/pages/{{lowerCase subdir}}/{{lowerCase name}}.tsx',
            templateFile: 'codegen/templates/page.hbs'
        },
        {
            type: 'add',
            path: 'apps/{{project}}/styles/{{pascalCase name}}.module.scss'
        }
    ]
}