import sys
import random
import pandas as pd
from sklearn.preprocessing import StandardScaler

import KNN
import predict
import elbow
import MAE
import evalCluster
import sim

threshold = 3

# item= "[{\"editor_post_id\":\"tlfkthsl95@gmail.com-6\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"3.5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-1\",\"satisfaction\":\"1\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"}]"
# #게시물 전체 테이블 (post_id, editor_id)
# post= "[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"editor_id\":\"editorposttest@gmail.com\"}]"
# #게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
# postAcategory="[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"category\":\"comedy\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"category\":\"music\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"category\":\"education\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"category\":\"education\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"category\":\"movie/animation\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"category\":\"animal\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"category\":\"game\",\"editor_id\":\"editorposttest@gmail.com\"}]"
# #편집자 정보 전체 테이블 (user_id)
# editor= "[{\"user_id\":\"tlfkthsl95@gmail.com\"},{\"user_id\":\"editorposttest@gmail.com\"},{\"user_id\":\"editorposttesttest@gmail.com\"},{\"user_id\":\"ha0293279@gmail.com\"}]"
# #편집자 프로필 전체 테이블(user_age, user_gender, user_id, category1, category2)
# editor_profile= "[{\"preffered_category\":[\"game\",\"comedy\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"tlfkthsl95@gmail.com\",\"category1\":\"game\",\"category2\":\"comedy\"},{\"preffered_category\":[\"movie/animation\",\"car/traffic\"],\"user_age\":\"27\",\"user_gender\":\"man\",\"user_id\":\"editorposttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"car/traffic\"},{\"preffered_category\":[\"movie/animation\",\"movie/animation\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"editorposttesttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"movie/animation\"},{\"preffered_category\":[\"sports\",\"character/blog\"],\"user_age\":\"24\",\"user_gender\":\"man\",\"user_id\":\"ha0293279@gmail.com\",\"category1\":\"sports\",\"category2\":\"character/blog\"}]"


