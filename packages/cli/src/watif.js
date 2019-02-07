const program = require('commander')

program.version('0.0.0') // TODO: parse this out of package.json

program.on('command:*', () => {
  console.error('invalid command')
  program.outputHelp()
  process.exit(1)
})

program
  .command('init <dir>')
  .description('create a new watif story in the specified directory')
  .option('-t, --title <title>', 'the title of the new story')
  .action((dir, cmd) => {
    console.log('init command!', dir, cmd.opts())
  })

program
  .command('build')
  .description('build the story and create the compiled story.js file')
  .action(() => {
    console.log('build command!')
  })

program
  .command('start')
  .description('start the watif debug server and view the story in a browser')
  .action(() => {
    console.log('start command!')
  })

program.parse(process.argv)
