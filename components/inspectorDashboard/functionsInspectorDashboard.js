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