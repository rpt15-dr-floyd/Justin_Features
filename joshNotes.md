** Installs **
```npm install webpack webpack-cli @babel/cli @babel/core @babel/preset-react react react-dom express faker mongoose nodemon body-parser```
```npm install express faker mongoose nodemon body-parser```
```npm install style-loader css-loader --save-dev```
```npm install @babel/preset-env babel-loader --save```

** Mongo Setup **
1. Install Homebrew
``` /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" ```
2. HomebrewTap into Mongo
```brew tap mongodb/brew```
3. Install Mongo via Homebrew
```brew install mongodb-community@4.2```
4. Run Mongo
``` mongod --config /usr/local/etc/mongod.conf ```



** Test Data Seeding**
1. start mongo
```mongod --config /usr/local/etc/mongod.conf```
run scripts
``` npm start ```
``` npm run seed```



Bryans Skillz
use 'cmd' + opt" + arrow for multiple cursors