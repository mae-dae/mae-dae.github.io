// Define a data structure to hold selections
let selections = {};

// Function to generate the sheet dynamically based on selections
function generateSheet() {
    // Reset selections
    selections = {};

    // Iterate over each category
    $('.category').each(function(index) {
        let category = $(this).data('category');
        selections[category] = {};

        // Iterate over each kink within the category
        $(this).find('.kink').each(function() {
            let kink = $(this).data('kink');
            let value = $(this).find('input:checked').val(); // Assuming radio buttons for choices
            let explanation = $(this).find('.explanation').val(); // Optional explanation text

            // Store the selected value and explanation (if provided)
            selections[category][kink] = {
                value: value,
                explanation: explanation
            };
        });
    });

    // Debugging: log selections
    console.log('Selections:', selections);

    // Call function to generate sheet based on selections
    generateSheetContent(selections);
}

// Function to generate sheet content based on selections
function generateSheetContent(selections) {
    // Clear previous content if any
    $('#sheet').empty();

    // Iterate over selections to generate HTML content
    Object.keys(selections).forEach(category => {
        $('#sheet').append(`<h2>${category}</h2>`);

        Object.keys(selections[category]).forEach(kink => {
            let value = selections[category][kink].value;
            let explanation = selections[category][kink].explanation ? `<p><em>Explanation:</em> ${selections[category][kink].explanation}</p>` : '';

            $('#sheet').append(`<p>${kink}: ${value}</p>${explanation}`);
        });
    });
}

// Event listener for export button
$('#exportButton').on('click', function() {
    generateSheet();
});
