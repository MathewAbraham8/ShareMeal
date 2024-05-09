from flask import Flask,request,jsonify
from tensorflow.keras.models import load_model
import numpy as np
# from keras.preprocessing import image
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from flask_cors import CORS

model = load_model('model.h5')

app = Flask(__name__)
CORS(app)

@app.route('/predict',methods=['POST'])

def hello():


    file = request.files['image']
    print(file)
    # Do something with the file, e.g., save it to disk or process it
    file.save('image.png')


    test_image = load_img('image.png',target_size=(64,64))
    test_image = img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis = 0)
    result = model.predict(test_image)
    
    print(result)

    arr_list = result.tolist()


    return jsonify(arr_list)

if __name__ == '__main__':
    app.run(debug=True)