# # #항목 평가 테이블(post_id, satistaction, user_id)
# # item = "[{\"editor_post_id\":\"tlfkthsl95@gmail.com-6\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-2\",\"satisfaction\":\"3.5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-1\",\"satisfaction\":\"1\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"}]"
# # #게시물 전체 테이블 (post_id, editor_id)
# # post = "[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"editor_id\":\"editorposttest@gmail.com\"}]"
# # #게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
# # postAcategory ="[{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"category\":\"comedy\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"category\":\"music\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"category\":\"education\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"category\":\"education\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"category\":\"movie/animation\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"category\":\"animal\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"category\":\"game\",\"editor_id\":\"editorposttest@gmail.com\"}]"
# # #편집자 정보 전체 테이블 (user_id)
# # editor = "[{\"user_id\":\"tlfkthsl95@gmail.com\"},{\"user_id\":\"editorposttest@gmail.com\"},{\"user_id\":\"editorposttesttest@gmail.com\"},{\"user_id\":\"ha0293279@gmail.com\"}]"
# # #편집자 프로필 전체 테이블(user_age, user_gender, user_id, category1, category2)
# # editor_profile = "[{\"preffered_category\":[\"game\",\"comedy\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"tlfkthsl95@gmail.com\",\"category1\":\"game\",\"category2\":\"comedy\"},{\"preffered_category\":[\"movie/animation\",\"car/traffic\"],\"user_age\":\"27\",\"user_gender\":\"man\",\"user_id\":\"editorposttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"car/traffic\"},{\"preffered_category\":[\"movie/animation\",\"movie/animation\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"editorposttesttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"movie/animation\"},{\"preffered_category\":[\"sports\",\"character/blog\"],\"user_age\":\"24\",\"user_gender\":\"man\",\"user_id\":\"ha0293279@gmail.com\",\"category1\":\"sports\",\"category2\":\"character/blog\"}]"
# #항목 평가 테이블(post_id, satistaction, user_id)
# item ="[{\"editor_post_id\":\"editortesttesttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"editortesttesttest@gmail.com-1\",\"satisfaction\":\"4\",\"user_id\":\"editortesttesttest5@gmail.com\"},{\"editor_post_id\":\"editortesttesttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"editortesttesttest@gmail.com-1\",\"satisfaction\":\"4.5\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"editortesttesttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"editortesttesttest@gmail.com-1\",\"satisfaction\":\"4.5\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"editortesttesttest@gmail.com-1\",\"satisfaction\":\"2.5\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"yeconnector1@gmail.com-2\",\"satisfaction\":\"4.5\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4.5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"2\",\"user_id\":\"editortesttesttest5@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"3.5\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"5\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"4\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":\"3.5\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-12\",\"satisfaction\":3,\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"4\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"4\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"5\",\"user_id\":\"editortesttesttest5@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"5\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"4\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-15\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"2\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"4\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"5\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-9\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"4.5\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-2\",\"satisfaction\":\"2.5\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"4\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"4\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-4\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"editortesttesttest5@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"5\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"5\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-13\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"4\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"4.5\",\"user_id\":\"editortesttesttest5@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"4\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"4\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-17\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"ha0293279@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"ha0293279@gmail.com-1\",\"satisfaction\":\"2\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"ha0293279@gmail.com-1\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"ha0293279@gmail.com-1\",\"satisfaction\":\"4.5\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"ha0293279@gmail.com-1\",\"satisfaction\":\"4.5\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"ha0293279@gmail.com-1\",\"satisfaction\":\"2\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"yeconnector2@gmail.com-1\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"yeconnector1@gmail.com-1\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"yeconnector1@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"4\",\"user_id\":\"editortesttesttest5@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-1\",\"satisfaction\":\"5\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-5\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-5\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-5\",\"satisfaction\":\"4.5\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"4\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"5\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"5\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"2\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-16\",\"satisfaction\":\"5\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"1.5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"2\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-14\",\"satisfaction\":\"5\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"4.5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"2.5\",\"user_id\":\"editortesttesttest@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"2\",\"user_id\":\"ha0293279@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"2\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"tlfkthsl95@gmail.com-11\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"5\",\"user_id\":\"editorposttesttest@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"2\",\"user_id\":\"editortesttesttest5@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"4.5\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"5\",\"user_id\":\"yeconnector2@gmail.com\"},{\"editor_post_id\":\"editorposttest@gmail.com-3\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"},{\"editor_post_id\":\"editorposttesttest@gmail.com-2\",\"satisfaction\":\"4.5\",\"user_id\":\"editorposttest@gmail.com\"},{\"editor_post_id\":\"editorposttesttest@gmail.com-2\",\"satisfaction\":\"3\",\"user_id\":\"kanghyeon000@gmail.com\"},{\"editor_post_id\":\"editorposttesttest@gmail.com-2\",\"satisfaction\":\"4\",\"user_id\":\"tlfkthsl95@gmail.com\"},{\"editor_post_id\":\"editorposttesttest@gmail.com-2\",\"satisfaction\":\"4\",\"user_id\":\"yeconnector1@gmail.com\"},{\"editor_post_id\":\"editorposttesttest@gmail.com-2\",\"satisfaction\":\"4\",\"user_id\":\"youtubytest@gmail.com\"}]"
# #게시물 전체 테이블 (post_id, editor_id)
# post ="[{\"post_id\":\"editortesttesttest@gmail.com-1\",\"editor_id\":\"editortesttesttest@gmail.com\"},{\"post_id\":\"yeconnector1@gmail.com-2\",\"editor_id\":\"yeconnector1@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"ha0293279@gmail.com-1\",\"editor_id\":\"ha0293279@gmail.com\"},{\"post_id\":\"yeconnector2@gmail.com-1\",\"editor_id\":\"yeconnector2@gmail.com\"},{\"post_id\":\"yeconnector1@gmail.com-1\",\"editor_id\":\"yeconnector1@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-5\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttesttest@gmail.com-2\",\"editor_id\":\"editorposttesttest@gmail.com\"}]"
# #게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
# postAcategory ="[{\"post_id\":\"editortesttesttest@gmail.com-1\",\"category\":\"comedy\",\"editor_id\":\"editortesttesttest@gmail.com\"},{\"post_id\":\"yeconnector1@gmail.com-2\",\"category\":\"sports\",\"editor_id\":\"yeconnector1@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-12\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-15\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-9\",\"category\":\"comedy\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-2\",\"category\":\"music\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-4\",\"category\":\"education\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-13\",\"category\":\"education\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-17\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"ha0293279@gmail.com-1\",\"category\":\"comedy\",\"editor_id\":\"ha0293279@gmail.com\"},{\"post_id\":\"yeconnector2@gmail.com-1\",\"category\":\"game\",\"editor_id\":\"yeconnector2@gmail.com\"},{\"post_id\":\"yeconnector1@gmail.com-1\",\"category\":\"sports\",\"editor_id\":\"yeconnector1@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-1\",\"category\":\"movie/animation\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-5\",\"category\":\"game\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-16\",\"category\":\"movie/animation\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-14\",\"category\":\"animal\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"tlfkthsl95@gmail.com-11\",\"category\":\"game\",\"editor_id\":\"tlfkthsl95@gmail.com\"},{\"post_id\":\"editorposttest@gmail.com-3\",\"category\":\"game\",\"editor_id\":\"editorposttest@gmail.com\"},{\"post_id\":\"editorposttesttest@gmail.com-2\",\"category\":\"game\",\"editor_id\":\"editorposttesttest@gmail.com\"}]"
# #편집자 정보 전체 테이블 (user_id)
# editor ="[{\"user_id\":\"tlfkthsl95@gmail.com\"},{\"user_id\":\"editorposttest@gmail.com\"},{\"user_id\":\"editorposttesttest@gmail.com\"},{\"user_id\":\"editortesttesttest5@gmail.com\"},{\"user_id\":\"yeconnector1@gmail.com\"},{\"user_id\":\"yeconnector2@gmail.com\"},{\"user_id\":\"ha0293279@gmail.com\"},{\"user_id\":\"editortesttesttest@gmail.com\"}]"
# #편집자 프로필 전체 테이블(user_age, user_gender, user_id, category1, category2)
# editor_profile ="[{\"preffered_category\":[\"game\",\"comedy\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"tlfkthsl95@gmail.com\",\"category1\":\"game\",\"category2\":\"comedy\"},{\"preffered_category\":[\"movie/animation\",\"car/traffic\"],\"user_age\":\"27\",\"user_gender\":\"man\",\"user_id\":\"editorposttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"car/traffic\"},{\"preffered_category\":[\"movie/animation\",\"movie/animation\"],\"user_age\":\"25\",\"user_gender\":\"man\",\"user_id\":\"editorposttesttest@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"movie/animation\"},{\"preffered_category\":[\"music\",\"game\"],\"user_age\":\"27\",\"user_gender\":\"man\",\"user_id\":\"editortesttesttest5@gmail.com\",\"category1\":\"music\",\"category2\":\"game\"},{\"preffered_category\":[\"game\",\"comedy\"],\"user_age\":\"24\",\"user_gender\":\"woman\",\"user_id\":\"yeconnector1@gmail.com\",\"category1\":\"game\",\"category2\":\"comedy\"},{\"preffered_category\":[\"movie/animation\",\"animal\"],\"user_age\":\"23\",\"user_gender\":\"woman\",\"user_id\":\"yeconnector2@gmail.com\",\"category1\":\"movie/animation\",\"category2\":\"animal\"},{\"preffered_category\":[\"sports\",\"character/blog\"],\"user_age\":\"24\",\"user_gender\":\"man\",\"user_id\":\"ha0293279@gmail.com\",\"category1\":\"sports\",\"category2\":\"character/blog\"},{\"preffered_category\":[\"game\",\"music\"],\"user_age\":\"26\",\"user_gender\":\"man\",\"user_id\":\"editortesttesttest@gmail.com\",\"category1\":\"game\",\"category2\":\"music\"}]"

