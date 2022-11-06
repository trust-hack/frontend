
const getData = async()=>{
    
    let data; 
    let total;
     await fetch('http://87.242.121.216:8080/database/region/get')
    .then(res => res.json())
    .then(respData => data = respData.payload)
    console.log(data);

    await fetch('http://87.242.121.216:8080/database/defect/get')
    .then(res => res.json())
    .then(resData =>  total = resData.payload)
    console.log(total)

    const body = document.querySelector('tbody')

    const improvementNum = document.querySelector('#improvementNum')
/*     const improvementPers = document.querySelector('#improvementPers') */

    const heatNum = document.querySelector('#heatNum')
/*     const heatPers = document.querySelector('#heatPers') */

    const electrNum = document.querySelector('#electrNum')
/*     const electrPers = document.querySelector('#electrPers') */

    const waterNum = document.querySelector('#waterNum')
/*     const waterPers = document.querySelector('#waterPers') */

    total.forEach(item =>{
        switch (item['Наименование категории дефекта']){
            case 'Электрика':
                electrNum.innerHTML = item['Всего'] 
            case 'Отопление':
                heatNum.innerHTML = item['Всего'] 
            case 'Благоустройство':
                improvementNum.innerHTML = item['Всего'] 
            case 'Водосчетчики':
                waterNum.innerHTML = item['Всего'] 
        }
    })


    body.innerHTML = '';

    data.forEach(item => {

        let fullName ='';
        switch (item['Округ']){
            case 'ЦАО':
                fullName = '(Центральный административный округ)'
            case 'САО':
                fullName = '(Северный административный округ)'
            case 'СВАО':
                fullName = '(Северо-Восточный административный округ)'
            case 'ВАО':
                fullName = '(Восточный административный округ)'
            case 'ЮВАО':
                fullName = '(Юго-восточный административный округ)'
            case 'ЮАО':
                fullName = '(Южный административный округ)'
            case 'ЮЗАО':
                fullName = '(Юго-западный административный округ)'
            case 'ЗАО':
                fullName = '(Западный административный округ)'
            case 'СЗАО':
                fullName = '(Северо-Западный административный округ)'
        }
        body.innerHTML +=`
        <tr>
        <td>
            <a href="pages/okr/cao.html">
                <span class="mdc-button-main"> 
                    ${item['Округ'] + fullName}
                </span>
            </a> 
        </td>
        <td class="text-right">${item['Всего заявок']}</td>
        <td class=" font-weight-medium text-right"> ${Math.round(item['Процент_аномальных'])}% </td>
      </tr>
        
        `
    });
}
getData()