# MediaKeysPlugin adapter

mediaKeysPlugin = {}

if window.fluid
  mediaKeysPlugin.forward = () -> console.log('>> pressed')
  mediaKeysPlugin.backward = () -> console.log('<< pressed')
  mediaKeysPlugin.play = () -> console.log('play/pause pressed')