#항목 평가 테이블(post_id, satistaction, user_id)
item=sys.argv[1]
#게시물 전체 테이블 (post_id, editor_id)
post=sys.argv[3]
#게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
postAcategory=sys.argv[2]
#편집자 정보 전체 테이블 (user_id)
editor=sys.argv[4]
#편집자 프로필 전체 테이블(preffedcategory, user_age, user_gender, user_id, category1, category2)
editor_profile=sys.argv[5]



def editor_profileArr(editor_profile):
    editorProfile = editor_profile.replace("\"", "")
    editorProfile = editorProfile.replace("{", "")
    editorProfile = editorProfile.replace("}", "")
    editorProfile = editorProfile.replace("[", "")
    editorProfile = editorProfile.replace("]", "")
    editorProfile = editorProfile.split(sep=",")

    for i in range(len(editorProfile)):
        editorProfile[i] = editorProfile[i].split(sep=":")
    #print(editor_profile)
    tmp = [[0 for col in range(2)] for row in range((len(editorProfile)-(int(len(editorProfile)/7)*2)))]
    for i in range(len(editorProfile)): #선호카테고리 배열 버림
        if i%7 !=0 and i%7 !=1:
            #print("i-~~: ",i - (int(i / 7) * 2),"   i :",i)
            tmp[i-int(i/7+1)*2][0] = editorProfile[i][0]
            tmp[i-int(i/7+1)*2][1] = editorProfile[i][1]
    editorProfile = tmp    #(user_age, user_gender, user_id, category1, category2)
    #print(editor_profile)
    c = 5
    r = int(len(editorProfile) / 5)

    editor_profileArr = [[0 for col in range(c)] for row in range(r)]

    for i in range(len(editor_profileArr)):
        a = i * 5 + 0
        b = i * 5 + 1
        c = i * 5 + 2
        d = i * 5 + 3
        e = i * 5 + 4
        if editorProfile[a][0] == ("user_age"):
            editor_profileArr[i][0] = editorProfile[a][1]
        if editorProfile[b][0] == ("user_gender"):
            editor_profileArr[i][1] = editorProfile[b][1]
        if editorProfile[c][0] == ("user_id"):
            editor_profileArr[i][2] = editorProfile[c][1]
        if editorProfile[d][0] == ("category1"):
            editor_profileArr[i][3] = editorProfile[d][1]
        if editorProfile[e][0] == ("category2"):
            editor_profileArr[i][4] = editorProfile[e][1]

    #print("editor_profileArr: ",editor_profileArr)
    return editor_profileArr

