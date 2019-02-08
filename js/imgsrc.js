const ImageSource = function(name, favicon, bkg, x, o) {
  this.name = name;
  this.favicon = favicon;
  this.background = bkg;
  this.x = x;
  this.o = o;
}

ImageSource.prototype.getBackgroundImage = function () {
  return `url(${this.background})`;
}
ImageSource.prototype.getImage = function (key) {
  return this[key];
}



const localImageSource = new ImageSource('local',
  'img/favicon.png',
  'img/wavegrid.png',
  'img/x.png',
  'img/o.png'
  );
const remoteImageSource = new ImageSource('imgur.com',
  'https://i.imgur.com/WP0IwlI.png',
  'https://i.imgur.com/uiqGtwT.png',
  'https://i.imgur.com/HWSmhUG.png',
  'https://i.imgur.com/IyPq5IU.png'
);


const imgSource = remoteImageSource;

const getImageSrc = key => imgSource.getImage(key);
