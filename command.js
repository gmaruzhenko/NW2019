/**
* recieve a blob from the website and send it to azure then get a json file and send it back
*/
module.exports = async (dummy = 0, data) => {
  if (data.size > 0) {return 1;}
  else {return 0;}
};