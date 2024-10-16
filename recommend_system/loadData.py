
from sklearn.preprocessing import MinMaxScaler


# item= "[{\"editor_post_id\":\"tlfkthsl95@gmail.com-6\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"3.5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-1\",\"satisfaction\":\"1\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"}]"
# #게시물 전체 테이블 (post_id, editor_id)
# post= "[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"editor_id\":\"editorposttest@gmail.com\"}]"
# #게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
# postAcategory="[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"category\":\"comedy\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"category\":\"music\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"category\":\"education\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"category\":\"education\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"category\":\"movie/animation\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"category\":\"animal\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"category\":\"game\",\"editor_id\":\"editorposttest@gmail.com\"}]"
# #편집자 정보 전체 테이블 (user_id)
# editor= "[{\"user_id\":\"tlfkthsl95@gmail.com\"},{\"user_id\":\"editorposttest@gmail.com\"},{\"user_id\":\"editorposttesttest@gmail.com\"},{\"user_id\":\"ha0293279@gmail.com\"}]"
# #편집자 프로필 전체 테이블(user_age, user_gender, user_id, category1, category2)
# editor_profile= "[{\"preffered_category\":[\"game\",\"comedy\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"tlfkthsl95@gmail.com\",\"category1\":\"game\",\"category2\":\"comedy\"},{\"preffered_category\":[\"movie/animation\",\"car/traffic\"],\"user_age\":\"27\",\"user_gender\":\"man\",\"user_id\":\"editorposttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"car/traffic\"},{\"preffered_category\":[\"movie/animation\",\"movie/animation\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"editorposttesttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"movie/animation\"},{\"preffered_category\":[\"sports\",\"character/blog\"],\"user_age\":\"24\",\"user_gender\":\"man\",\"user_id\":\"ha0293279@gmail.com\",\"category1\":\"sports\",\"category2\":\"character/blog\"}]"


#항목 평가 테이블(post_id, satistaction, user_id)
item=""
#= "[{\"editor_post_id\":\"tlfkthsl95@gmail.com-6\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"3.5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-1\",\"satisfaction\":\"1\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"}]"
#게시물 전체 테이블 (post_id, editor_id)
post=""
#= "[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"editor_id\":\"editorposttest@gmail.com\"}]"
#게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
postAcategory=""
#="[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"category\":\"comedy\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"category\":\"music\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"category\":\"education\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"category\":\"education\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"category\":\"movie/animation\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"category\":\"animal\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"category\":\"game\",\"editor_id\":\"editorposttest@gmail.com\"}]"
#편집자 정보 전체 테이블 (user_id)
editor=""
#= "[{\"user_id\":\"tlfkthsl95@gmail.com\"},{\"user_id\":\"editorposttest@gmail.com\"},{\"user_id\":\"editorposttesttest@gmail.com\"},{\"user_id\":\"ha0293279@gmail.com\"}]"
#편집자 프로필 전체 테이블(user_age, user_gender, user_id, category1, category2)
editor_profile=""
#= "[{\"preffered_category\":[\"game\",\"comedy\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"tlfkthsl95@gmail.com\",\"category1\":\"game\",\"category2\":\"comedy\"},{\"preffered_category\":[\"movie/animation\",\"car/traffic\"],\"user_age\":\"27\",\"user_gender\":\"man\",\"user_id\":\"editorposttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"car/traffic\"},{\"preffered_category\":[\"movie/animation\",\"movie/animation\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"editorposttesttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"movie/animation\"},{\"preffered_category\":[\"sports\",\"character/blog\"],\"user_age\":\"24\",\"user_gender\":\"man\",\"user_id\":\"ha0293279@gmail.com\",\"category1\":\"sports\",\"category2\":\"character/blog\"}]"

import pandas as pd
from sklearn.preprocessing import StandardScaler
threshold = 3

