var MY_CHART = null;

const startInspectorDashboard = () => {

    let crimes =  _getCrimes();

    $('#myChart').hide();
    $('#ok_zone_message').hide();

    if(crimes.length > 0){
        _createChart(crimes);
        $('#myChart').show();
    } else {

        $('#ok_zone_message').show();
    }


    setTimeout(
        () => {
            $('#inspection_panel').modal();
        }, 1000,
    );
}

const _createChart = (data) => {
    

    if(MY_CHART != null){

        MY_CHART.destroy();
    }

    // Reset of graphs
    MY_CHART = null;
    $('#myChart').html('');

    let ctx = document.getElementById('myChart').getContext('2d');
    
   
    
    let crimesTypologiesLabels = getCrimesTypologies();
    
    MY_CHART = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: crimesTypologiesLabels,
            datasets: [{
                label: '# of Crimes',
                data: data,
                backgroundColor :["#f38b4a",
                "#f38b4a","#f38b4a","#f38b4a",
                "#f38b4a", "#f38b4a",
                "#f38b4a","#f38b4a","#f38b4a",
                "#f38b4a","#f38b4a","#f38b4a",
                "#f38b4a", "#f38b4a",
                "#f38b4a","#f38b4a","#f38b4a",
                "#f38b4a","#f38b4a","#f38b4a",
                "#f38b4a", "#f38b4a",
                "#f38b4a","#f38b4a",

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
                }],
                xAxes : [{
                    ticks: {
                        stepSize: 1,
                    }
                }]
            }
        }
    });

}
const _getCrimes = () => {
    let crimes = _getAllCrimesTypologies();
    
    var result = {};
    
    var crimNum = [];
    
    crimes.forEach(function (x) {
        
        result[x] = (result[x] || 0) + 1;
    });
    
    for (let key in result) {
        
        crimNum.push(result[key]);
    }

    return crimNum;
}
