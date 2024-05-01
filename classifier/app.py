from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
from keras.preprocessing import image

app = Flask(__name__)

# Load the saved model
model = load_model('model.h5')
classes = {0: 'class_0', 1: 'class_1', 2: 'class_2', 3: 'class_3', 4: 'class_4', 5: 'class_5'}

def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(64, 64))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Rescale
    return img_array

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Save the uploaded file temporarily
    file_path = 'temp_image.png'
    file.save(file_path)

    # Preprocess the image
    test_image = preprocess_image(file_path)

    # Make prediction
    result = model.predict(test_image)

    # Check the predicted class
    predicted_class = np.argmax(result)
    predicted_class_name = classes[predicted_class]

    return jsonify({'predicted_class': predicted_class_name})

if __name__ == '__main__':
    app.run(debug=True)
