# kommand

## Development
``` sh
npm install
npm run watch

# create symlink for for testing locally (see `bin` property in package.json)
npm link

# here is how you can unlink if you want to test by installing from npm instead of locally
npm unlink kommand -g

# symlink (or installing from npm globally) lets you execute the program on your machine like so:
kd <args>
kommand <args>
```