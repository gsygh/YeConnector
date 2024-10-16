import predict
import random

def display(itemArr, profileArr):
    LSP = profileArr
    LSI = itemArr
    test_LSI = [[0 for col in range(len(LSI[0]))] for row in range(len(LSI))]
    for i in range(len(test_LSI)):
        for j in range(len(test_LSI[0])):
            test_LSI[i][j] = LSI[i][j]


    predArr, predSeq = predict.P_ArrSeq(pred_Arr_first, LSI)
    test_predArr, test_predSeq = predict.P_ArrSeq(test_Arr_first, test_LSI)

    m=[]
    n=[]
    rand=0
    randMax = len(test_LSI) - 1 #랜덤 최대값
    cnt = 0
    totalCnt = 0
    i=0
    #print(len(test_LSI[0]))
    while(1):
        if i >= len(test_LSI[0]):
            break
        check_new=1
        for k in range(len(test_LSI)):
            if test_LSI[j][i] !=0:
                check_new =0

        if check_new == 0:
            rand = random.randint(0,randMax)
            if test_LSI[rand][i] !=0:
                test_LSI[rand][i] =0
                m.append(rand)
                n.append(i)
                i+=1
                cnt+=1
        else:
            i+=1
        totalCnt+=1
    pred_Arr_first = predict.P_make_predict(LSI, LSP)
    test_Arr_first = predict.make_predict(test_LSI, LSP)
    mae=0
    sum=0
    for i in range(cnt):
        #print("i: ",i,"  m[i],n[j]",)
        sum += abs(test_Arr_first[m[i]][n[i]]-LSI[m[i]][n[i]])
    mae=sum/cnt
    print("MAE= ",mae)
    print("n= ",cnt)

#display()