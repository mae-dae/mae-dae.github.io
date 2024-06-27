document.addEventListener('DOMContentLoaded', function() {
    // Define categories, kinks, and choices
    const data = [
        {
            category: 'Category 1',
            kinks: [
                { title: 'Kink 1.1', tooltip: 'Tooltip for Kink 1.1' },
                { title: 'Kink 1.2' },
                { title: 'Kink 1.3', tooltip: 'Tooltip for Kink 1.3' }
            ]
        },
        {
            category: 'Category 2',
            kinks: [
                { title: 'Kink 2.1', tooltip: 'Tooltip for Kink 2.1' },
                { title: 'Kink 2.2' }
            ]
        }
    ];

    const choices = [
        { label: 'Not Applicable' },
        { label: 'Favourite' },
        { label: 'Like' },
        { label: 'Interested', explanation: true },
        { label: 'No' }
    ];

    const sheetContainer = document.getElementById('Categories');

    // Generate categories, kinks, and choices dynamically
    data.forEach(categoryData => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('Category');

        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add('CategoryTitle');
        categoryTitle.textContent = categoryData.category;
        categoryDiv.appendChild(categoryTitle);

        categoryData.kinks.forEach(kinkData => {
            const kinkDiv = document.createElement('div');
            kinkDiv.classList.add('Kink');

            const kinkTitle = document.createElement('div');
            kinkTitle.textContent = kinkData.title;
            kinkDiv.appendChild(kinkTitle);

            if (kinkData.tooltip) {
                const tooltipSpan = document.createElement('span');
                tooltipSpan.textContent = '?';
                tooltipSpan.classList.add('Tooltip');
                tooltipSpan.title = kinkData.tooltip;
                kinkTitle.appendChild(tooltipSpan);
            }

            const choicesContainer = document.createElement('div');
            choicesContainer.classList.add('Choices');

            choices.forEach((choice, index) => {
                const choiceLabel = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `${categoryData.category}-${kinkData.title}`;
                input.value = index;
                input.dataset.category = categoryData.category;
                input.dataset.kink = kinkData.title;
                input.dataset.choice = choice.label;
                input.addEventListener('change', handleChoiceChange);

                const choiceSpan = document.createElement('span');
                choiceSpan.textContent = choice.label;

                choiceLabel.appendChild(input);
                choiceLabel.appendChild(choiceSpan);
                choicesContainer.appendChild(choiceLabel);

                if (choice.explanation && choice.explanation === true) {
                    const explanationInput = document.createElement('textarea');
                    explanationInput.placeholder = 'Enter explanation (optional)';
                    explanationInput.classList.add('Explanation');
                    explanationInput.style.display = 'none'; // Initially hidden
                    kinkDiv.appendChild(explanationInput);
                }
            });

            kinkDiv.appendChild(choicesContainer);
            categoryDiv.appendChild(kinkDiv);
        });

        sheetContainer.appendChild(categoryDiv);
    });

    function handleChoiceChange(event) {
        const selectedExplanation = event.target.parentNode.querySelector('.Explanation');
        if (selectedExplanation) {
            if (event.target.dataset.choice === 'Interested') {
                selectedExplanation.style.display = 'block';
            } else {
                selectedExplanation.style.display = 'none';
            }
        }
    }

    // Export as Image button functionality
    const exportBtn = document.getElementById('ExportBtn');
    exportBtn.addEventListener('click', function() {
        const sheetElement = document.getElementById('Sheet');
        html2canvas(sheetElement).then(function(canvas) {
            const imgData = canvas.toDataURL('image/jpeg');
            const img = new Image();
            img.src = imgData;
            const newTab = window.open();
            newTab.document.body.appendChild(img);
        });
    });
});
