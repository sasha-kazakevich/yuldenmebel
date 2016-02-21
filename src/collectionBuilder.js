'use strict'

const path = require('path')
const find = require('find')

const found = _ =>
    find
      .dirSync('../img/info')
      .reduce((accD,curDir) => {
        accD[path.basename(curDir)] =
          find
            .fileSync(/\.(jpg)|(png)$/, './'+curDir)
            .map(img => {
              img = img.split(path.sep)
              img.shift()
              img.unshift('.')
              return img.join('/')
            })
            .reduce((accI,curImg,curIndex) => {
              accI[curIndex % accI.length].push(curImg)
              return accI
            },[[],[],[]])

        return accD
      }, {})
module.exports = found
