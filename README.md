# MFA Factor Management Application

This is a sample app to show how a user can enroll for MFA factors and manage their MFA factors. 

## Running the Sample

1. Install the dependencies with npm:

```bash
npm install
```

2. Edit `config.js` to set environmental variables.

3. Run the app locally:

```bash
npm start
```

   Or, deploy to a webtask:

```bash
wt create server.js --name credmgr2 -p CONTAINER_NAME_HERE -b
```

