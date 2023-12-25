<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Production Cost Dashboard</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <main class="dashboard">
        <h1>Production Cost Dashboard</h1>

        <div class="selection-area">
            <label for="product">Select Product:</label>
            <select id="product">
                <option value="">Please Select</option>
                <option value="filament">Filament</option>
                <option value="pellets">Pellets</option>
                <option value="block">Block</option>
            </select>
        </div>

        <div id="rawMaterialsContainer" class="input-section">
            <!-- Raw materials inputs will be generated here by JavaScript -->
        </div>
        
        <div id="machineryContainer" class="input-section">
            <!-- Machinery inputs will be generated here by JavaScript -->
        </div>

        <div class="input-section">
            <label for="totalProductionKilos">Expected Total Production (Kilos):</label>
            <input type="number" id="totalProductionKilos" placeholder="Enter expected total production in kilos" min="1" step="any">
        </div>

        <button id="submit">Calculate Costs</button>

        <div class="results">
            <div>Total Raw Material Cost: <span id="totalRawMaterialCost">0</span></div>
            <div>Total Machinery Cost: <span id="totalMachineryCost">0</span></div>
            <div>Total Cost of Production: <span id="totalCost">0</span></div>
            <div>Cost of Production per Kg: <span id="costPerKg">0</span></div>
        </div>
    </main>

    <script src="script.js"></script>
</body>
</html>
