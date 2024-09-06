# AI Object Detection Web App

This project demonstrates how to perform object detection using `transformers.js` with a simple web interface. Users can upload images, set a detection threshold using a slider, and view detected objects with bounding boxes and labels drawn on the image.

## Features

- **Image Upload:** Upload images for object detection
- **Threshold Slider:** Adjust the detection threshold using a slider
- **Object Detection:** Automatically detect objects in the uploaded image
- **Dynamic Annotations:** Draw bounding boxes and labels around detected objects

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sycDev/ai-object-detection-vite.git
   ```

2. **Navigate to the Project Directory:**

    ```bash
    cd ai-object-detection-vite
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Run the Development Server:**

    ```bash
    npm run dev
    ```
    Open your browser and follow the instructions to view the application.

## Usage

1. **Upload an Image:** Click the "Upload Image" button to select and upload an image from your device.

2. **Set Detection Threshold:** Use the slider to adjust the detection threshold. The threshold value determines the confidence level required for an object to be detected.

3. **Detect Objects:** Click the "Detect Objects" button to start the detection process. The status will be updated to show progress.

4. **View Results:** Detected objects will be annotated on the image with bounding boxes and labels.

## API Documentation

- **HuggingFace Transformers.js:** [HuggingFace Transformers.js API Docs](https://huggingface.co/docs/transformers.js/en/index)
