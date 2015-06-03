## Getting Started

This app uses the harp server to run the static page. You need some sort of server for the static assets to be allowed to make ajax requests.

Here are instructions to get up and running using harp. If this fails, you can also try copying and pasting `www/index.html` `www/main.css` and `www/main.js` into the public folder of any sinatra app.

- Install nvm
- Install node
- Install harp: http://harpjs.com/
- Edit your `/etc/hosts`

```
# /etc/hosts
127.0.0.1  localhost.dev
```

- Start the harp server

```
harp server
```

- Point the browser to `http://localhost.dev:9000`

## Demo Notes

### Using Ajax to access an external API

Make a request to the lcbo api

Display a list of drinks on the left side of the page.

### Data Attributes

When the user clicks on a drink on the left side, display the information on the right. (name, picture, company, price)

