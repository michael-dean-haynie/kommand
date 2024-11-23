# kommand

## Install
``` sh
# install (globally)
npm install -g @michael-dean-haynie/kommand

# uninstall (globally)
npm uninstall -g @michael-dean-haynie/kommand
```

## Usage
TODO: fill out
``` sh
kd <args>
kommand <args>
```

## Development
``` sh
npm install
npm run watch

# create symlink for for testing locally (see `bin` property in package.json)
npm link

# here is how you can unlink if you want to test by installing from npm instead of locally
npm unlink kommand -g

# symlink (or installing from npm globally) lets you execute the program on your machine like so:
kd <args> # see usage section
kommand <args> # see usage section
```