def editorArr(editor):
    editorrr = editor.replace("\"", "")
    editorrr = editorrr.replace("{", "")
    editorrr = editorrr.replace("}", "")
    editorrr = editorrr.replace("[", "")
    editorrr = editorrr.replace("]", "")

    editorrr = editorrr.split(sep=",")
    for i in range(len(editorrr)):
        editorrr[i] = editorrr[i].split(sep=":")
    c = 1
    r = int(len(editorrr)/1)

    editorAr = [[0 for col in range(c)] for row in range(r)]

    for i in range(len(editorAr)):
        a=i*1+0
        if editorrr[a][0]==("user_id"):
            editorAr[i][0] = editorrr[a][1]

    #print("editorArr: ",editorAr)
    return editorAr

def postArr(post):
    postrr = post.replace("\"", "")
    postrr = postrr.replace("{", "")
    postrr = postrr.replace("}", "")
    postrr = postrr.replace("[", "")
    postrr = postrr.replace("]", "")

    postrr = postrr.split(sep=",")
    for i in range(len(postrr)):
        postrr[i] = postrr[i].split(sep=":")
    c = 2
    r = int(len(postrr)/2)
    postAr = [[0 for col in range(c)] for row in range(r)]
    for i in range(len(postAr)):
        a=i*2+0
        b=i*2+1
        if postrr[a][0]==("post_id"):
            postAr[i][0] = postrr[a][1]
        if postrr[b][0] ==("editor_id"):
            postAr[i][1] = postrr[b][1]

    #print("postArr: ",postAr)
    return postAr

