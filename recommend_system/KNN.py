import pandas as pd
maximum = 999999


#오브젝트 타입을 배열으로 변경
def K_obj2Arr(obj):
    #data = csvData.data.astype(float) #데이터들을 float타입으로 변경
    data = obj
    dataRow = data.shape[0]
    dataCol = data.shape[1]
    #print("data.type: ",data.dtypes)
    #print(data.shape)

    '''
    오브젝트 타입은 행과 열이 반대이며
     drop을 적용하면 len는 줄어들지만 해당 행이나 열은 nullPointer를 가리키는 상태이다
     즉 인덱스를 접근할 때 drop한 인덱스를 피하여 접근해야한다. 
     중요
    print(data)
    print("data[][]: ",data[2][1])
    '''
    Ndata = [[0 for col in range(dataCol)] for row in range(dataRow)]
    for i in range(0,dataRow):
         for j in range(0,dataCol):
             #obj는 행과 열이 뒤바뀜, drop한 것 생각하면서 인덱스 접근
             Ndata[i][j] = pd.to_numeric(data[j+1][i+1])
    return Ndata

#신규유저를 검사하고 신규유저의 인덱스를 배열로 반환
def K_check_newUser(itemArr):
    newUserIndex =[]
    for i in range(len(itemArr[0])): #열이름 유저
        check_new = 0
        for j in range(len(itemArr)): #행이름 게시물
            if itemArr[j][i] !=0:
                check_new =1
        if check_new ==0:
            newUserIndex.append(i)
    return newUserIndex

#신규유저와 다른 모든유저의 유클리디안 거리를 계산하고 자신과의 거리는 최대값으로 지정한다
def K_euclidean_distance(profileArr, UserIndex):
    # 열갯수, 유저
    #print("profile: ",profileArr)
    distance = [0 for i in range(len(profileArr)) ]
    for i in range(len(profileArr)):
        if(i != UserIndex): #신규유저의 인덱스와 현재 반복 인덱스가 같은지 검사
            for j in range(len(profileArr)):
                distance[i] += (profileArr[UserIndex][j]-profileArr[i][j])**2
            distance[i] = distance[i] ** 0.5
        else:
            distance[i] = maximum
    return distance #각 인덱스가 유저인덱스와 동일하며, 신규유저와의 거리를 갖는 배열

def K_existUser_KNN(itemArr, profileArr, userIndex):
    #itemArr
    #profileArr
    newUserIndex = K_check_newUser(itemArr)
    k_neighbor = round(len(itemArr[0]) **0.5) #해당 유저의 이웃 수
    neighbor = [0 for i in range(k_neighbor)]
    distance = K_euclidean_distance(profileArr,userIndex)
    for i in newUserIndex:
        distance[i] =maximum

    sort_dist = sorted(distance)
    for i in range(k_neighbor):
        for z in range(len(distance)):
            if sort_dist[i] == distance[z]:
                neighbor[i] = z

    return neighbor, k_neighbor

def K_newUser_KNN(itemArr, profileArr):
    # itemArr
    # profileArr
    newUserIndex = K_check_newUser(itemArr)
    k = round(len(itemArr[0]) **0.5)
    neighbor = [ [0 for col in range(k)]for row in range(len(newUserIndex))]
    eval_mean = [0 for i in range(len(newUserIndex))]
    for i in range(len(newUserIndex)):
        distance = K_euclidean_distance(profileArr,newUserIndex[i])
        sort_dist = sorted(distance)
        #print(distance)
        #print(sort_dist)
        for j in range(k):
            for z in range(len(distance)):
                #print("z :", z)
                if sort_dist[j] == distance[z]:
                    neighbor[i][j] = z
    # print("len__newUserIndex: ", len(newUserIndex))
    # print("k :", k)
    # print("len__itemArr: ",len(itemArr))
    # print("itemArr: ",len(itemArr),", ",len(itemArr[0]))
    # print("neighbor: ", len(neighbor),", ",len(neighbor[0]))
    # print(neighbor)
    for i in range(len(newUserIndex)):
        sum = 0
        for j in range(k):
            for z in range(len(itemArr)):
                sum += itemArr[z][neighbor[i][j]]
        eval_mean[i] = sum/(z * len(itemArr))

    return newUserIndex, neighbor, eval_mean

#기존유저의 항목 평가치 평균
def K_user_mean(itemArr, profileArr):
    newUserIndex, neighbor, newUser_mean = K_newUser_KNN(itemArr, profileArr)
    #item = loadData.scaled_item
    profileData = profileArr
    mean = [0 for i in range(len(itemArr[0]))]

    for i in range(len(itemArr[0])):
        check_new =-1
        for n in range(len(newUserIndex)):
            if i == newUserIndex[n]:
                check_new =n
                break
        if check_new !=-1:
            mean[i] = newUser_mean[check_new]
        else:
            eval_amount =0
            sum = 0
            for j in range(len(itemArr)):
                if itemArr[j][i] !=0:
                    eval_amount +=1
                    sum += itemArr[j][i]
            mean[i] = sum / eval_amount
    return mean

def K_user_totalMean(itemArr, profileArr):
    newUserIndex, neighbor, newUser_mean = K_newUser_KNN(itemArr, profileArr)
    #item = loadData.scaled_item
    profileData = profileArr
    mean = [0 for i in range(len(itemArr[0]))]

    for i in range(len(itemArr[0])):
        check_new =-1
        for n in range(len(newUserIndex)):
            if i == newUserIndex[n]:
                check_new =n
                break
        if check_new !=-1:
            mean[i] = newUser_mean[check_new]
        else:
            eval_amount =0
            sum = 0
            for j in range(len(itemArr)):
                #if item[j][i] !=0:
                eval_amount +=1
                sum += itemArr[j][i]
            mean[i] = sum / eval_amount
    return mean





