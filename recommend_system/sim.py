import numpy as np
#클러스터 평가행렬과 항목 평가행렬을 입력으로 받아야함
def listCoupling(itemList, evalList):
    #tranposed evalList
    TEvalList = list(map(list, zip(*evalList)))
    #return np.vstack((itemList,evalList.T)) #np로 만들어진 행렬이 아니기 때문에 .T 안됨
    return np.vstack((itemList, TEvalList))


#피어슨 상관계수는 항목평가 행렬에 대해 유사도 측정
def pearsonSim(itemList):
    # len(lis)  # 행개수 len(lis[0])  # 열개수
    #항목평가행렬의 열개수를 한변으로 갖는 정사각행렬을 생성
    psList = [[0 for col in range(len(itemList[0]))]
               for row in range(len(itemList[0]))]

    #신규 유저(평가항목이 없는 유저) 처리를 위한 행렬
    tmpList = [0 for i in range(len(itemList))]
    #선행하는 유저가 평가한 항목의 개수만큼 m을 잡는다
    for i in range(len(itemList)):
        sum=0
        for j in range(len(itemList[0])):
            sum += itemList[i][j]
        if sum==0:
            tmpList[i] =1 #신규 유저의 값을 1으로
    #필요 없을 듯...

    # #항목평가행렬의 유저별 평가에 대한 평균 행렬 생성
    # meanList = [0 for i in range(len(itemList[0]))]
    # row = len(itemList)
    # for i in range(len(itemList[0])):
    #     sum = 0
    #     for j in range(len(itemList)):
    #         sum += itemList[j][i]
    #     mean = sum/row
    #     meanList[i] = mean
    # #print(meanList) 평균값 정상적으로 구해짐

    #피어슨 상관계수 처리 반복문
    for i in range(len(psList)):
        for j in range(len(psList)):
            if i==j:    #동일 유저에 대한 유사도는 1
                psList[i][j] =1
            else:
                #반복문의 횟수 m과 유저 i와 j의 항목 평가치 평균을 계산하며
                #i와 j가 공통적으로 평가한 항목이 각각 몇번째 행인지 계산하는 반복문
                #items Eval Both by users
                evalitemIndexes = []
                sums = [0, 0]
                means = [0, 0]
                iteration = 0
                for k in range(len(itemList)):
                    if itemList[k][i] != 0 and itemList[k][j] != 0: #공통 평가 항목 유무 검사
                        iteration += 1
                        evalitemIndexes.append(k)
                        sums[0] += itemList[k][i]
                        sums[1] += itemList[k][j]
                if iteration !=0: #공통 평가 항목이 최소 한개 이상일 경우만 평균값 계산
                    means[0] = sums[0] / iteration #유저 i의 항목평가치 평균
                    means[1] = sums[1] / iteration #유저 j의 항목평가치 평균
                #if i ==0:
                    #print("means: ",means)
                    #print("m: ",evalitemIndexes)

                cov=0
                Ok=0
                Ol=0
                if iteration !=0:
                    for m in evalitemIndexes:
                        # if i == 0 and j == 0:
                        #     print("cov: ", "(", itemList[m][i], "-", means[0],
                        #           ")*(",itemList[m][j], "-", means[1], ")")
                        #     print("Ok: (",itemList[m][i],"-",means[0],")**2")
                        #     print("Ol: (", itemList[m][j], "-", means[1], ")**2")
                        cov += (itemList[m][i]-means[0])*(itemList[m][j]-means[1])
                        Ok += (itemList[m][i]-means[0])**2
                        Ol += (itemList[m][j]-means[1])**2
                    Ok = Ok**0.5
                    Ol = Ol**0.5
                    if Ok*Ol ==0:
                        sim =0
                    else:
                        sim = cov /(Ok*Ol)
                    psList[i][j] = sim
                else:
                    psList[i][j] = 0
    return psList

#보완 코사인 유사도는 클러스터링 평가행렬에 대해 유사도 측정
def cosineSim(evalList):
    TEvalList = evalList
    #테스트를 위해 TEvalList = evalList로 설정한 것, 실제 데이터 투입 시에는 아래 주석을 사용
    #TEvalList = list(map(list, zip(*evalList)))

    # len(lis)  # 행개수 len(lis[0])  # 열개수
    #전치 된 평가행렬의 열개수를 한변으로 갖는 정사각행렬을 생성
    csList = [[0 for col in range(len(TEvalList[0]))]
               for row in range(len(TEvalList[0]))]



    #항목평가행렬의 유저별 평가에 대한 평균 행렬 생성
    meanList = [0 for i in range(len(TEvalList))]
    col = len(TEvalList[0])
    for i in range(len(TEvalList)):
        sum = 0
        for j in range(len(TEvalList[0])):
            sum += TEvalList[i][j]
        mean = sum/col
        meanList[i] = mean

    #코사인 유사도 처리 반복문
    for i in range(len(csList)):
        for j in range(len(csList)):
            cov = 0
            Ok = 0
            Ol = 0
            for k in range(len(TEvalList)):
                cov += (TEvalList[k][i]-meanList[k])*(TEvalList[k][j]-meanList[k])
                Ok += (TEvalList[k][i]-meanList[k])**2
                Ol += (TEvalList[k][j]-meanList[k])**2
            Ok = Ok**0.5
            Ol = Ol**0.5
            if i==j:
                sim =1
            else:
                sim = cov /(Ok*Ol)
            csList[i][j] = sim
    return csList

def combSim(itemList, evalList):
    #피어슨 상관계수 행렬
    psList = pearsonSim(itemList)
    #psList = itemList
    #코사인 유사도 행렬
    csList = cosineSim(evalList)
    #csList = evalList
    cpsList =[[0 for col in range(len(itemList[0]))]
              for row in range(len(itemList[0]))]
    for i in range(len(itemList[0])):
        for j in range(len(itemList[0])):
            cpsList[i][j] = psList[i][j]*(1-0.4) + csList[i][j]*0.4
    return cpsList
