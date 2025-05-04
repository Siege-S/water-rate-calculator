const waterBillRates = [
    [161.30, 16.13, 16.13, 16.13, 16.13, 16.13], // Bulk Water
    [416.64, 43.68, 46.37, 49.73, 53.76, 58.46], // Full Commercial
    [208.32, 21.84, 23.18, 24.86, 26.88, 29.23], // Government
    [208.32, 21.84, 23.18, 24.86, 26.88, 29.23],// Residential
];

// console.log(waterBillRate[0][0]);

function calcWaterBill(classType, consumption, prorated, seniorDiscount) {
    let classTypeNumber;
    let waterBill = 0;
    const environmentalFee = 4.48; // For Residential and Government
    let totalEnvironmentalFee = 0;
    let total;
    
    switch (classType) {
        case 'Bulk Water':
            classTypeNumber = 0;
            break;
        case 'Full Commercial':
            classTypeNumber = 1;
            break;
        case 'Government':
            classTypeNumber = 2;

            // Environmental Fee (consumption * 4.48)
            // Residential Ceiling Cubic Meter 40
            consumption > 40 ? 
            totalEnvironmentalFee =  40 * environmentalFee :
            totalEnvironmentalFee =  consumption * environmentalFee;
            break;
        case 'Residential':
            classTypeNumber = 3;
            
            // Environmental Fee (consumption * 4.48)
            // Residential Ceiling Cubic Meter 40
            consumption > 40 ? 
            totalEnvironmentalFee =  40 * environmentalFee :
            totalEnvironmentalFee =  consumption * environmentalFee;
            break;
    }

    
    // MINIMUM WATER BILL RATE
    consumption -= 10;
    waterBill = waterBillRates[classTypeNumber][0];
    console.log(`Class Type: ${classType}\nWaterBill ${waterBill}\nConsumption: ${consumption}`)
    
    

    for(let i=0; i < waterBillRates[classTypeNumber].length - 1; i++) {
        // console.log(waterBillRates[classTypeNumber][i + 1]);

        if(consumption > 0) {
            let currentConsumption = Math.min(consumption, 10);
            waterBill += currentConsumption * waterBillRates[classTypeNumber][i+1];
            consumption -= currentConsumption;
            console.log(`Class Type: ${classType}\nWaterBill ${waterBill}\nConsumption: ${consumption}`)
        }

    }

    if(consumption > 0) {
        waterBill += consumption * waterBillRates[classTypeNumber][5] // 51 - Ups
        consumption = 0;

        console.log(`Class Type: ${classType}\nWaterBill ${waterBill}\nConsumption: ${consumption}`)
    }

    total = waterBill + totalEnvironmentalFee;
    console.log(`\nResults`)
    console.log(`Class Type: ${classType}`)
    console.log(`Water Bill: ${waterBill.toFixed(2)}`);
    console.log(`Environmental Fee: ${totalEnvironmentalFee.toFixed(2)}`);
    console.log(`Total: ${total.toFixed(2)}`);

}

// calcWaterBill('Bulk Water', 29);
// calcWaterBill('Full Commercial', 20);
// calcWaterBill('Government', 45);
calcWaterBill('Residential', 1);
