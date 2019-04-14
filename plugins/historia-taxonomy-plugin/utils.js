const path = require('path')

const getDirectory = file => {
  return file.relativeDirectory.replace(/^posts(\/|$)/, '/')
}

exports.getPath = (file, index = '/') => {
  const directory = getDirectory(file)
  if (!directory) {
    return
  }

  return path.join(directory, file.name === 'index' ? index : file.name)
}
