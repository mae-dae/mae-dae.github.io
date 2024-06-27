// Data for categories, kinks, and choices
var categoriesData = [
    {
        categoryName: "Category 1",
        kinks: [
            {
                kinkName: "Kink 1.1",
                tooltip: "Tooltip for Kink 1.1",
                choices: [
                    { name: "Not Applicable" },
                    { name: "Favourite" },
                    { name: "Like" },
                    { name: "Interested" },
                    { name: "No" }
                ]
            },
            {
                kinkName: "Kink 1.2",
                tooltip: "Tooltip for Kink 1.2",
                choices: [
                    { name: "Not Applicable" },
                    { name: "Favourite" },
                    { name: "Like" },
                    { name: "Interested" },
                    { name: "No" }
                ]
            }
        ]
    },
    {
        categoryName: "Category 2",
        kinks: [
            {
                kinkName: "Kink 2.1",
                tooltip: "Tooltip for Kink 2.1",
                choices: [
                    { name: "Not Applicable" },
                    { name: "Favourite" },
                    { name: "Like" },
                    { name: "Interested" },
                    { name: "No" }
                ]
            },
            {
                kinkName: "Kink 2.2",
                tooltip: "", // No tooltip for Kink 2.2
                choices: [
                    { name: "Not Applicable" },
                    { name: "Favourite" },
                    { name: "Like" },
                    { name: "Interested" },
                    { name: "No" }
                ]
            }
        ]
    }
];

// Function to populate categories and kinks
function populateCategories() {
    var categoriesContainer = document.getElementById('Categories');

    categoriesData.forEach(function(category) {
        var categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        var categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.categoryName;
        categoryDiv.appendChild(categoryTitle);

        category.kinks.forEach(function(kink) {
            var kinkDiv = document.createElement('div');
            kinkDiv.classList.add('kink');

            var kinkTitle = document.createElement('h3');
            kinkTitle.textContent = kink.kinkName;

            // Add tooltip for kink title if available
            if (kink.tooltip) {
                var tooltipSpan = document.createElement('span');
                tooltipSpan.textContent = ' (?)';
                tooltipSpan.classList.add('tooltip');
                tooltipSpan.setAttribute('title', kink.tooltip);
                kinkTitle.appendChild(tooltipSpan);
            }

            kinkDiv.appendChild(kinkTitle);

            var explanationInput = document.createElement('textarea');
            explanationInput.placeholder = 'Optional explanation...';
            explanationInput.classList.add('explanation');
            kinkDiv.appendChild(explanationInput);

            // Initially hide the explanation textarea
            explanationInput.style.display = 'none';

            kink.choices.forEach(function(choice, index) {
                var choiceLabel = document.createElement('label');
                choiceLabel.textContent = choice.name;

                var choiceInput = document.createElement('input');
                choiceInput.type = 'radio';
                choiceInput.name = `choice-${category.categoryName}-${kink.kinkName}`;
                choiceInput.value = index; // Adjust value as needed

                choiceInput.addEventListener('change', function() {
                    // Hide all explanation textareas in the current category
                    var currentCategoryInputs = document.querySelectorAll(`input[name="choice-${category.categoryName}-${kink.kinkName}"]`);
                    currentCategoryInputs.forEach(function(input) {
                        var kinkDiv = input.closest('.kink');
                        var explanationInput = kinkDiv.querySelector('.explanation');
                        if (explanationInput) {
                            explanationInput.style.display = 'none';
                        }
                    });

                    // Show explanation textarea only if "Interested" is selected
                    var kinkDiv = this.closest('.kink');
                    var explanationInput = kinkDiv.querySelector('.explanation');
                    if (explanationInput && choice.name === 'Interested') {
                        explanationInput.style.display = 'block';
                    } else {
                        if (explanationInput) {
                            explanationInput.style.display = 'none';
                        }
                    }
                });

                choiceLabel.appendChild(choiceInput);
                kinkDiv.appendChild(choiceLabel);
            });

            categoryDiv.appendChild(kinkDiv);
        });

        categoriesContainer.appendChild(categoryDiv);
    });
}

// Function to export sheet as image
function exportSheet() {
    var sheetElement = document.getElementById('Sheet');

    html2canvas(sheetElement).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var img = new Image();
        img.src = imgData;

        var exportLink = document.createElement('a');
        exportLink.href = img.src;
        exportLink.download = 'roleplaying_sheet.png';
        exportLink.click();
    });
}

// Populate categories and kinks on page load
document.addEventListener('DOMContentLoaded', function() {
    populateCategories();

    // Export button click event
    var exportBtn = document.getElementById('ExportBtn');
    exportBtn.addEventListener('click', function() {
        exportSheet();
    });
});
