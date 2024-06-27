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
                    if (choice.name === 'Interested') {
                        explanationInput.style.display = this.checked ? 'block' : 'none';
                    } else {
                        explanationInput.style.display = 'none';
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

// Populate categories and kinks on page load
document.addEventListener('DOMContentLoaded', function() {
    populateCategories();

    // Export button functionality
    var exportBtn = document.getElementById('ExportBtn');
    exportBtn.addEventListener('click', function() {
        html2canvas(document.getElementById('Categories')).then(function(canvas) {
            var sheetContainer = document.getElementById('Sheet');
            sheetContainer.innerHTML = '';
            sheetContainer.appendChild(canvas);

            // Open the generated sheet as an image in a new tab
            var image = canvas.toDataURL();
            var windowPopup = window.open(image, '_blank');
            windowPopup.focus();
        });
    });
});
