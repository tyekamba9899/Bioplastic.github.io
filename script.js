document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('product');
    const rawMaterialsContainer = document.getElementById('rawMaterialsContainer');
    const machineryContainer = document.getElementById('machineryContainer');
    const submitButton = document.getElementById('submit');
    const electricityRateInput = document.getElementById('electricity-rate');

    const rawMaterials = {
        filament: ['HEMP Powder', 'Glycerin', 'Zinc', 'Colour', 'PLA'],
        pellets: ['HEMP Powder', 'Zinc', 'Phenolic', 'Colour', 'PLA', 'HDEP', 'LDEP', 'ABS'],
        block: ['HEMP Powder', 'Zinc', 'Colour', 'PLA', 'Phenolic', 'UMDPE']
    };

    const machinery = {
        filament: ['Mixer', 'Dryer', 'Injection Moulding', 'Cool Bath', 'Roller'],
        pellets: ['Mixer', 'Dryer', 'Injection Moulding', 'Cool Bath', 'Roller', 'Pilletizer'],
        block: ['Mixer', 'Dryer', 'Compression Moulding']
    };

    productSelect.addEventListener('change', function() {
        const product = this.value;
        updateRawMaterialsInputs(rawMaterials[product], rawMaterialsContainer);
        updateMachineryInputs(machinery[product], machineryContainer, electricityRateInput.value);
    });

    submitButton.addEventListener('click', function() {
        const product = productSelect.value;
        const electricityRate = parseFloat(electricityRateInput.value);
        const totalRawMaterialCost = calculateRawMaterialsCost(rawMaterialsContainer);
        const totalMachineryCost = calculateMachineryCost(machineryContainer, electricityRate);

        document.getElementById('totalRawMaterialCost').textContent = totalRawMaterialCost.toFixed(2);
        document.getElementById('totalMachineryCost').textContent = totalMachineryCost.toFixed(2);
        const totalCost = totalRawMaterialCost + totalMachineryCost;
        document.getElementById('totalCost').textContent = totalCost.toFixed(2);
        // Assuming 1 kg total production for simplicity
        document.getElementById('costPerKg').textContent = (totalCost).toFixed(2);
    });

    function updateRawMaterialsInputs(materials, container) {
        container.innerHTML = '';
        materials.forEach(material => {
            createInputField(container, material, `${material} cost per kg:`, 'number', 'raw-material-input');
            createInputField(container, `${material}-transport`, 'Transportation %:', 'number', 'raw-material-transport');
            createInputField(container, `${material}-storage`, 'Storage %:', 'number', 'raw-material-storage');
            createInputField(container, `${material}-wastage`, 'Wastage %:', 'number', 'raw-material-wastage');
        });
    }

    function updateMachineryInputs(machines, container, electricityRate) {
        container.innerHTML = '';
        machines.forEach(machine => {
            createInputField(container, `${machine}-power-rate`, `${machine} Power Rate (kW):`, 'number', 'machinery-power-rate');
            createInputField(container, `${machine}-usage-time`, `${machine} Usage Time (hours):`, 'number', 'machinery-usage-time');
        });
        if(container.innerHTML !== '') {
            createInputField(container, 'electricity-rate', 'Electricity Rate (USD/kWh):', 'number', 'electricity-rate', electricityRate);
        }
    }

    function createInputField(container, id, labelText, type, className, value = '') {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = id;
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.className = className;
        input.value = value;
        input.min = '0';
        input.step = 'any';
        container.appendChild(label);
        container.appendChild(input);
    }

    function calculateRawMaterialsCost(container) {
        let totalCost = 0;
        container.querySelectorAll('.raw-material-input').forEach(input => {
            const baseCost = parseFloat(input.value);
            const transportPercent = parseFloat(document.getElementById(`${input.id}-transport`).value) / 100;
            const storagePercent = parseFloat(document.getElementById(`${input.id}-storage`).value) / 100;
            const wastagePercent = parseFloat(document.getElementById(`${input.id}-wastage`).value) / 100;

            if (!isNaN(baseCost)) {
                totalCost += baseCost + (baseCost * transportPercent) + (baseCost * storagePercent) + (baseCost * wastagePercent);
            }
        });
        return totalCost;
    }

    function calculateMachineryCost(container, electricityRate) {
        let totalCost = 0;
        container.querySelectorAll('.machinery-usage-time').forEach(input => {
            const powerRate = parseFloat(document.getElementById(`${input.id.replace('-usage-time', '')}-power-rate`).value);
            const usageTime = parseFloat(input.value);
            
            if (!isNaN(powerRate) && !isNaN(usageRate) && !isNaN(electricityRate)) {
                totalCost += powerRate * usageTime * electricityRate;
            }
        });
        return totalCost;
    }
});
