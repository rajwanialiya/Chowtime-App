import matplotlib.pyplot as plt
import keras_ocr
import ssl
import itertools

ssl._create_default_https_context = ssl._create_unverified_context
pipeline = keras_ocr.pipeline.Pipeline()

images = [
    keras_ocr.tools.read(url) for url in ['https://upload.wikimedia.org/wikipedia/commons/b/b4/EUBanana-500x112.jpg']
]

# # Each list of predictions in prediction_groups is a list of
# # (word, box) tuples.
prediction_groups = pipeline.recognize(images)

# # Plot the predictions

fig, axs = plt.subplots(nrows=len(images), figsize=(20, 20))
for ax, image, predictions in zip(itertools.repeat(axs, len(images)), images, prediction_groups):
    annotated_image = keras_ocr.tools.drawAnnotations(image=image, predictions=predictions, ax=ax)

    fig = annotated_image.get_figure()
    fig.savefig("output.png")