def editor_profileArr(editor_profile):
    editor_profile = editor_profile.replace("\"", "")
    editor_profile = editor_profile.replace("{", "")
    editor_profile = editor_profile.replace("}", "")
    editor_profile = editor_profile.replace("[", "")
    editor_profile = editor_profile.replace("]", "")
    editor_profile = editor_profile.split(sep=",")

    for i in range(len(editor_profile)):
        editor_profile[i] = editor_profile[i].split(sep=":")
    #print(editor_profile)
    tmp = [[0 for col in range(2)] for row in range((len(editor_profile)-(int(len(editor_profile)/7)*2)))]
    for i in range(len(editor_profile)): #선호카테고리 배열 버림
        if i%7 !=0 and i%7 !=1:
            #print("i-~~: ",i - (int(i / 7) * 2),"   i :",i)
            tmp[i-int(i/7+1)*2][0] = editor_profile[i][0]
            tmp[i-int(i/7+1)*2][1] = editor_profile[i][1]
    editor_profile = tmp    #(user_age, user_gender, user_id, category1, category2)
    #print(editor_profile)
    c = 5
    r = int(len(editor_profile) / 5)

    editor_profileArr = [[0 for col in range(c)] for row in range(r)]

    for i in range(len(editor_profileArr)):
        a = i * 5 + 0
        b = i * 5 + 1
        c = i * 5 + 2
        d = i * 5 + 3
        e = i * 5 + 4
        if editor_profile[a][0] == ("user_age"):
            editor_profileArr[i][0] = editor_profile[a][1]
        if editor_profile[b][0] == ("user_gender"):
            editor_profileArr[i][1] = editor_profile[b][1]
        if editor_profile[c][0] == ("user_id"):
            editor_profileArr[i][2] = editor_profile[c][1]
        if editor_profile[d][0] == ("category1"):
            editor_profileArr[i][3] = editor_profile[d][1]
        if editor_profile[e][0] == ("category2"):
            editor_profileArr[i][4] = editor_profile[e][1]

    #print("editor_profileArr: ",editor_profileArr)
    return editor_profileArr

def editorArr(editor):
    editor = editor.replace("\"", "")
    editor = editor.replace("{", "")
    editor = editor.replace("}", "")
    editor = editor.replace("[", "")
    editor = editor.replace("]", "")

    editor = editor.split(sep=",")
    for i in range(len(editor)):
        editor[i] = editor[i].split(sep=":")
    c = 1
    r = int(len(editor)/1)

    editorAr = [[0 for col in range(c)] for row in range(r)]

    for i in range(len(editorAr)):
        a=i*1+0
        if editor[a][0]==("user_id"):
            editorAr[i][0] = editor[a][1]

    #print("editorArr: ",editorAr)
    return editorAr

def postArr(post):
    post = post.replace("\"", "")
    post = post.replace("{", "")
    post = post.replace("}", "")
    post = post.replace("[", "")
    post = post.replace("]", "")

    post = post.split(sep=",")
    for i in range(len(post)):
        post[i] = post[i].split(sep=":")
    c = 2
    r = int(len(post)/2)
    postAr = [[0 for col in range(c)] for row in range(r)]
    for i in range(len(postAr)):
        a=i*2+0
        b=i*2+1
        if post[a][0]==("post_id"):
            postAr[i][0] = post[a][1]
        if post[b][0] ==("editor_id"):
            postAr[i][1] = post[b][1]

    #print("postArr: ",postAr)
    return postAr

def postAcategoryArr(postAcategory):
    postAcategory = postAcategory.replace("\"", "")
    postAcategory = postAcategory.replace("{", "")
    postAcategory = postAcategory.replace("}", "")
    postAcategory = postAcategory.replace("[", "")
    postAcategory = postAcategory.replace("]", "")
    postAcategory = postAcategory.split(sep=",")

    for i in range(len(postAcategory)):
        postAcategory[i] = postAcategory[i].split(sep=":")

    c = 3
    r = int(len(postAcategory)/3)
    #print(postAcategory)
    postAcategoryAr = [[0 for col in range(c)] for row in range(r)]
    # 게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
    for i in range(len(postAcategoryAr)):
        a=i*3+0
        b=i*3+1
        c=i*3+2
        if postAcategory[a][0]==("post_id"):
            postAcategoryAr[i][0] = postAcategory[a][1]
        if postAcategory[b][0] ==("category"):
            postAcategoryAr[i][1] = postAcategory[b][1]
        if postAcategory[c][0] ==("editor_id"):
            postAcategoryAr[i][2] = postAcategory[c][1]

    #print("postAcategoryArr: ",postAcategoryAr)
    return postAcategoryAr

