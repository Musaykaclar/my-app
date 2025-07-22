import Parse from 'parse';

Parse.initialize('musa.321', '');  // appId, jsKey boş bırakabiliriz
Parse.serverURL = 'http://localhost:1337/parse';  // Backend URL

export default Parse;
