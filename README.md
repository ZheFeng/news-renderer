# News Renderer Coding Challenge

**[Live Demo](https://afternoon-tundra-63516.herokuapp.com/ "Live Demo")**

**[Live Full Documentation](https://afternoon-tundra-63516.herokuapp.com/doc/ "Live Full Documentation")**

**[Live Test Coverage](https://afternoon-tundra-63516.herokuapp.com/coverage/ "Live Test Coverage")**

The live site is hosted on heroku, if you feel the speed is slow, you and setup and run in your local machine.

### Environment
This app is build base on nodejs. If you don't have nodejs installed in your system, here is the [instruction](https://nodejs.org/en/ "Install Nodejs").

### Install dependencies
To run the app locally, you need to install the dependency packages first.

    npm install


### Start the app (development)
To run the app, you just need to simply type ``npm start``. As default, the **NODE_ENV** is set to **development**

    npm start
    > news-renderer@0.0.0 start /Users/zhefeng/development/news-renderer
    > node --harmony ./bin/www

    info: [04-19 01:57:07]: wating to start the server...
    info: [development] Starting server...
    info: Starting development server...
    info: Dev server is now running on http://localhost:3000
    info: [04-19 01:57:12]: Server started, listening on port 8080

Then, you can access [localhost:3000](http://localhost:3000 "localhost:3000")

### Start the app (production)
To start the app in production env, you need to build it first. The webpack will build all necessary scripts and css into one js file with hashed file name, then we can easy to cache it with out worry about update-cache issue.

    npm run build

When you run build, we will auto test, build coverage report and build documentation **automatically**.

Then you can start the server when NODE_ENV:

    NODE_ENV=production npm start
    > news-renderer@0.0.0 start /Users/zhefeng/development/news-renderer
    > node --harmony ./bin/www

    info: [04-19 02:03:33]: wating to start the server...
    info: [production] Starting server...
    info: [04-19 02:03:37]: Server started, listening on port 3000

Then, you can access [localhost:3000](http://localhost:3000 "localhost:3000")

### Test the app
To test the app, just simply type ``npm test``.

    npm test
    > news-renderer@0.0.0 pretest /Users/zhefeng/development/news-renderer
    > rm -rf coverage && rm -rf doc


    > news-renderer@0.0.0 test /Users/zhefeng/development/news-renderer
    > jest --coverage --verbose

    Using Jest CLI v11.0.2, jasmine2, babel-jest
     PASS  app/utilities/__tests__/shallowEqual.js (0.41s)
    shallowEqual
      ✓ it 1 should equal to 1
      ✓ it objA should equal to objB
      ✓ it objA should not equal to objB

     PASS  app/components/__tests__/NewsDetail.js (0.474s)
    NewsDetail
      ✓ it should render a div as the root
      ✓ it should call props callback when call onBackClick

    .........

    39 tests passed (39 total in 8 test suites, run time 2.923s)

After test, the coverage html report will automatically generated, you can access by [Test Coverage](http://localhost:3000/coverage/index.html "Test Coverage")

### Build documentation
To build documentation, just simply type ``npm run esdoc``.

    npm run esdoc

Then you can access by [Full Documentation](http://localhost:3000/doc/ "Full Documentation")

### Eslint
To make sure the code style, this project useing eslint to check the code format, just simply type ``npm run eslint``.

    npm run eslint

### How another person would easily understand the code
By reading the documentation, it's can be easy to find out the code structure.

And the code build base on node module system and ES2015(OO, Class), so it's very easy to include the app or a part of component in any other project.

### The build process
This project use webpack and webpack-dev-server to develop and build the code.

By using webpack-dev-server, the page will be auto reload while you update the code.

By using webpack, all code (include css, less, js etc..) will be wrap into one compressed js file (you can easily config to splt file as you want). And all files (include images) will be recreated with a hash file name (hash base on the file content). Which means you can always set the browser cache as long as you want without worry about clear cache issue.

In this project, we put all build file in public/dist folder.

### Templating engines
Base on the FE Coding Challenge.pdf, this project can use third party framework, but from Danielle Clewett's message:
>not to use any front-end frameworks like jQuery and Angular. Testing frameworks (make sure it is tested), NPM, gulp/grunt are all completely fine.

Then, this project didn't use not just framework, but also any thrid part lib. So there is not using any Template engines. All using the native dom api build the dom.

### Multiple platforms/devices
The style for this project is responsive. So you can run this app on all morden browser in multiple devices.

### How different website include this app
After we build the app and put it on a server or cdn service. Then other site can just simply add the js reference into there page.

The app export on global function call newsRenderer, after add the js reference, just need to add online code to excute it

    window.newsRenderer(document.getElementById('app'), 3);

And There are may other option you can set

    window.newsRenderer(
      document.getElementById('app'),
      numberPerPage,
      offset,
      search,
      orderBy,
      orderDesc
    );

More detail can be found [Here](https://afternoon-tundra-63516.herokuapp.com/doc/class/app/components/App.js~App.html "Full Documentation")


Have fun! :)
