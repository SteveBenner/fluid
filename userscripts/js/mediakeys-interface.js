var mediaKeysPlugin;

mediaKeysPlugin = {};

if (window.fluid) {
  mediaKeysPlugin.forward = function() {
    return console.log('>> pressed');
  };
  mediaKeysPlugin.backward = function() {
    return console.log('<< pressed');
  };
  mediaKeysPlugin.play = function() {
    return console.log('play/pause pressed');
  };
}
