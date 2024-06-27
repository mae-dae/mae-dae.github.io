// Sample sheet data with tooltips
var sheetData = {
  categories: [
    {
      name: "Category 1",
      fields: ["Field 1", "Field 2"],
      kinks: [
        { text: "Kink 1", tooltip: "Tooltip text for Kink 1" },
        { text: "Kink 2" } // Kink 2 does not need a tooltip
      ]
    },
    {
      name: "Category 2",
      fields: ["Field 1", "Field 2"],
      kinks: [
        { text: "Kink 3", tooltip: "Tooltip text for Kink 3" },
        { text: "Kink 4" }
      ]
    }
    // Add more categories and kinks as needed
  ]
};

// Function to generate the sheet based on sheetData
function generateSheet() {
  var sheetHTML = '';
  sheetData.categories.forEach(function(category) {
    sheetHTML += `<div class="category">
                    <h2>${category.name}</h2>`;
    
    if (category.fields.length > 1) {
      sheetHTML += `<h3>(${category.fields.join(', ')})</h3>`;
    }
    
    category.kinks.forEach(function(kink) {
      sheetHTML += `<div class="kink">
                      <h4>${kink.text}</h4>`;

      // Display tooltip if present
      if (kink.tooltip) {
        sheetHTML += `<div class="tooltip">${kink.tooltip}</div>`;
      }

      sheetHTML += `<div class="choices">`;

      // Choices array
      var choices = [
        { text: "Not Applicable", explanation: false },
        { text: "Favourite", explanation: false },
        { text: "Like", explanation: false },
        { text: "Interested", explanation: true },
        { text: "No", explanation: false }
      ];

      choices.forEach(function(choice, index) {
        if (choice.explanation) {
          sheetHTML += `<div class="choice explanation" data-category="${category.name}" data-kink="${kink.text}" data-choice="${index}">
                          ${choice.text}
                          <textarea class="explanation-text" placeholder="Add optional note..."></textarea>
                        </div>`;
        } else {
          sheetHTML += `<div class="choice" data-category="${category.name}" data-kink="${kink.text}" data-choice="${index}">
                          ${choice.text}
                        </div>`;
        }
      });

      sheetHTML += `</div></div>`;
    });
    
    sheetHTML += `</div>`;
  });

  document.getElementById('sheet').innerHTML = sheetHTML;

  // Add event listeners to choices
  var choiceElements = document.querySelectorAll('.choice');
  choiceElements.forEach(function(choice) {
    choice.addEventListener('click', function() {
      var selectedChoices = document.querySelectorAll('.choice.selected');
      selectedChoices.forEach(function(selectedChoice) {
        selectedChoice.classList.remove('selected');
      });
      this.classList.add('selected');

      // Show explanation textarea if "Interested" is selected
      var explanationTextarea = this.querySelector('.explanation-text');
      if (explanationTextarea) {
        if (this.dataset.choice === '3') { // '3' corresponds to "Interested"
          explanationTextarea.style.display = 'block';
        } else {
          explanationTextarea.style.display = 'none';
        }
      }
    });
  });
}

// Function to export the sheet as a JPEG image
function exportAsJPEG() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var sheet = document.getElementById('sheet');
  
  canvas.width = sheet.scrollWidth;
  canvas.height = sheet.scrollHeight;

  ctx.fillStyle = '#ffffff'; // Set background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw sheet content onto the canvas
  html2canvas(sheet).then(function(canvas) {
    var img = canvas.toDataURL('image/jpeg');

    // Open the image in a new tab
    var newTab = window.open();
    newTab.document.body.innerHTML = `<img src="${img}" style="max-width: 100%;">`;
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  generateSheet();
});

document.getElementById('exportBtn').addEventListener('click', function() {
  exportAsJPEG();
});
