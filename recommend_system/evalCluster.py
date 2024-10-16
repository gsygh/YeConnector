import sys
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans

#배열 전체 표시를 위한 옵션
np.set_printoptions(threshold=sys.maxsize)


'''
print("k-means clustering: ",y_km)
print("cluter center: ", center)
'''

    # : 는 전체를 사용한다는 의미
    # center = km.cluster_centers_[:,3]
def eval(feature, clusterK):
    #k의 수는 center의 행 개수, 입력 데이터의 열 개수는 center의 열 개수
    #feature = rcmSys.profileArr
    #k = 2
    init_centroid = 'random'
    km = KMeans(n_clusters=clusterK, init=init_centroid, random_state=0)
    y_km = km.fit_predict(feature)

    center = km.cluster_centers_[:, :]
    Cshape = center.shape
    #center는 2차원 배열이므로 [행][열] 순

    centerCol = Cshape[1]
    centerRow = clusterK


    featureCol = len(feature[0])  # 열 크기 = 행 크기
    featureRow = len(feature) #행 크기 = 열 크기


    MaxDist=[1 for i in range(clusterK)]
    dist =[0 for i in range(featureRow) ]
    distAll = [[0 for col in range(featureRow)] for row in range(clusterK)]

    featureList = [[0 for col in range(featureCol)] for row in range(featureRow)]
    evalList = [[0 for col in range(featureRow)] for row in range(clusterK)]

    for j in range(0, featureRow):
        # 입력 데이터의 열 개수
        for k in range(0, featureCol):
            featureList[j][k] = pd.to_numeric(feature[j][k])

    #클러스터 중심 - 프로파일 벡터 간의 유클리디안 거리 및 최대 값 측정
    #클러스터 중심의 수 만큼 반복
    for i in range(0,clusterK):
        #ct = pd.to_numeric(center[0,:])
        centerRowData = pd.to_numeric(center[i])

        #모든 클러스터의 수 만큼 반복
        #입력 데이터의 행 개수
        for j in range(0,featureRow): #header를 드랍해서 0번행 사용x featureRow에 +1 해야함
            #입력 데이터의 열 개수
            for k in range(0,featureCol):
                dist[j] += (centerRowData[k] - featureList[j][k]) ** 2
                #클러스터 수 i, 입력 데이터의 행 개수 j
            dist[j] = dist[j] ** 0.5
            distAll[i][j] = dist[j]
            if j==0:
                MaxDist[i] = dist[j]
            elif MaxDist[i] < dist[j]:
                MaxDist[i] = dist[j]

    #각 클러스터에 속할 정도를 계산한 평가 행렬 생성
    for i in range(0, clusterK):
        centerRowData = pd.to_numeric(center[i])
        for j in range(0, featureRow):  # header를 드랍해서 0번행 사용x featureRow에 +1 해야함
            # 입력 데이터의 열 개수
                evalList[i][j] = (1- distAll[i][j]/MaxDist[i]) #백분율 표현을 위해 100을 곱함
        #추후 백분율 표현을 위해 100을 곱한 것을 지워야함
    '''
    for i in range(0, clusterK):
        print("group",i+1,": ",evalList[i])
        # i-클러스터 중심에 대한 벡터-그룹 평가 행렬
    print(evalList)
    '''
    return evalList


#print(evaluateList)