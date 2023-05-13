const fs=require("fs")
const path=require("path")
const template = require("./template")
const fetch =require("node-fetch").default;

function createConfigDetault(){
    let filePath=path.resolve(process.cwd(),'.gendict.json')
    fs.writeFileSync(filePath,template.config,{flag:"w"})
}
function perseConfig(){}
function getRemoteData(params){
    return fetch(params.url,{method:"GET",headers:params.headers}).then(res=>{
       return res.json()
    })
}

function loadConfig(){
    // 加载配置文件
    let filePath=path.resolve(process.cwd(),'.gendict.json')
    let config=fs.readFileSync(filePath,{encoding:"utf-8"})
    return JSON.parse(config)
}
function codeToFile(code,filePath){
    // 写入文件
    fs.writeFileSync(filePath,code,{flag:"w"})

}
function translation(config,result){
    const propertyCodeStr=result.map(item=>template.propertyCode(item.dictField,item.dictName)).join("")
    return template.interfaceCode(config.typeName,propertyCodeStr)
}
function main(loopTime){
    let config=loadConfig()
    let count=1
    function task(){
        getRemoteData(config).then(res=>{
            let result=new Function("res",config.handleCode)(res)
            if(!Array.isArray(result)){
                throw "no a Array"
            }
            if(result.length==0){
                throw "array length is zero"
            }
            console.log("字典数量:",result.length);
            const interfaceCodeStr=translation(config,result)
            let filePath=path.resolve(process.cwd(),config.path)
            codeToFile(interfaceCodeStr,filePath)
            console.log("写入成功",filePath);
        }).catch(err=>{
            console.log("err",err);
        })
    }
    task()
    if(loopTime>4999){
        
        setInterval(()=>{
            console.log("--------------------------------------------------------------\n 进入轮训",count++);
            task()},loopTime)
    }
}
module.exports={
    createConfigDetault,getRemoteData,perseConfig,main
}