def evalItemArr(item):
    item = item.replace("\"","")
    item = item.replace("{","")
    item = item.replace("}","")
    item = item.replace("[","")
    item = item.replace("]","")
    item = item.split(sep=",")

    for i in range(len(item)):
        item[i] = item[i].split(sep=":")


    c = 3
    r = int(len(item)/3)

    itemArr = [[0 for col in range(c)] for row in range(r)]

    for i in range(len(itemArr)):
        a=i*3+0
        b=i*3+1
        c=i*3+2
        if item[a][0]==("editor_post_id"):
            itemArr[i][0] = item[a][1]
        if item[b][0] ==("satisfaction"):
            itemArr[i][1] = item[b][1]
        if item[c][0] == ("user_id"):
            itemArr[i][2] = item[c][1]

    #print("itemArr: ",itemArr)
    return itemArr

    # 누가 작성했느냐는 중요치 않다
    # 누가 어떤 게시글에 평가했는지에 대해 만들어야 함
def makeItemList(item, post, editor):
    #열 이름은 평가유저, 행 이름은 모든 게시물
    #즉 열은 editorArr을 따르고, 행은 postArr을 따른다
    itemAr = evalItemArr(item)
    postAr = postArr(post)
    editorAr = editorArr(editor)
    # print("itemAr: ", itemAr)
    # print("postAr: ",postAr)
    # print("editorAr: ",editorAr)
    # print(len(editorAr))
    # print(len(postAr))

    allItemArr = [[0 for col in range(len(editorAr))] for row in range(len(postAr))]
    for i in range(len(itemAr)):
        col=-1
        row=-1
        for a in range(len(postAr)):
            if itemAr[i][0] == postAr[a][0]:
                row = a
        for b in range(len(editorAr)):
            if itemAr[i][2] == editorAr[b][0]:
                col = b
        if col!=-1 and row!=-1:
            allItemArr[row][col] = itemAr[i][1]
    #print("allItemArr: ", allItemArr)
    for i in range(len(allItemArr)):
        for j in range(len(allItemArr[0])):
            allItemArr[i][j] = pd.to_numeric(allItemArr[i][j])

    #print("allItemArr: ",allItemArr)
    #print(len(allItemArr),"  " ,len(allItemArr[0]))
    return allItemArr

def makeWeightList(item, post, editor, postAcategory):
    #열 이름은 평가유저, 행 이름은 모든 게시물
    #즉 열은 editorArr을 따르고, 행은 postArr을 따른다
    #allItemArr = [[0 for col in range(len(editorAr))] for row in range(len(postAr))]
    allItemArr = makeItemList(item, post, editor)
    postAcategoryAr =postAcategoryArr(postAcategory)

    #가중치 리스트는 editor 테이블의 순서를 그대로 따른다
    #열 이름은 카테고리, 행 이름은 모든 유저
    size =15
    weightArr = [[0 for col in range(size)] for row in range(len(allItemArr[0]))]
    categoryArr = ["movie/animation","car/traffic","music","animal","sports",
                   "travel/event","game","character/blog","comedy" ,"entertainment",
                   "news/politics","knowhow/style","education","science_technology",
                   "nonprofit/social_movement" ]
    for j in range(len(allItemArr[0])): #열 이름 = 모든유저
        demo = 0
        for i in range(len(allItemArr)): #행 이름 = 모든 게시글 , 원소 = 평가치
            if (allItemArr[i][j] !=0) and allItemArr[i][j]>=threshold:
                for x in range(len(categoryArr)):
                    if postAcategoryAr[i][1] == categoryArr[x]:
                        weightArr[j][x]+=1
                        demo+=1
        for i in range(len(weightArr[0])):
            if weightArr[j][i] !=0:
                weightArr[j][i] = weightArr[j][i]/demo
    #print("weightArr: ",weightArr)
    return weightArr

