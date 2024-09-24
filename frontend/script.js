document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inputForm');
    const outputContainer = document.getElementById('outputContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then(response => response.json())
        .then(data => {
            displayPriceTable(data);
            displayCharts(data);
            suggestBestPrice(data);
            outputContainer.style.display = 'block'; // Show output container
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function displayPriceTable(data) {
    const priceTableBody = document.getElementById('priceTableBody');
    priceTableBody.innerHTML = ''; // Clear previous data
    
    const models = ['Random Forest', 'SVM', 'Combined'];
    models.forEach(model => {
        const row = document.createElement('tr');
        const modelName = document.createElement('td');
        modelName.textContent = model;
        const modelPrice = document.createElement('td');
        modelPrice.textContent = data[`${model.toLowerCase()}_prediction`];
        row.appendChild(modelName);
        row.appendChild(modelPrice);
        priceTableBody.appendChild(row);
    });
}

function displayCharts(data) {
    // Price Comparison Chart
    const barData = {
        labels: ['Random Forest', 'SVM', 'Combined'],
        datasets: [{
            label: 'Price Predictions',
            data: [
                data.rf_prediction,
                data.svm_prediction,
                data.combined_prediction
            ],
            backgroundColor: ['#007bff', '#28a745', '#ffc107'],
            borderWidth: 1
        }]
    };

    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: barData
    });

    // Price Trend Chart (dummy data)
    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Price Trend',
            data: [100, 150, 120, 180, 200, 160],
            borderColor: '#007bff',
            borderWidth: 2,
            fill: false
        }]
    };

    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: lineData
    });
}

function suggestBestPrice(data) {
    const models = ['Random Forest', 'SVM', 'Combined'];
    let bestPrice = Number.MAX_SAFE_INTEGER;
    let bestModel = '';

    models.forEach(model => {
        const price = data[`${model.toLowerCase()}_prediction`];
        if (price < bestPrice) {
            bestPrice = price;
            bestModel = model;
        }
    });

    document.getElementById('bestPrice').textContent = `Best Price: ${bestPrice} (${bestModel})`;
}
