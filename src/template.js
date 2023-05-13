module.exports={
    config:`{
    "url": "http://xxx",
    "handleCode": "return res.rows.map(e=>({dictField:e.dictType,dictName:e.dictName}))",
    "typeName": "DictNames",
    "path": "./typing.d.ts",
    "headers":{"Authorization":"Bearer xxx"}
}`,
interfaceCode:(name,code)=>`declare global  { 
    type ${name} = \n
    ${code}
;
}
export {}`,
propertyCode:(name,value)=>` | "${name}" /* ${value} */ \n`
}