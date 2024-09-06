import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0";

env.allowLocalModels = false;

// Reference the HTML elements that we will need
const fileUpload = document.getElementById("file-upload");
const imageContainer = document.getElementById("image-container");
const thresholdSlider = document.getElementById("threshold-slider");
const thresholdValue = document.getElementById("threshold-value");
const detectObjectsButton = document.getElementById("detect-objects");
const status = document.getElementById("status");
var image = '';

// Create a new object detection pipeline
status.textContent = "Loading model...";
const detector = await pipeline("object-detection", "Xenova/detr-resnet-50");
status.textContent = "Ready";

fileUpload.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();

    // Set up a callback when the file is loaded
    reader.onload = function (e2) {
        imageContainer.innerHTML = "";
        image = document.createElement("img");
        image.src = e2.target.result;
        imageContainer.appendChild(image);
        // Enable the detect objects button after an image is uploaded
        detectObjectsButton.disabled = false;
    };
    reader.readAsDataURL(file);
});

// Update threshold value when slider is changed
thresholdSlider.addEventListener('input', function () {
    thresholdValue.textContent = thresholdSlider.value;
});

// Enable Object Detection
detectObjectsButton.addEventListener('click', detectAndDrawObjects);

async function detectAndDrawObjects() {
    // Get threshold value from slider
    const threshold = parseFloat(thresholdSlider.value);

    clearPreviousAnnotations();
    status.textContent = "Detecting...";

    const detectedObjects = await detector(image.src, {
        threshold: threshold,
        percentage: true,
    });
    // console.log("Detected Objects:", detectedObjects);

    // Draw Detected Objects
    status.textContent = "Drawing...";
    detectedObjects.forEach(obj => {
        drawObjectBox(obj);
    });

    status.textContent = "Done!";
}

function clearPreviousAnnotations() {
    const existingBoxes = document.querySelectorAll('#image-container .bounding-box');
    existingBoxes.forEach(box => box.remove());
}

// Render a bounding box and label on the image
function drawObjectBox(detectedObject) {
    const { label, score, box } = detectedObject;
    const { xmax, xmin, ymax, ymin } = box;

    // Generate a random color for the box
    const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0);

    // Draw the box
    const boxElement = document.createElement('div');
    boxElement.className = 'bounding-box';
    Object.assign(boxElement.style, {
        borderColor: color,
        left: 100 * xmin + '%',
        top: 100 * ymin + '%',
        width: 100 * (xmax - xmin) + '%',
        height: 100 * (ymax - ymin) + '%',
    });

    // Draw label
    const labelElement = document.createElement('span');
    // labelElement.textContent = `${label}: ${Math.floor(score * 100)}%`;
    labelElement.textContent = `${label}`;
    labelElement.className = 'bounding-box-label';
    labelElement.style.backgroundColor = color;

    boxElement.appendChild(labelElement);
    imageContainer.appendChild(boxElement);
}
