fetch('/data')
.then(response => response.json())
.then(data => {
  // console.log(data);
  data.map((row) => {
    console.log(`${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}, ${row[7]}, ${row[8]}, ${row[9]}, ${row[10]}`);
  });

// Top Summary Insights
  let allData = document.getElementById("users").innerHTML = data.length-1;

//Tabular Data
  let myData = document.getElementById("t01")
    for(let i = 1; i < data.length; i++) {
         // create a new row
         let newRow = myData.insertRow(myData.length);
               for(let j = 0; j < data[i].length; j++)
               {
                   let cell = newRow.insertCell(j);
                   cell.innerHTML = data[i][j];
               }
           }

let arr = data.map(myArray)
function myArray(num){
  return num
}

let newData = arr;
let newArray = [];
let myClients = [];
let mySalesMen = [];
let myOrganizations = [];
let myTime = [];
for (i = 0; i < newData.length; i++) {
    let newArr = newData[i].slice(i, i+1).toString().split(",");
    // console.log(newData[i])

    let col1 = newData[i][0];
    let col2 = newData[i][1];
    let col3 = newData[i][2];
    let col4 = newData[i][3];
    let col5 = newData[i][4];
    let col6 = newData[i][5];
    let col7 = newData[i][6];
    let col8 = newData[i][7];
    let col10 = newData[i][9];
    let col11 = newData[i][10];

    newArray.push(col10);
    myClients.push(col3);
    mySalesMen.push(col2);
    myOrganizations.push(col7);
    myTime.push(col1);

    myCol10 = col10;

}
myClients.shift();
newArray.shift();

let numPurchases = newArray.map(Number);
totalPurchases = 0;
for(let m = 0; m < numPurchases.length; m += 1) {
  totalPurchases += numPurchases[m];
}
document.getElementById('purchases').innerHTML = totalPurchases;

let combined = myClients.map((field, i) => [field, numPurchases[i]]);

let newCombined = combined;
newCombined.sort(function(a,b){
  return b[1]-a[1]
})

myPurchases = numPurchases;
myPurchases.sort(function(a, b){
  return b-a
 });

//Top salesman from mySalesMen
let fromSalesmen = mySalesMen;
let frequency = 1;
let man0 = 0;
let topSalesman;

  for (let i = 0; i < fromSalesmen.length; i++){
        for (let j = i; j < fromSalesmen.length; j++){
                if (fromSalesmen[i] == fromSalesmen[j])
                 man0++;
                if (frequency < man0){
                  frequency = man0;
                  topSalesman = fromSalesmen[i];
                }
        }
        man0=0;
  }
document.getElementById("topSalesman").innerHTML = topSalesman;

//Top visiting organizations from myOrganizations
let companyOrigins = myOrganizations;
let frequency1 = 1;
let org0  = 0;
let topCompany;

for (let i = 0; i < companyOrigins.length; i++){
      for (let j = i; j < companyOrigins.length; j++){
              if (companyOrigins[i] == companyOrigins[j])
               org0++;
              if (frequency1 < org0){
                frequency1 = org0;
                topCompany = companyOrigins[i];
              }
      }
      org0=0;
}
document.getElementById("topCompany").innerHTML = topCompany;



//Chart One on Top 5 Buyers
  let ctx = document.getElementById('chart1').getContext('2d');
  let chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [newCombined[0][0], newCombined[1][0], newCombined[2][0], newCombined[3][0], newCombined[4][0]],
        datasets: [{
            label: 'Top 5 Buyers',
            data: [newCombined[0][1], newCombined[1][1], newCombined[2][1], newCombined[3][1], newCombined[4][1], newCombined[5][1]],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });

//Second Chart [Pie], Sales share by Top 5 Salesmen

  let ctx2 = document.getElementById('chart2').getContext('2d');
  let chart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: [newCombined[0][0], newCombined[1][0], newCombined[2][0], newCombined[3][0], newCombined[4][0]],
        datasets: [{
            label: 'Sales share by top 5 purchases',
            data: [newCombined[0][1], newCombined[1][1], newCombined[2][1], newCombined[3][1], newCombined[4][1], newCombined[5][1]],
            backgroundColor: [
                '#A0D6EE',
                '#76CC65',
                '#A382D4',
                '#DD5454',
                '-moz-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%)',
                'b1a7ba'
            ],
            borderWidth: 1
        }]
    },

    options: {
      legend: {
        position: 'right',
      },
    }
  });


// Third Chart [Line]
let ctx3 = document.getElementById('chart3')
let chart3 = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['1st Sale', '2nd Sale', '3rd Sale', '4th Sale', '5th Sale', '6th Sale', '7th Sale'],
        datasets: [{
            label: 'Top 5 Sales to date',
            data: [12, 19, 33, 43, 14, 5, 25, 29],
            backgroundColor: [
                'blue',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 5,
                    max: 50
                }
            }]
        }
    }


});

// Fourth Chart [Line]
let byTime = myTime;
byTime.shift();

let timeCombined = byTime.map((field, i) => [field, numPurchases[i]]);
console.log(timeCombined)


let ctx4 = document.getElementById('chart4')
let chart4 = new Chart(ctx4, {
    type: 'horizontalBar',
    data: {
        datasets: [{
            label: 'Top Sales Time',
            barPercentage: 10,
            data: [timeCombined[0][1], timeCombined[1][1], timeCombined[2][1], timeCombined[3][1], timeCombined[4][1], 0],
            backgroundColor: [
              '#A0D6EE',
              '#76CC65',
              '#A382D4',
              '#DD5454',
              'black'
            ]
        }],
        labels: [timeCombined[0][0], timeCombined[1][0], timeCombined[2][0], timeCombined[3][0], timeCombined[4][0]]
    },


    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 10,
                    max: 120
                }
            }]
        }
    }
});

})

.catch(error => console.log(error));
