document.addEventListener('DOMContentLoaded', function() {
    const optionsForm = document.getElementById('optionsForm');
    const outputContainer = document.getElementById('outputContainer');
    const priceTable = document.getElementById('priceTable');

    optionsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(optionsForm);
        const requestData = Object.fromEntries(formData);

        fetch('http://127.0.0.1:5000/get_prices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayPrices(data);
            outputContainer.style.display = 'block'; // Show output container
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error here (e.g., display an error message on the webpage)
        });
    });

    function displayPrices(data) {
        priceTable.innerHTML = ''; // Clear previous data
    
        if (!data || !data.prices || data.prices.length === 0) {
            priceTable.innerHTML = '<p>No prices found.</p>';
            return;
        }
    
        const prices = data.prices;
        const table = document.createElement('table');
        const accountNumbers = [1, 2, 3, 4, 5];  // Manual list of account numbers
    
        // Create header row with an additional column for 'Account Number'
        const headerRow = document.createElement('tr');
        ['Account Number', 'State', 'District', 'Commodity', 'Variety', 'Min Price', 'Max Price', 'Model Price'].forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
    
        // Loop through each price object and create a row
        prices.forEach((price, index) => {
            const row = document.createElement('tr');
    
            // Add an Account Number cell using the manual array
            const accountNumberCell = document.createElement('td');
            accountNumberCell.textContent = accountNumbers[index] ?? 'N/A';  // Uses manual account numbers, default 'N/A' if out of index
            row.appendChild(accountNumberCell);
    
            // Add other cells based on the price data
            ['state', 'district', 'commodity', 'variety', 'min_price', 'max_price', 'modal_price'].forEach(key => {
                const cell = document.createElement('td');
                cell.textContent = price[key] ?? 'N/A'; // Use 'N/A' if property is undefined
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
    
        priceTable.appendChild(table);
    }
});