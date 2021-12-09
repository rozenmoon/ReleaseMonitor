Note: This is a Mercari Hackweek project by @rozenmoon (6/12/2021)

# Release Monitor

We will visualize github commit to certain repo and branch which affects Production

## Why 

For everyone in the compnay to know a change has happend in the production. This is help with incident handelling and error logging (by tracking which release might have cause the problem)

## How to run locally

- Set the node verion to `v16.13.1` 
    - `nvm install v.16.13.1`
    - `nvm use v16.13.1`
- `npm i`
- `npm run build`
- `npm run start`
- Check `http://localhost:9000/` in browser