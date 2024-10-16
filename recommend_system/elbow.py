from sklearn.cluster import KMeans
import matplotlib.pyplot  as plt



#feature = rcmSys.scaled_profile

def elbow(X):
    sse = []

    for i in range(1,8):
        km = KMeans(n_clusters=i,algorithm='auto', random_state=0)
        km.fit(X)
        sse.append(km.inertia_)


    plt.plot(range(1,8), sse, marker='o')
    plt.xlabel('K')
    plt.ylabel('SSE')
    plt.show()

#elbow(feature)