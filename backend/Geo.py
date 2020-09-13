import warnings

import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import shapefile as shp
from sklearn.utils.class_weight import compute_class_weight
from keras.preprocessing.image import load_img, img_to_array
import os


def main():
    X, y = import_data()
    model = make_model(X, y)
    predict(model)



def import_data():
    from PIL import Image
    # shp_path = "./Слои/Поля_Полигональные2.shp"
    # sf = shp.Reader(shp_path)
    # print(len(sf.shapes()))
    # print(sf.records()[1])
    files = os.listdir("cut_images_clean/")
    files = [x for x in files if x.endswith(".jpg")]
    x = []
    y = []

    for file in files:
        if file.startswith("g"):
            label = 1
        else:
            label = 0

        img_path = os.path.join("cut_images_clean/", file)
        im = Image.open(img_path)
        new_size = (40, 40)
        new_im = im.resize(new_size)

        img = img_to_array(new_im) / 255
        x.append(img)
        y.append(label)

    X = np.array(x)
    y = np.array(y)
    return X, y


def make_model(X, y):
    from keras import Sequential, layers

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)  # 20% тестовых данных

    print(X_train.shape)
    print(X_test.shape)
    print(y_train.shape)
    print(y_test.shape)

    cw = compute_class_weight("balanced", np.unique(y_train), y_train)

    model = Sequential([
        layers.Conv2D(16, (3, 3), name="conv1", input_shape=(40, 40, 3), activation="relu",
                      padding="same"),
        layers.MaxPool2D((2, 2), name="pool1"),
        layers.Dropout(0.2),
        layers.Conv2D(32, (3, 3), name="conv2", padding="same"),
        layers.Activation("relu"),
        layers.MaxPool2D((2, 2), name="pool2"),
        layers.Dropout(0.2),
        layers.Flatten(),
        layers.Dense(64, activation="relu"),
        layers.Dropout(0.2),
        layers.Dense(1),
        layers.Activation("sigmoid", name="prediction")
    ]
    )

    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["acc"])

    model.fit(X_train, y_train, epochs=15, validation_data=(X_test, y_test), class_weight=cw)
    return model


def predict(model):
    import slidingwindow as sw
    img_path = "test.png"
    img = load_img(img_path)
    img = img_to_array(img) / 255
    plt.imshow(img)

    subimages = []
    shape = 40
    windows = sw.generate(img, sw.DimOrder.HeightWidthChannel, shape, 0.6)
    for i, window in enumerate(windows):
        _img = img[window.indices()]
        subimages.append(_img)
    subimages = np.array(subimages)

    n_total = len(windows)
    _x = 0
    for i, window in enumerate(windows):
        if _x != window.x:
            n_x = i
            print(n_x)
            break
        _x = window.x

    print(n_total, n_x, n_total // n_x)

    # predictions = []
    # for image in subimages:
    #     prediction = model.predict(image)
    #     predictions.append(prediction)

    predictions = model.predict(subimages)
    print(predictions.shape)

    field = np.reshape(predictions, (n_total // n_x, n_x))
    field = np.rot90(field)
    field = np.flip(field, axis=0)

    h_factor = img.shape[0] // field.shape[0]
    w_factor = img.shape[1] // field.shape[1]

    from scipy.ndimage import zoom
    zoomed = zoom(field, (h_factor, w_factor))
    plt.axis('off')
    plt.imshow(zoomed, alpha=0.3, vmax=1.0, vmin=0, cmap="jet")
    # plt.colorbar(pad=0.05, alpha=0)
    plt.savefig('c.png', bbox_inches='tight', pad_inches=0)


if __name__ == "__main__":
    warnings.filterwarnings(action="ignore")
    main()
