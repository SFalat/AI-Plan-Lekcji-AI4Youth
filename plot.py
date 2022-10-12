from matplotlib import pyplot as plt
from random import shuffle

dev_y = [i for i in range(0, 9)]
dev_z = [i for i in range(0, 9)]
dev_x = [i for i in range(0, 90, 10)]
shuffle(dev_z)

plt.plot(dev_x, dev_y, color='r', label='sort')
plt.plot(dev_x, dev_z, color='g', label='random')

plt.xlabel("Czas algorytmiczny")
plt.ylabel("Ilość nauczycieli")
plt.title("Porównanie algorytmów")

plt.legend()
plt.savefig("plot.png")
plt.show()
