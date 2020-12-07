const startInspectorDashboard = () => {

    _buildInspectorDashboard();
    _createChart();

    // Populate graph data

    $('#inspection_panel').modal();
}
const _buildInspectorDashboard = () => {
    let html = '<div id="inspection_panel" class="modal" tabindex="-1" role="dialog">';
    html += '<div class="modal-dialog modal-xl" role="document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += ' <h5 class="modal-title">Ispeziona dintorni</h5>';
    html += '     <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    html += '   <span aria-hidden="true">&times;</span>';
    html += '   </button>';
    html += ' </div>';
    html += ' </div>';
    html += ' </div>';
    html += ' </div>';
    return html;

}

const _createChart = () => {

    var ctx = document.getElementById('myChart').getContext('2d');
    let crimini = getCrimesTypologies();
    let data = _Crimini();
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: crimini,
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
                }]
            }
        }
    });

}
const _Crimini = () => {
    let crimes = tutticrimini();
    var result = {};
    var crimNum = [];
    crimes.forEach(function (x) {
        result[x] = (result[x] || 0) + 1;

    });
    for (var key in result) {
        crimNum.push(result[key]);
    }


    return crimNum;
}