const cli = require('cac')()
const { createConfigDetault, getRemoteData,main } = require('./util')
cli.option('--loop <loop>', '确认轮训时间', {
    default: 0,
  })
const parsed = cli.parse()
if(parsed.args[0]=="init"){ 
    createConfigDetault()
}else{
    main(parsed.options.loop)
}