def postAcategoryArr(postAcategory):
    postAcategoryrr = postAcategory.replace("\"", "")
    postAcategoryrr = postAcategoryrr.replace("{", "")
    postAcategoryrr = postAcategoryrr.replace("}", "")
    postAcategoryrr = postAcategoryrr.replace("[", "")
    postAcategoryrr = postAcategoryrr.replace("]", "")
    postAcategoryrr = postAcategoryrr.split(sep=",")

    for i in range(len(postAcategoryrr)):
        postAcategoryrr[i] = postAcategoryrr[i].split(sep=":")

    c = 3
    r = int(len(postAcategoryrr)/3)
    #print(postAcategory)
    postAcategoryAr = [[0 for col in range(c)] for row in range(r)]
    # 게시물 전체 + 카테고리 테이블 (post_id, category, editor_id)
    for i in range(len(postAcategoryAr)):
        a=i*3+0
        b=i*3+1
        c=i*3+2
        if postAcategoryrr[a][0]==("post_id"):
            postAcategoryAr[i][0] = postAcategoryrr[a][1]
        if postAcategoryrr[b][0] ==("category"):
            postAcategoryAr[i][1] = postAcategoryrr[b][1]
        if postAcategoryrr[c][0] ==("editor_id"):
            postAcategoryAr[i][2] = postAcategoryrr[c][1]

    #print("postAcategoryArr: ",postAcategoryAr)
    return postAcategoryAr

def evalItemArr(item):
    itemrr = item.replace("\"","")
    itemrr = itemrr.replace("{","")
    itemrr = itemrr.replace("}","")
    itemrr = itemrr.replace("[","")
    itemrr = itemrr.replace("]","")
    itemrr = itemrr.split(sep=",")

    for i in range(len(itemrr)):
        itemrr[i] = itemrr[i].split(sep=":")


    c = 3
    r = int(len(itemrr)/3)

    itemArr = [[0 for col in range(c)] for row in range(r)]

    for i in range(len(itemArr)):
        a=i*3+0
        b=i*3+1
        c=i*3+2
        if itemrr[a][0]==("editor_post_id"):
            itemArr[i][0] = itemrr[a][1]
        if itemrr[b][0] ==("satisfaction"):
            itemArr[i][1] = itemrr[b][1]
        if itemrr[c][0] == ("user_id"):
            itemArr[i][2] = itemrr[c][1]

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

    # print("allItemArr.len: ", len(allItemArr))
    # print("allItemArr[0].len: ",len(allItemArr[0]))
    # print(len(postAcategoryAr))
    # print(len(postAcategoryAr[0]))
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
    input_profileArr = [[0 for col in range(len(editor_profileAr[0])+27)] for row in range(len(editor_profileAr))]
    for i in range(len(input_profileArr)):
        for j in range(len(editor_profileAr)):
            input_profileArr[i][j] = allProfileArr2[i][j+1]

    for i in range(len(input_profileArr)):
            if input_profileArr[i][0] =="man":
                input_profileArr[i][0] =0
            else:
                input_profileArr[i][0] =1
    #print("input_profileArr: ",input_profileArr)
    # for i in range(len(editor_profileAr)):
    #     for j in range(len(input_profileArr[0])):
    #         if j!=0:
    #             input_profileArr[i][j] = allProfileArr2[i][j+1] # 편집자 이름 열을 누락시키기 위해 +1
    #         else:
    #             if allProfileArr2[i][j+1] =="man":
    #                 input_profileArr[i][j] = 0
    #             else:
    #                 input_profileArr = 1
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

