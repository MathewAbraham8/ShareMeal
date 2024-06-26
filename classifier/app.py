import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
from tensorflow.keras.models import load_model
# from keras.preprocessing import image
from tensorflow.keras.preprocessing.image import img_to_array, load_img

model = load_model('model.h5')

app = Flask(__name__)
CORS(app)

@app.route('/predict',methods=['POST'])
def hello():
    file = request.files['image']

    
    # Do something with the file, e.g., save it to disk or process it
    file.save('image.png')


    test_image = load_img('image.png',target_size=(64,64))
    test_image = img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis = 0)
    result = model.predict(test_image)
    
    print(result)
  
    arr_list = result.tolist()

    print(arr_list)
    # classes = ['Fresh Apple','Fresh Banana','Fresh Orange','Rotten Apple','Rotten Banana','Rotten Orange']

    for i in range(6):
        if arr_list[0][i] == 1.0:
            if i<3:
                return jsonify({'message' : 'fresh'})
            else:
                return jsonify({'message' : 'rotten'})

if __name__ == '__main__':
    app.run(debug=True)