import warnings
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import shapefile as shp
from sklearn.utils.class_weight import compute_class_weight


def main(X, y):
    import_data()
    # model = make_model(X, y)
    # predict(model)


def import_data():
    shp_path = "./Слои/Поля_Полигональные2.shp"
    sf = shp.Reader(shp_path)
    print(len(sf.shapes()))
    print(sf.records()[1])


def make_model(X, y):
    import keras
    from keras import Sequential, layers

    print(X.shape)
    print(y.shape)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)  # 20% тестовых данных

    print(X_train.shape)
    print(X_test.shape)
    print(y_train.shape)
    print(y_test.shape)

    cw = compute_class_weight("balanced", np.unique(y_train), y_train)

    model = Sequential([
        layers.Conv2D(16, (3, 3), name="conv1", input_shape=(X.shape[1], X.shape[2], X.shape[3]), activation="relu",
                      padding="same"),
        layers.MaxPool2D((2, 2), name="pool1"),
        layers.Dropout(0.2),
        layers.Conv2D(32, (3, 3), name="conv2", padding="same"),
        layers.Activation("relu"),
        layers.MaxPool2D((2, 2), name="pool2"),
        layers.Dropout(0.2),
        layers.Conv2D(32, (3, 3), name="conv3", padding="same"),
        layers.Activation("relu"),
        layers.MaxPool2D((2, 2), name="pool3"),
        layers.Dropout(0.2),
        layers.Flatten(),
        layers.Dense(64, activation="relu"),
        layers.Dropout(0.2),
        layers.Dense(1),
        layers.Activation("sigmoid", name="prediction")
    ]
    )

    model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["acc"])

    model.summary()
    model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test), class_weight=cw)
    return model


def predict(model, image):
    import slidingwindow as sw
    subimages = []
    shape = 56
    windows = sw.generate(image, sw.DimOrder.HeightWidthChannel, shape, 0.6)
    for i, window in enumerate(windows):
        _img = image[window.indices()]
        subimages.append(_img)
    patches = np.array(subimages)

    n_total = len(windows)
    _x = 0
    for i, window in enumerate(windows):
        if _x != window.x:
            n_x = i
            print(n_x)
            break
        _x = window.x

    print(n_total, n_x, n_total // n_x)

    predictions = model.predict(subimages)
    print(predictions.shape)
    print(predictions)

    field = np.reshape(predictions, (n_total // n_x, n_x))
    field = np.rot90(field)
    field = np.flip(field, axis=0)
    plt.imshow(field, cmap="jet")

    h_factor = image.shape[0] // field.shape[0]
    w_factor = image.shape[1] // field.shape[1]

    from scipy.ndimage import zoom
    zoomed = zoom(field, (h_factor, w_factor))

    plt.imshow(image)
    plt.imshow(zoomed, alpha=0.3, vmax=1.0, vmin=0, cmap="jet")

    plt.colorbar(fraction=0.027, pad=0.04, alpha=0)
    plt.show()


if __name__ == "__main__":
    warnings.filterwarnings(action="ignore")
    X = []
    y = []
    main(X, y)