def P_make_predict(itemArr, profileArr,evalArr):
    #itemArr
    #profileArr
    #print("itemArr :",itemArr)
    #print("profileArr :", profileArr)
    #evalArr = evalCluster.evaluateList
    eval_mean = KNN.K_user_mean(itemArr, profileArr)
    newUserIndex = KNN.K_check_newUser(itemArr)
    comb_sim = sim.combSim(itemArr, evalArr)
    eval_totalMean = KNN.K_user_totalMean(itemArr, profileArr)
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
                neighbor, Kn = KNN.K_existUser_KNN(itemArr, profileArr, k)
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

def display(itemArr, profileArr):
    LSP = profileArr
    LSI = itemArr
    test_LSI = [[0 for col in range(len(LSI[0]))] for row in range(len(LSI))]
    for i in range(len(test_LSI)):
        for j in range(len(test_LSI[0])):
            test_LSI[i][j] = LSI[i][j]
    real_LSI = [[0 for col in range(len(LSI[0]))] for row in range(len(LSI))]
    for i in range(len(real_LSI)):
        for j in range(len(real_LSI[0])):
            real_LSI[i][j] = LSI[i][j]


    m=[]
    n=[]
    rand=0
    randMax = len(test_LSI) - 1 #랜덤 최대값
    cnt = 0
    totalCnt = 0
    i=0
    iter = len(test_LSI[0])
    iter = 3
    check_new = 1
    #print(len(test_LSI[0]))
    while(1):
        if i >= iter:
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
    mae=0
    sum=0
    m = [3, 2]
    n = [5, 3]
    cnt = 2
    pred_Arr_first = P_make_predict(real_LSI, LSP, evaluateList)
    test_Arr_first = P_make_predict(test_LSI, LSP, evaluateList)
    #print(pred_Arr_first)
    #print(test_Arr_first)
    predArr, predSeq = P_ArrSeq(pred_Arr_first, real_LSI)
    test_predArr, test_predSeq = predict.P_ArrSeq(test_Arr_first, test_LSI)
    for i in range(cnt):
        #print("i: ",i,"  m[i],n[j]",)
        sum += abs(test_Arr_first[m[i]][n[i]]-real_LSI[m[i]][n[i]])
    mae=sum/cnt

    print("MAE= ",mae)
    #print("n= ",cnt)


editor_profileAr = editor_profileArr(editor_profile)
itemAr = evalItemArr(item)
postAr = postArr(post)
editorAr = editorArr(editor)
postAcategoryAr = postAcategoryArr(postAcategory)

APA, IPA = makeProfileList(editor_profile, item, post, editor, postAcategory)
IIA = makeItemList(item, post, editor)
profileArr, itemArr = scale(IPA, IIA)



k=2
evaluateList = evalCluster.eval(profileArr,k)

newUserIndex, neighbor, mean = KNN.K_newUser_KNN(itemArr, profileArr)
mean = KNN.K_user_mean(itemArr, profileArr)
neighbor2, kn = KNN.K_existUser_KNN(itemArr, profileArr,0)


LSP = profileArr
LSI = itemArr


pred_Arr_first = P_make_predict(LSI, profileArr, evaluateList)
predArr, predSeq = P_ArrSeq(pred_Arr_first, LSI)

editorAr = editorArr(editor)
postAr = postArr(post)

#out_pred는 0열 유저id, 나머지 열은 추천순으로 정렬 된 게시물id
out_pred = P_bind_id(predSeq,editorAr,postAr)
#print("out_pred: ",out_pred)




#주의 최소 제곱합을 구하는 함수로 k값을 봤으면 다시 주석처리해야함 --그래프 출력 됨
feature = profileArr
#elbow.elbow(feature)



#MAE 출력할 때 활성화
#print("n= ",MAE.totalCnt)
#print("mae =",MAE.mae)
#display(itemArr, profileArr)

print(out_pred)