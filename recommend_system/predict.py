import KNN
import sim

def P_make_predict(itemArr, profileArr,evalArr):
    #itemArr
    #profileArr
    #print("itemArr :",itemArr)
    #print("profileArr :", profileArr)
    #evalArr = evalCluster.evaluateList
    eval_mean = KNN.user_mean(itemArr, profileArr)
    newUserIndex = KNN.check_newUser(itemArr)
    comb_sim = sim.combSim(itemArr, evalArr)
    eval_totalMean = KNN.user_totalMean(itemArr, profileArr)
    #print("comb_sim: ",comb_sim)
    pred = [[0 for col in range(len(itemArr[0]))] for row in range(len(itemArr))]
    #pred = itemArr
    for k in range(len(itemArr[0])):
        is_new = 0
        #print(newUserIndex)
        for i in newUserIndex:
            if k == i:
                is_new = 1
        for i in range(len(itemArr)):
            if itemArr[i][k] == 0:
                numo = 0
                demo = 0
                pred[i][k] += eval_totalMean[k]
                #pred[i][k] += eval_mean[k]
                neighbor, Kn = KNN.existUser_KNN(itemArr, profileArr, k)
                #print("neighbor: ",neighbor)
                if is_new ==0 :

                    for u in neighbor:
                        #ki -u^ ki가 0이 아닌 건 확실하지만 어떤 값인지 알 수 없음
                        #numo += (0 - eval_mean[u]) * comb_sim[k][u]
                        numo += (0-eval_totalMean[u])*comb_sim[k][u]
                        demo += abs(comb_sim[k][u])
                else:
                    #newUserIndex, neighbor, NewEval_mean = KNN.newUser_KNN(itemArr,profileArr)
                    #position = newUserIndex.index(k)
                    for u in neighbor:
                        #numo += (0 - eval_mean[u]) * comb_sim[k][u]
                        numo += (0-eval_totalMean[u])*comb_sim[k][u]
                        demo += abs(comb_sim[k][u])
                #print("K^: ",pred[i][k])
                pred[i][k] += numo/demo
                #print("pred[i][k]: ", pred[i][k])

    # for i in range(len(itemArr)):
    #     for j in range(len(itemArr[0])):
    #         if itemArr[i][j] != 0:
    #             pred[i][j] = 0
    #print("predict.pred: ",pred)

    return pred

def P_ArrSeq(pred, itemAr):
    itemArr = [[0 for col in range(len(itemAr[0]))] for row in range(len(itemAr))]
    for i in range(len(itemArr)):
        for j in range(len(itemArr[0])):
            itemArr[i][j] = itemAr[i][j]
    #itemArr
    # for i in range(len(itemArr)):
    #     for j in range(len(itemArr[0])):
    #         if itemArr[i][j] != 0:
    #             pred[i][j] = 0
    predSeq = [[0 for col in range(len(pred[0]))] for row in range(len(pred))]
    for j in range(len(itemArr[0])):
        n=0
        for i in range(len(itemArr)):
            predSeq[i][j] = n
            n+=1

    for j in range(len(itemArr[0])):
        i=0
        while i <(len(itemArr)-1):

            k=0
            max = itemArr[i][j]
            while k<(len(itemArr)-1-i):
                z= i+k+1
                if max <= itemArr[z][j]:
                    max = itemArr[z][j]
                    itemArr[z][j] = itemArr[i][j]
                    itemArr[i][j] = max
                    temp_seq = predSeq[z][j]
                    predSeq[z][j] = predSeq[i][j]
                    predSeq[i][j] = temp_seq
                k += 1
            i += 1

    return pred, predSeq

def P_bind_id(predSeq, editorAr, postAr):
    #predSeq의 행이름은 유저, 열이름은 게시물, 속성은 평가점수
    #out_pred는 0열 유저id, 나머지 열은 추천순으로 정렬 된 게시물id
    out_pred = [[0 for col in range(len(predSeq)+1)] for row in range(len(predSeq[0]))]
    for i in range(len(out_pred)):
        out_pred[i][0] = editorAr[i][0]
    for i in range(len(predSeq)):
        for j in range(len(predSeq[0])):
            out_pred[j][1+i] = postAr[predSeq[i][j]][0]
    return out_pred

def P_scale_positive(pred):
    for i in range(len(pred)):
        for j in range(len(pred[0])):
            if pred[i][j] !=0:
                pred[i][j] = (pred[i][j] +4)*0.625
    return pred

# LSP = rcmSys.profileArr
# LSI = rcmSys.itemArr
#
#
# pred_Arr_first = make_predict(LSI, rcmSys.profileArr)
# predArr, predSeq = ArrSeq(pred_Arr_first, LSI)
#
#
#
# #여기서 pred는 예측 행렬을 예측치가 높은 순으로 정렬한 것
# #predSeq는 현재 pred의 인덱스가 원래 itemArr에서 몇번째 인덱스 였는 지 나타내 줌
# #print("pred: ", pred)
# #print("predSeq: ", predSeq)
#
# editorAr = loadData.editorArr(rcmSys.editor)
# postAr = loadData.postArr(rcmSys.post)
#
# out_pred = bind_id(predSeq,editorAr,postAr)
# #print("out_pred: ",out_pred)