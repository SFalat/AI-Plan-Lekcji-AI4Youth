from matplotlib import pyplot as plt
import numpy as np

dev_a = [-5.4, -25, -103.9]
dev_b = [-2.8, -12.2, -60.8]
dev_x = [5, 25, 125]

plt.title("Porównanie algorytmów układających plan lekcji")
xpos = np.arange(len(dev_a))
plt.xticks(xpos, dev_x)
plt.bar(xpos - 0.2, dev_a, width=0.4, label="Algorytm genetyczny")
plt.bar(xpos + 0.2, dev_b, width=0.4, label="Algorytm optymalizacji rojem cząstek")
plt.legend()
plt.xlabel("Ilość przydziałów nauczycieli")
plt.ylabel("Ocena algorytmu (na podstawie ilości okienek)")

plt.savefig("plot.png")
plt.show()