def makeProfileList(editor_profile,item, post, editor, postAcategory):
    # (user_age, user_gender, user_id, category1, category2)
    editor_profileAr = editor_profileArr(editor_profile)
    weightArr = makeWeightList(item, post, editor, postAcategory)
    # 열 이름은 유저 프로필, 행 이름은 모든 유저
    # 즉 열은 editorArr을 따르고, 행은 postArr을 따른다
    # 카테고리는 총 15개 이므로 행 길이에 13을 더 해준다
    allProfileArr = [[0 for col in range(len(editor_profileAr[0])+13)] for row in range(len(editor_profileAr))]

    for i in range(len(editor_profileAr)):
        # (user_age, user_gender, user_id, category1, category2) ->
        # (user_id, user_gender, user_age, category1, category2)
        allProfileArr[i][0] = editor_profileAr[i][2]
        allProfileArr[i][1] = editor_profileAr[i][1]
        allProfileArr[i][2] = editor_profileAr[i][0]
        for z in range(2):
            if editor_profileAr[i][3+z] =="movie/animation":
                allProfileArr[i][3]=1
            if editor_profileAr[i][3 + z] == "car/traffic":
                allProfileArr[i][4]=1
            if editor_profileAr[i][3 + z] == "music":
                allProfileArr[i][5]=1
            if editor_profileAr[i][3 + z] == "animal":
                allProfileArr[i][6]=1
            if editor_profileAr[i][3 + z] == "sports":
                allProfileArr[i][7]=1
            if editor_profileAr[i][3 + z] == "travel/event":
                allProfileArr[i][8]=1
            if editor_profileAr[i][3 + z] == "game":
                allProfileArr[i][9]=1
            if editor_profileAr[i][3 + z] == "character/blog":
                allProfileArr[i][10]=1
            if editor_profileAr[i][3 + z] == "comedy":
                allProfileArr[i][11]=1
            if editor_profileAr[i][3 + z] == "entertainment":
                allProfileArr[i][12]=1
            if editor_profileAr[i][3 + z] == "news/politics":
                allProfileArr[i][13]=1
            if editor_profileAr[i][3 + z] == "knowhow/style":
                allProfileArr[i][14]=1
            if editor_profileAr[i][3 + z] == "education":
                allProfileArr[i][15]=1
            if editor_profileAr[i][3 + z] == "science_technology":
                allProfileArr[i][16]=1
            if editor_profileAr[i][3 + z] == "nonprofit/social_movement":
                allProfileArr[i][17]=1
    #가중치를 적용 안해서 다시 만듦 카테고리별 가중치를 고려해서 열 길이에 15를 더함
    allProfileArr2 = [[0 for col in range(len(editor_profileAr[0]) + 13+15)] for row in range(len(editor_profileAr))]
    size1 = (len(editor_profileAr[0])+13)
    for j in range(size1):
        for i in range(len(editor_profileAr)):
            allProfileArr2[i][j] = allProfileArr[i][j]
    size2 = 15
    #print("weightArr: ", len(weightArr),", ",len(weightArr[0]))
    #print("allProfileArr2: ",len(allProfileArr2),", ",len(allProfileArr2[0]),", ",len(allProfileArr2[0])-size1)
    for j in range(size2):
        for i in range(len(editor_profileAr)):
            allProfileArr2[i][j+size1] = weightArr[i][j]
    #print("allProfileArr2: ",allProfileArr2)
    input_profileArr = [[0 for col in range(len(editor_profileAr[0]) + 13+15-1)] for row in range(len(editor_profileAr))]
    for i in range(len(editor_profileAr)):
        for j in range(len(input_profileArr[0])):
            if j!=0:
                input_profileArr[i][j] = allProfileArr2[i][j+1] # 편집자 이름 열을 누락시키기 위해 +1
            else:
                if allProfileArr2[i][j+1] =="man":
                    input_profileArr[i][j] = 0
                else:
                    input_profileArr = 1
    for i in range(len(input_profileArr)):
        for j in range(len(input_profileArr[0])):
            input_profileArr[i][j] = pd.to_numeric(input_profileArr[i][j])
    #print("input_profileArr: ",input_profileArr)

    return allProfileArr2, input_profileArr

def scale(profile, item):
    scaler = StandardScaler()
    #scaler =  MinMaxScaler()
    scaled_profile = scaler.fit_transform(profile)
    scaled_item = scaler.fit_transform(item)
    scaledprofile = profile
    scaleditem = item
    #print("profile: ", profile)
    #print("scaled_profile: ",scaled_profile)
    # print("item: ", item)
    # print("sacled_item: ", scaled_item)
    return scaledprofile, scaleditem



#postAcategoryAr =postAcategoryArr(postAcategory)
#postAcategoryAr = postAcategoryArr(postAcategory)
#weightArr = makeWeightList(item, post, editor, postAcategory)


#print(input_ItemArr)
#print("editorAr: ",editorAr)
#print("postAr: ",postAr )

#print(len(editorAr))
#print(len(editorAr[0]))