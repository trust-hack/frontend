const changeData = async(region)=>{
    const improvement = document.querySelector('#improvement');

    const heat = document.querySelector('#heat');
    const electrical = document.querySelector('#electrical');
    const water = document.querySelector('#water');

    const anomal = document.querySelectorAll('.anomal')

    let data;
    let totalData;

    await fetch('http://87.242.121.216:8080/database/district/get')
    .then(res => res.json())
    .then(resData => data = resData.payload)

    await fetch('http://87.242.121.216:8080/database/region/get')
    .then(res => res.json())
    .then(resData => totalData = resData.payload)

    const sortedTotalData = totalData.filter(item => item['Округ'] ===region)


    improvement.innerHTML = sortedTotalData[0]['Благоустройство']
    heat.innerHTML = sortedTotalData[0]['Отопление']
    electrical.innerHTML = sortedTotalData[0]['Электрика']
    water.innerHTML = sortedTotalData[0]['Сантехника']

    anomal.forEach(item =>{
        item.innerHTML = Math.round(sortedTotalData[0]['Процент_аномальных']) + '% аномальных'
    })


    const sortedData = data.filter(item=> item['Округ'] === region)
    console.log(sortedData);

    const body = document.querySelector('tbody')
    body.innerHTML = ''

    sortedData.forEach(item => {
        body.innerHTML +=`
        <tr>
                          <td class="text-left">${item['Район']}</td>
                          <td>${item['Всего заявок']}</td>
                          <td>${item['Аномальных']}</td>
                          <td>${Math.round(item['Процент_аномальных'])}</td>
                          <td>${item['Сантехника']}</td>
                          <td>${item['Отопление']}</td>
                          <td>${item['Электрика']}</td>
                          <td>${item['Благоустройство']}</td>
                          <td>${item['Прочее']}</td>
            </tr>
        `
    });
}
