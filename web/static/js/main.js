function loadData() {
    fetch('/load_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                var tableBody = document.querySelector('#dataTable');
                tableBody.innerHTML = ''; // Clear existing table data

                data.data.forEach((row, index) => {
                    var newRow = `<tr>
                          <td>${row.id_data}</td>
                          <td>${row.nama}</td>
                          <td>${row.nim}</td>
                          <td>${row.jurusan}</td>
                          <td>${row.status_kemahasiswaan}</td>
                          <td>${row.pernah_ikut_mbmk}</td>
                          <td>${row.pernah_mbkm_apapun}</td>
                          <td>${row.lolos_mbkm}</td>
                          <td>${row.performa_ipk}</td>
                          <td>${row.nilai_ipk}</td>
                          <td>${row.ikut_organisasi}</td>
                          <td>${row.jumlah_organisasi}</td>
                          <td>${row.scan_ktp}</td>
                          <td>${row.upload_sertifikat}</td>
                          <td>${row.upload_cv}</td>
                          <td>${row.upload_surat_rekomendasi}</td>
                        </tr>`;
                    tableBody.innerHTML += newRow;
                });
            } else {
                console.error('Error fetching data:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

loadData();
async function fetchDataAndPopulateTable() {
    try {
        const response = await fetch('/get_data'); // Ganti dengan URL API Anda
        const data = await response.json();

        const tableBody = document.getElementById('dataMahasiswa');
        tableBody.innerHTML = ''; // Kosongkan isi tabel sebelum menambahkan data

        data.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.nama}</td>
                <td>${item.nim}</td>
                <td>${item.jurusan}</td>
                <td>${item.status_kemahasiswaan}</td>
                <td>${item.pernah_ikut_mbmk}</td>
                <td>${item.pernah_mbkm_apapun}</td>
                <td>${item.lolos_mbkm}</td>
                <td>${item.performa_ipk}</td>
                <td>${item.nilai_ipk}</td>
                <td>${item.ikut_organisasi}</td>
                <td>${item.jumlah_organisasi}</td>
                <td><a href="${item.upload_sertifikat}" class="button is-link is-small">Lihat Dokumen</a></td>
                <td><a href="${item.scan_ktp}" class="button is-link is-small">Lihat Dokumen</a></td>
                <td><a href="${item.upload_cv}" class="button is-link is-small">Lihat Dokumen</a></td>
                <td><a href="${item.upload_surat_rekomendasi}" class="button is-link is-small">Lihat Dokumen</a></td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function fetchDataHasil() {
    fetch('/predict')
      .then(response => response.json())
      .then(data => {
        const results = data.results;
        const dataTable = document.getElementById('dataTableHasil');
        dataTable.innerHTML = ''; // Clear the table body
  
        results.forEach(item => {
          const row = `
            <tr>
              <td>${item.nama}</td>
              <td>${item.nim}</td>
              <td>${item.jurusan}</td>
              <td>${item.status_kemahasiswaan}</td>
              <td>${item.lolos_mbkm}</td>
            </tr>
          `;
          dataTable.innerHTML += row;
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
// Fungsi untuk mengirim data form ke URL /add_data dengan metode POST
function sendData() {
    const formData = new FormData(document.querySelector('form'));
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch('/add_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
      // Tutup modal setelah sukses mengirim data
      document.getElementById('modal').classList.remove('is-active');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Tambahkan event listener ke tombol 'Save changes'
    document.querySelector('.button.is-success').addEventListener('click', function(event) {
      event.preventDefault();
      sendData();
    });

    // Tambahkan event listener untuk menutup modal pada tombol 'Cancel' dan tombol 'X'
    document.getElementById('close-modal').addEventListener('click', function() {
      document.getElementById('modal').classList.remove('is-active');
    });

    document.getElementById('close-modal-footer').addEventListener('click', function() {
      document.getElementById('modal').classList.remove('is-active');
    });
  });
document.getElementById('open-modal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('is-active');
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('is-active');
});

document.getElementById('close-modal-footer').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('is-active');
});
document.getElementById('open-modal-data').addEventListener('click', function() {
    document.getElementById('dataModal').classList.add('is-active');
    fetchDataAndPopulateTable()
});

document.getElementById('close-modal-data').addEventListener('click', function() {
    document.getElementById('dataModal').classList.remove('is-active');
});

document.getElementById('close-modal-data-footer').addEventListener('click', function() {
    document.getElementById('dataModal').classList.remove('is-active');
});
document.getElementById('open-modal-hasil').addEventListener('click', function() {
    document.getElementById('dataHasil').classList.add('is-active');
    fetchDataHasil()
});

document.getElementById('close-modal-hasil').addEventListener('click', function() {
    document.getElementById('dataHasil').classList.remove('is-active');
});

document.getElementById('close-modal-hasil-footer').addEventListener('click', function() {
    document.getElementById('dataHasil').classList.remove('is-active');
});

document.getElementById('open-modal-train-model').addEventListener('click', function() {
    document.getElementById('trainModel').classList.add('is-active');
});

document.getElementById('close-modal-train-model').addEventListener('click', function() {
    document.getElementById('trainModel').classList.remove('is-active');
});

document.getElementById('close-modal-train-model-footer').addEventListener('click', function() {
    document.getElementById('trainModel').classList.remove('is-active');
});

document.getElementById('train-model-button').addEventListener('click', function() {
    // Dummy log update for now
    document.getElementById('log').value += "\nModel training started...\nModel training completed.";
});


// Chart
document.getElementById('open-modal-chart').addEventListener('click', function() {
    document.getElementById('chartModal').classList.add('is-active');
    setTimeout(renderCharts, 100); // Delay to ensure charts render correctly
});

document.getElementById('close-modal-chart').addEventListener('click', function() {
    document.getElementById('chartModal').classList.remove('is-active');
});

document.getElementById('close-modal-chart-footer').addEventListener('click', function() {
    document.getElementById('chartModal').classList.remove('is-active');
});

function renderCharts() {
    var trace1 = {
        x: [1, 2, 3, 4, 5, 6],
        y: [2, 3, 2.5, 5, 4, 3.5],
        mode: 'markers',
        type: 'scatter',
        name: 'Data Points',
        marker: {
            size: 12
        }
    };

    var trace2 = {
        x: [0, 7],
        y: [0, 7],
        mode: 'lines+markers',
        type: 'scatter',
        name: 'Hyperplane',
        line: {
            shape: 'linear',
            color: 'red'
        },
        marker: {
            symbol: 'arrow-bar'
        }
    };

    var data = [trace1, trace2];

    var layout = {
        title: {
            text: 'Scatter Plot with Hyperplane',
            x: 0 // Align title to the left
        },
        xaxis: {
            title: 'X-axis'
        },
        yaxis: {
            title: 'Y-axis'
        },
        showlegend: true
    };

    Plotly.newPlot('scatterPlot', data, layout);




    // Line Chart
    var lineChart = echarts.init(document.getElementById('lineChart'));
    lineChart.setOption({
        title: {
            text: 'Line Chart'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line'
        }]
    });

    // Bar Chart
    var barChart = echarts.init(document.getElementById('barChart'));
    barChart.setOption({
        title: {
            text: 'Bar Chart'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [10, 52, 200, 334, 390, 330, 220],
            type: 'bar'
        }]
    });

    // Donut Chart
    var donutChart = echarts.init(document.getElementById('donutChart'));
    donutChart.setOption({
        title: {
            text: 'Donut Chart'
        },
        series: [{
            type: 'pie',
            radius: ['50%', '70%'],
            data: [{
                    value: 335,
                    name: 'Direct'
                },
                {
                    value: 310,
                    name: 'Email'
                },
                {
                    value: 234,
                    name: 'Affiliate'
                },
                {
                    value: 135,
                    name: 'Video'
                },
                {
                    value: 1548,
                    name: 'Search'
                }
            ]
        }]
    });
}