from matplotlib import pyplot as plt
import numpy as np


def generate_plot_1(dev_a, dev_b, dev_x):
    plt.title("Porównanie algorytmów układających plan lekcji (średnia z 10 testów)")
    xpos = np.arange(len(dev_a))
    plt.xticks(xpos, dev_x)
    plt.bar(xpos - 0.2, dev_a, width=0.4, label="Algorytm genetyczny")
    plt.bar(xpos + 0.2, dev_b, width=0.4, label="Algorytm optymalizacji rojem cząstek")
    plt.legend()
    plt.xlabel("Ilość przydziałów nauczycieli")
    plt.ylabel("Ocena algorytmu (na podstawie ilości okienek -> min)")

    plt.savefig("plot1.png")
    plt.show()


def generate_plot_2(dev_a, dev_b, dev_x):
    plt.title("Porównanie algorytmów układających plan lekcji (średnia z 10 testów)")
    xpos = np.arange(len(dev_a))
    plt.xticks(xpos, dev_x)
    plt.bar(xpos - 0.2, dev_a, width=0.4, label="Algorytm genetyczny")
    plt.bar(xpos + 0.2, dev_b, width=0.4, label="Algorytm optymalizacji rojem cząstek")
    plt.legend()
    plt.xlabel("Ilość przydziałów nauczycieli")
    plt.ylabel("Czas wykonywania (w sekundach)")

    plt.savefig("plot2.png")
    plt.show()


generate_plot_1(dev_a=[5.4, 25, 103.9], dev_b=[2.8, 12.2, 60.8], dev_x=[5, 25, 125])
generate_plot_2(dev_a=[127.59, 536.76, 2922.77], dev_b=[131.70, 538.55, 5198.56], dev_x=[5, 25, 125])
