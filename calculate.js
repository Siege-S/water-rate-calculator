$(document).ready(() => {
    $('.check-boxes').hide();
    $('#selectClassification').click(() => {
        const checkClass = $('#selectClassification').val();
        if (checkClass !== "") {
            $('#txtError').hide();
        } 
    })

    $('#selectClassification').change(function () {
         if ($(this).val()  === "Residential") {
            $('.check-boxes').show();
         } else {
            $('.check-boxes').hide();
            $('#resultTotalDiscount').hide();
            $('#checkProRated').prop("checked", false);
            $('#checkSeniorDiscount').prop("checked", false);

         } 
       
    })


    $('#btnCalculate').click(() => {
        let txtConsumption = $('#txtConsumption').val();
        const selectClassification = $('#selectClassification').val();
        let resultWaterBill;
        const environmentalFee = 4.48;
        let totalEnvironmentalFee = 0;
        let total = 0;
        let discountWaterBill = 0;
        let discountEnvironmentalFee = 0;
        let totalDiscount = 0;

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

                    // GOVERNMENT CEILING CUBIC METER 40
                    if (txtConsumption > 40) {
                        totalEnvironmentalFee = 40 * environmentalFee;
                    } else {
                        totalEnvironmentalFee = txtConsumption * environmentalFee;
                    }

                    total = resultWaterBill + totalEnvironmentalFee;

                    // Display Results
                    $('#resultWaterBill').text(`Water Bill: ₱${resultWaterBill.toFixed(2)}`);
                    $('#resultEnvironmentalFee').text(`Environmental Fee: ₱${totalEnvironmentalFee.toFixed(2)}`);
                    $('#resultTotal').text(`Total: ₱${total.toFixed(2)}`);
                    break;
                case "Residential":
                    // PRORATED CHECKBOX
                    $('#checkProRated').is(':checked') ? 
                    resultWaterBill = calcResidentialProRated(txtConsumption) : resultWaterBill = calcResidential (txtConsumption);

                    //RESIDENTIAL CEILING CUBIC METER 40
                    if (txtConsumption > 40) {
                        totalEnvironmentalFee = 40 * environmentalFee;
                    } else {
                        totalEnvironmentalFee = txtConsumption * environmentalFee;
                    }

                    // SENIOR DISCOUNT 5%
                    if($('#checkSeniorDiscount').is(':checked')) {
                        $('#resultTotalDiscount').show();
                        discountWaterBill = resultWaterBill * 0.05;
                        discountEnvironmentalFee = totalEnvironmentalFee * 0.05;
                        totalDiscount = discountWaterBill + discountEnvironmentalFee;
                        console.log(`Total Water Bill: ${resultWaterBill}\nTotal Discount: ${totalDiscount}`)
                        total = (resultWaterBill + totalEnvironmentalFee) - totalDiscount;
                        console.log(`Total Discounted: ${total}`)
                        $('#resultTotalDiscount').text(`Total Discount: ₱${totalDiscount.toFixed(2)}`)
                    } else {
                        $('#resultTotalDiscount').hide();
                        total = resultWaterBill + totalEnvironmentalFee;
                
                    }
                    // Display Results
                    $('#resultWaterBill').text(`Water Bill: ₱${resultWaterBill.toFixed(2)}`);
                    $('#resultEnvironmentalFee').text(`Environmental Fee: ₱${totalEnvironmentalFee.toFixed(2)}`);
                    $('#resultTotal').text(`Total: ₱${total.toFixed(2)}`)
                    break;    
            }
        } 
        
        if (selectClassification == "") {
            // Display Error2
            $('#txtError').text('Please Choose a Class');
            $('#txtError').show();
            $('#resultTotalDiscount').hide();
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

function calcResidentialProRated(consumption) {
    // RESIDENTIAL PRO RATED
    // ENVIRONMENTAL FEE = 4.48
    let cons = consumption;
    let waterBill = 0;
    const tierRate = [20.832, 21.84, 23.18, 24.86, 26.88];
    const range = ["1-10", "11-20", "21-30", "31-40", "41-50", "51 Up"];

    console.log(`Residential ${range[0]} WaterBill: ${waterBill}\nConsumption: ${cons}`);

    for (let i = 0; i < tierRate.length; i++) {
        if (cons > 0) {
            let currentConsumption = Math.min(cons, 10);
            waterBill += currentConsumption * tierRate[i];
            cons -= currentConsumption;
            console.log(`${range[i]} WaterBill: ${waterBill}\nConsumption: ${cons}`);
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

// console.log(calcResidentialProRated(10));


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