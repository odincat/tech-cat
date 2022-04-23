module.exports = {
    description: 'Generate a new component with module stylesheet.',
    prompts: [
        {
            type: 'list',
            name: 'project',
            message: 'In which project should the component be placed in?',
            choices: [
                'frontend',
                'catmin'
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'What should the component be named?'
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
            path: 'apps/{{project}}/components/{{lowerCase subdir}}/{{camelCase name}}/{{pascalCase name}}.tsx',
            templateFile: 'codegen/templates/component.hbs'
        },
        {
            type: 'add',
            path: 'apps/{{project}}/components/{{lowerCase subdir}}/{{camelCase name}}/{{pascalCase name}}.module.scss'
        }
    ]
}