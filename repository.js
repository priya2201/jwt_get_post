const fs=require('fs');
class Repository{
    constructor(filename){
        if(!filename){
            throw new Error('filename is required to create a datastore!');

        }
        this.filename=filename
        try{
            fs.accessSync(this.filename)
        }catch(err){
fs.writeFileSync(this.filename,'[]')
        }
    }
async getAll(){
    return JSON.parse(
        await fs.promises.readFile(this.filename,{
            encoding:'utf8'
        })
    )
}
async create(attrs){
    const records=await this.getAll()
    records.push(attrs)
    await fs.promises.writeFile(
       this.filename,
        JSON.stringify(records,null,2)
    )
    return attrs
}

}
module.exports=new Repository('datastore.json')