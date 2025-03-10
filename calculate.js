$(document).ready(() => {
    $('#selectClassification').click(() => {
        const checkClass = $('#selectClassification').val();
        if (checkClass !== "") {
            $('#txtError').hide();
        }
    })



    $('#btnCalculate').click(() => {
        let txtConsumption = $('#txtConsumption').val();
        const selectClassification = $('#selectClassification').val();
        let resultWaterBill;
        const environmentalFee = 4.48;
        let totalEnvironmentalFee;
        let total;

        if (txtConsumption != "" && selectClassification != "") {
            // Hide Error
            $('#txtError').hide();

            // Consumption Error (Cannot be less than Zero)
            if (txtConsumption < 0) {
                $('#txtError').text('Consumption cannot be less than zero (' + txtConsumption + ')');
                $('#txtError').show();
                return;
            }

            console.log(`${selectClassification}, Consumption: ${txtConsumption}`)

            // Switch Case for Select Option
            switch (selectClassification) {
                case "Bulk Water":
                    resultWaterBill = calcBulkWater(txtConsumption);

                    totalEnvironmentalFee = 0;
                    total = resultWaterBill + totalEnvironmentalFee;

                    // Display Results
                    $('#resultWaterBill').text(`Water Bill: ₱${resultWaterBill.toFixed(2)}`);
                    $('#resultEnvironmentalFee').text(`Environmental Fee: ₱${totalEnvironmentalFee.toFixed(2)}`);
                    $('#resultTotal').text(`Total: ₱${total.toFixed(2)}`)
                    break;
                case "Full Commercial":
                    resultWaterBill = calcFullCommercial(txtConsumption);

                    totalEnvironmentalFee = 0;
                    total = resultWaterBill + totalEnvironmentalFee;

                    // Display Results
                    $('#resultWaterBill').text(`Water Bill: ₱${resultWaterBill.toFixed(2)}`);
                    $('#resultEnvironmentalFee').text(`Environmental Fee: ₱${totalEnvironmentalFee.toFixed(2)}`);
                    $('#resultTotal').text(`Total: ₱${total.toFixed(2)}`)
                    break;
                case "Government":
                    resultWaterBill = calcGovernment(txtConsumption);

                    totalEnvironmentalFee = txtConsumption * environmentalFee;
                    total = resultWaterBill + totalEnvironmentalFee;

                    // Display Results
                    $('#resultWaterBill').text(`Water Bill: ₱${resultWaterBill.toFixed(2)}`);
                    $('#resultEnvironmentalFee').text(`Environmental Fee: ₱${totalEnvironmentalFee.toFixed(2)}`);
                    $('#resultTotal').text(`Total: ₱${total.toFixed(2)}`);
                    break;
                case "Residential":
                    resultWaterBill = calcResidential(txtConsumption);

                    totalEnvironmentalFee = txtConsumption * environmentalFee;
                    total = resultWaterBill + totalEnvironmentalFee;

                    // Display Results
                    $('#resultWaterBill').text(`Water Bill: ₱${resultWaterBill.toFixed(2)}`);
                    $('#resultEnvironmentalFee').text(`Environmental Fee: ₱${totalEnvironmentalFee.toFixed(2)}`);
                    $('#resultTotal').text(`Total: ₱${total.toFixed(2)}`)
                    break;
            }
        } if (selectClassification == "") {
            // Display Error
            $('#txtError').text('Please Choose a Class');
            $('#txtError').show();
            $('#resultWaterBill').text('Water Bill: ');
            $('#resultEnvironmentalFee').text('Environmental Fee:');
            $('#resultTotal').text('Total: ');
        } else if (txtConsumption == "") {
            // Display Error
            $('#txtError').text('Please Enter the Amount of Consumption');
            $('#txtError').show();
            $('#resultWaterBill').text('Water Bill: ');
            $('#resultEnvironmentalFee').text('Environmental Fee:');
            $('#resultTotal').text('Total: ');
        }

    })

    function calcResidential(consumption) {
        // RESIDENTIAL 
        // ENVIRONMENTAL FEE = 4.48
        let cons = consumption;
        let waterBill = 0;
        const tierRate = [21.84, 23.18, 24.86, 26.88];
        const range = ["Minimum", "11-20", "21-30", "31-40", "41-50", "51 Up"];

        waterBill = 208.32;
        cons -= 10;
        console.log(`Residential ${range[0]} WaterBill: ${waterBill}\nConsumption: ${cons}`);

        for (let i = 0; i < tierRate.length; i++) {
            if (cons > 0) {
                let currentConsumption = Math.min(cons, 10);
                waterBill += currentConsumption * tierRate[i];
                cons -= currentConsumption;
                console.log(`${range[i + 1]} WaterBill: ${waterBill}\nConsumption: ${cons}`);
            }
        }
        // 51 Up
        if (cons > 0) {
            console.log(`51 Up Consumption: ${cons}`)
            let rate51Up = 29.23;
            waterBill += cons * rate51Up;
            console.log(`51 Up WaterBill: ${waterBill}`)
        }

        return waterBill;
    }

    function calcGovernment(consumption) {
        // GOVERNMENT 
        // ENVIRONMENTAL FEE = 4.48
        let cons = consumption;
        let waterBill = 0;
        const tierRate = [21.84, 23.18, 24.86, 26.88];
        const range = ["Minimum", "11-20", "21-30", "31-40", "41-50", "51 Up"];

        waterBill = 208.32;
        cons -= 10;
        console.log(`Government ${range[0]} WaterBill: ${waterBill}\nConsumption: ${cons}`);

        for (let i = 0; i < tierRate.length; i++) {
            if (cons > 0) {
                let currentConsumption = Math.min(cons, 10);
                waterBill += currentConsumption * tierRate[i];
                cons -= currentConsumption;
                console.log(`Government ${range[i + 1]} WaterBill: ${waterBill}\nConsumption: ${cons}`);
            }
        }
        // 51 Up
        if (cons > 0) {
            console.log(`Government 51 Up Consumption: ${cons}`)
            let rate51Up = 29.23;
            waterBill += cons * rate51Up;
            console.log(`51 Up WaterBill: ${waterBill}`)
        }

        return waterBill;
    }

    function calcFullCommercial(consumption) {
        // FULL COMMERCIAL 
        let cons = consumption;
        let waterBill = 0;
        const range = ["Minimum", "11-20", "21-30", "31-40", "41-50", "51 Up"];
        const tierRate = [43.68, 46.37, 49.73, 53.76];

        waterBill = 416.64; // MINIMUM WATER BILL RATE  
        cons -= 10;
        console.log(`Full Commercial ${range[0]} WaterBill: ${waterBill}\nConsumption: ${cons}`);

        for (let i = 0; i < tierRate.length; i++) {
            if (cons > 0) {
                let currentConsumption = Math.min(cons, 10);
                waterBill += currentConsumption * tierRate[i];
                cons -= currentConsumption;
                console.log(`Full Commercial ${range[i + 1]} WaterBill: ${waterBill}\nConsumption: ${cons}`);
            }
        }
        // 51 Up Full Commercial
        if (cons > 0) {
            console.log(`Full Commercial 51 Up Consumption: ${cons}`)
            let rate51Up = 58.46;
            waterBill += cons * rate51Up;
            console.log(`51 Up WaterBill: ${waterBill}`)
        }

        return waterBill;
    }

    function calcBulkWater(consumption) {
        // BULK WATER
        let cons = consumption;
        let waterBill = 161.3; //MINIMUM BULK WATER

        if (cons <= 10) {
            console.log(`Bulk Water Minimum WaterBill: ${waterBill}\nConsumption: ${cons}`);
            return waterBill;
        } else {
            cons -= 10;
            waterBill += cons * 16.13;
            console.log(`Bulk Water 10 Up WaterBill: ${waterBill}\nConsumption: ${cons}`);
            return waterBill;
        }
    }

    // calcBulkWater(70);
})



// calcResidential(1);
// calcGovernment(20);
// calcFullCommercial(70);



// function calcResidential(consumption) {
//     let waterBill = 0;
//     const tierRate = [21.84, 23.18, 24.86, 26.88]
//     const tier = ["11-20", "21-30", "31-40", "41-50", "51 Up"]
//     cons = consumption;
//     let current = 0;
//     if (cons <= 10) {
//         waterBill = 208.32;

//         console.log(` Minimun Water Bill: ${waterBill}\n Consumption: ${cons}`)
//         return;
//     }
//     waterBill = 208.32;
//     cons -= 10;

//     console.log(` Minimun Water Bill: ${waterBill}\n Consumption: ${cons}`);

//     for (let i = 0; i < tierRate.length && cons > 0; i++) {
//         if (cons > 10) {
//             waterBill += 10 * tierRate[i];
//             cons -= 10;
//             console.log(`${tier[i]} Water Bill: ${waterBill}\n Consumption: ${cons}`);
//             current++;
//         }
//     }
//     if (cons <= 10) {
//         waterBill += cons * tierRate[current++];
//         console.log(`${tier[current++]} Water Bill: ${waterBill}\n Consumption: ${cons}`);
//     }

// }

// console.log(calcResidential(29));