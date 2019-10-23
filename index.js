const request = require('request');
const cheerio = require('cheerio');
const HTML = require('html-parse-stringify')




// BL
var url = 'https://bachlongmobile.com/iphone-xi-pro-max.html';
url = 'https://bachlongmobile.com/iphone-11-pro-max-512gb-chinh-hang.html'
// url = 'https://bachlongmobile.com/samsung-galaxy-note-10-plus-chua-kich-6060-chua-active.html'
// url = 'https://bachlongmobile.com/iphone-11-pro-256gb-cong-ty.html'

let classPrice = '.options-list.color-list';
classPrice = '.price';


let option = {
    url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
}

 function dataWeb(){
    return new Promise( (resolve, reject)=>{
        request(option,
            (err, res, html) => {
                if (!err && res.statusCode == 200) {
                    let dom = cheerio.load(html);
                    {
                        let allPrice =''
                        var listPrice = dom('.options-list.color-list')
                        let onePrice = parseInt(dom('.price').text().split('₫')[0].replace(/\./g, ''))
        
                        // Lấy giá theo thứ tự
                        if(listPrice.text().split('₫').length < 2){
                            resolve(onePrice)
                        }else {
                            var html1 = HTML.parse(listPrice.html());
        
                        let onePrice = parseInt(dom('.price').text().split('₫')[0].replace(/\./g, ''))
                        for(let i=0; i< html1.length; i++){
                            let color = html1[i].children[1].children[0].children[0].content
                            let priceAdd = parseInt(html1[i].children[0].attrs.price) + parseInt(onePrice)
        
                            let str = `${color}: ${new Intl.NumberFormat( { style: 'currency', currency: 'EUR' }).format(priceAdd)}`
                            allPrice+= str
                        }
                        }
                        resolve(allPrice)
                    }
                 
                } else {
                    reject('ERRROR')
                }
            })
    }) 
    
}
async function abc(){

    // Trả về kết quả như mong muốn
    console.log('Mong muon\n')
    let a = await dataWeb()
    console.log(a)
    console.log('END.......OUT')

    // Thử một cách khác
    console.log('\nKhong mong muon\n')
    let b = dataWeb()
    b.then(data => console.log(data))
    .catch(err => console.log(err))
    console.log('END.......OUT')
}
abc()


