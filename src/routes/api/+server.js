import OpenAIApi from 'openai'
import dotenv from 'dotenv'

dotenv.config()

export const config = {
	runtime: 'nodejs18.x'
};

const messages = [
  {
    "role": "system",
    "content": "당신은 요리법을 제공하는 요리사입니다. \n\n사용자가 제공한 재료 목록과 식사 유형, 매운 음식 여부를 토대로 개인화된 요리와 그 재료 레시피를 제시합니다. 제외 음식은 빼고 추천합니다.\n\n- 레시피 섹션을 마지막으로 요약을 덧붙이지 마세요."
  },
  {
    "role": "user",
    "content": "재료: 고추기름, 전분, 양파, 레몬, 닭다리살 정육, 간장, 숙주, 마늘, 건고추, 고춧가루, 새우, 홍합, 식용유, 사과, 설탕, 청양고추, 다시마, 대파, 생강, 식용유, 홍고추, 청주, 달걀, 매실청, 소금, 후추, 맛술\n식사 유형: 안주\n매운 음식: O\n제외 음식: 깐풍기"
  },
  {
    "role": "assistant",
    "content": "# 매콤 홍합볶음\n숙주와 함께 홍합을 매콤하게 볶아내면 그 자체로 훌륭한 안주가 되는데요. 아삭아삭한 숙주와 쫄깃쫄깃한 홍합의 식감이 조화롭게 어우진답니다. 밥 반찬으로도 아주 좋아요!\n\n## 재료\n### 기본 재료\n- 홍합: 1kg\n- 식용유: 1큰술\n- 숙주: 한 줌(100g)\n- 대파: 1/2대\n- 양파: 1/2개\n- 통마늘: 5알\n- 청양고추: 2개\n- 홍고추: 1개\n\n### 양념 재료\n- 식용유: 3큰술\n- 고춧가루: 2큰술\n- 맛술: 2큰술\n- 간장: 1큰술\n- 설탕: 1큰술\n- 후춧가루: 약간\n\n## 레시피\n### Step 1\n홍합은 깨끗이 씻어 손질해 주세요.\n\n### Step 2\n대파와 고추는 송송썰고 양파는 굵게 채썰고 마늘은 편썰어 주세요.\n\n### Step 3\n팬에 식용유를 두르고 대파와 마늘을 넣고 5단에서 2분간 볶아주세요.\n\n### Step 4\n홍합과 양념 재료를 넣고 9단에서 3분 30초간 볶아주세요.\n\n### Step 5\n숙주를 넣고 9단에서 1분간 볶아주세요.\n\n### Step 6\n완성된 홍합볶음에 송송 썬 쪽파를 뿌려 맛있게 즐겨주세요.\n\n이 매콤한 홍합볶음은 간단하면서도 풍부한 맛을 자랑합니다. 숙주의 아삭함과 홍합의 쫄깃함이 매콤한 양념과 잘 어우러져, 밥 반찬은 물론 술안주로도 훌륭합니다."
  },
  {
    "role": "user",
    "content": "재료: 숙주, 고추기름, 레몬, 사과, 대파, 홍합, 홍고추, 생강, 청양고추, 식용유, 다시마, 달걀, 후추, 설탕, 매실청, 맛술, 고춧가루, 소금, 식용유, 건고추, 청주, 간장, 양파, 마늘, 전분, 닭다리살 정육, 새우\n식사 유형: 안주\n매운 음식: O\n제외 음식: "
  },
  {
    "role": "assistant",
    "content": "# 깐풍기\n부드러운 닭다리살을 노릇하게 튀겨낸 뒤 매콤달콤한 소스를 입힌 깐풍기! 겉은 바삭하면서도 쫀득하고, 속은 폭신하면서도 부드러운 식감이 특징입니다. 황금 비율의 소스에 볶아낸 깐풍기는 술안주로도 아주 좋습니다.\n\n## 재료\n### 기본 재료\n- 닭다리살 정육: 350g\n- 식용유: 4컵\n- 고추기름: 2큰술\n- 대파 흰 부분: 1대\n- 마늘: 5알\n- 홍고추: 2개\n- 청양고추: 3개\n- 양파: 1/2개\n\n### 밑간 재료\n- 청주: 2큰술\n- 소금: 1작은술\n- 후춧가루: 약간\n\n### 반죽 재료\n- 전분: 70g\n- 물: 40g\n- 달걀 흰자: 1개 분량\n\n### 소스 재료\n- 간장: 1큰술\n- 맛술: 3큰술\n- 물: 2큰술\n- 식초: 2큰술\n- 설탕: 1큰술\n- 올리고당: 1큰술\n- 굴소스: 1큰술\n- 생강가루: 2꼬집\n\n## 레시피\n### Step 1\n닭다리살은 한입 크기로 썰어 청주, 소금, 후춧가루를 뿌려 10분간 재워주세요.\n\n### Step 2\n대파와 마늘, 양파는 굵게 다지고 홍고추, 청고추는 씨를 빼고 송송 썰어주세요. 볼에 소스 재료를 넣고 섞어주세요.\n\n### Step 3\n재워둔 닭다리살의 물기를 키친타월로 닦아 볼에 담고 반죽재료를 넣어 섞어주세요.\n\n### Step 4\n냄비에 식용유를 넣고 9단에서 5분 30초 가열해 주세요.\n\n### Step 5\n5단으로 줄인 후 튀김옷을 입힌 닭고기를 넣어 5분간 튀겨주세요. 튀겨낸 닭고기는 채반에서 기름을 빼고 한 김 식혀주세요.\n\n### Step 6\n팬에 고추기름을 두르고 5단에서 대파와 마늘을 넣고 2분간 볶아주세요.\n\n### Step 7\n양파와 고추를 넣고 5단에서 1분간 볶아주세요.\n\n### Step 8\n소스를 붓고 7단에서 1분간 끓여주세요.\n\n### Step 9\n튀겨둔 닭다리살을 넣고 7단에서 1분간 볶아주세요.\n\n### Step 10\n완성된 깐풍기를 접시에 담아 통깨를 뿌려 맛있게 즐겨주세요."
  },
  {
    "role": "user",
    "content": "재료: 매실청, 대파, 레몬, 후추, 홍고추, 식용유, 고춧가루, 전분, 숙주, 홍합, 식용유, 사과, 새우, 양파, 닭다리살 정육, 마늘, 고추기름, 청양고추, 건고추, 청주, 소금, 다시마, 간장, 맛술, 달걀, 생강, 설탕\n식사 유형: 밑반찬\n매운 음식: X\n제외 음식: 매콤 홍합볶음, 깐풍기"
  },
  {
    "role": "assistant",
    "content": "# 새우장\n바다내음이 물씬 풍기는 간장대하장 한 입 어떠세요? 간장대하장은 대하를 신선하게 즐길 수 있는 요리예요. 껍질까지 통째로 즐기는 대하에는 키토산과 타우린, 필수 아미노산 등 영양이 풍부하답니다.\n\n## 재료\n### 기본재료\n- 새우: 36마리(1kg)\n- 청주: 1컵\n- 청양고추: 1개\n- 홍고추: 1개\n- 레몬: 1/3개 (생략가능)\n\n### 다림간장\n- 간장: 2컵\n- 물: 2+1/2컵\n- 청주: 1/2컵\n- 맛술: 1/2컵\n- 매실청: 1/4컵\n- 설탕: 3큰술\n- 다시마(사방 5cm): 2장\n- 양파: 1/2개\n- 사과: 1/3개\n- 대파: 1대\n- 청양고추: 1개\n- 건고추: 2개\n- 통후추: 15알\n- 마늘: 8쪽\n- 생강: 1개(마늘 1쪽 사이즈)\n\n## 레시피\n### Step 1\n새우는 입부분의 뾰족한 부분과 긴 수염을 가위로 잘라서 손질하고 청주에 10분 정도 담가 두었다가 흐르는 물에 깨끗하게 씻은 후 물기를 제거해주세요.\n\n### Step 2\n청양고추와 홍고추는 송송 썰고, 레몬은 얇게 슬라이스해주세요. 다림 간장 재료의 사과와 양파, 대파, 청양고추는 큼직하게 썰어주세요.\n\n### Step 3\n냄비에 다림간장 재료를 모두 넣고 팔팔 끓으면 다시마를 건져내고 2분정도 끓인 후 차게 식혀주세요.\n\n### Step 4\n새우를 보관 용기에 담고 송송 썰은 고추와 레몬 슬라이스를 올려 준 후 식힌 다림 간장을 체에 걸러 부어주세요.\n\n### Step 5\n완성된 간장 새우장은 냉장고에서 2일간 숙성 후 간장만 따라내어 팔팔 끓여 차게 식힌 후 부어주고 3일간 냉장 보관하여 숙성시켜주세요.\n\n### Step 6\n새우장을 머리와 껍질을 벗기고 먹기 좋은 크기로 잘라 맛있게 즐겨주세요."
  },
  {
    "role": "user",
    "content": "재료: 무채, 청고추, 오징어, 마늘, 돼지고기, 양파, 깻잎, 생강, 양파, 참기름, 월계수, 붉은고추, 통깨, 팽이버섯, 맛술, 설탕, 고춧가루, 올리고당, 청주, 굴, 대파, 진간장, 쪽파, 맛술, 멸치액젓, 소금, 당근, 알배추, 굴소스, 고추장, 된장, 후추\n식사 유형: 저녁식사\n매운 음식: O\n제외 음식: "
  },
  {
    "role": "assistant",
    "content": "# 오삼불고기 덮밥\n스트레스로 피로가 쌓이는 하루! 타우린이 가득한 오징어와 단백질로 힘을 주는 돼지고기를 활용한 오삼불고기 덮밥을 식탁에 올려봅니다. 별 다른 반찬이 없어도 매콤한 양념이 어우러져 피로가 싹~ 풀리는 한끼를 만들어 줄 거예요.\n\n## 재료\n### 기본재료\n- 돼지고기(불고기용): 400g\n- 오징어: 1마리\n- 양파: 1/2개\n- 당근: 1/4개\n- 청고추: 1개\n- 붉은고추: 1개\n- 대파: 1/2대\n- 팽이버섯: 1/2봉\n- 깻잎: 5장\n\n### 양념재료\n- 고추장: 3큰술\n- 고춧가루: 2큰술\n- 진간장: 2큰술\n- 설탕: 1큰술\n- 올리고당: 2큰술\n- 굴소스: 1큰술\n- 맛술: 3큰술\n- 다진마늘: 1큰술\n- 참기름: 1큰술\n- 후춧가루: 약간\n\n## 레시피\n### Step 1\n오징어는 내장과 껍질을 제거하고 칼집을 넣어 한입크기로 자른 후 양념장 1/2에 재워주세요.\n\n### Step 2\n돼지고기는 먹기 좋은 크기로 자른 후 나머지 양념장 1/2에 재워주세요.\n\n### Step 3\n양파와 당근은 굵게 채를 썰고 청고추와 붉은고추, 대파는 어슷하게 썰어주세요. 팽이버섯은 밑둥을 제거하고 2등분하고 깻잎은 채를 썰어주세요.\n\n### Step 4\n팬에 기름을 두르고 당근과 양파, 돼지고기를 넣고 볶아주세요. 돼지고기가 익으면 오징어와 대파, 청고추, 붉은고추를 넣고 오징어가 익을 때까지 볶아주세요.\n\n### Step 5\n불을 끄고 깻잎과 팽이버섯, 참기름, 통깨를 넣어주세요.\n\n### Step 6\n완성된 요리를 그릇에 담아 마무리해주세요."
  },
  {
    "role": "user",
    "content": "재료: 당근, 고추장, 소금, 양파, 참기름, 월계수, 된장, 청고추, 양파, 후추, 붉은고추, 마늘, 대파, 알배추, 멸치액젓, 맛술, 고춧가루, 진간장, 설탕, 생강, 굴소스, 오징어, 무채, 쪽파, 깻잎, 올리고당, 통깨, 팽이버섯, 맛술, 청주, 굴, 돼지고기\n식사 유형: 저녁식사\n매운 음식: X\n제외 음식: 오삼불고기 덮밥"
  },
  {
    "role": "assistant",
    "content": "# 굴보쌈\n야들야들한 돼지고기 수육과 굴보쌈을 먹는 재미에 김장철이 기다려지기도 하지요. 바다의 맛을 담은 제철 굴과 부드럽게 잘 익은 돼지고기가 어우러지면 다른 어떤 요리로도 대체 불가능한 특별한 맛이 있으니까요.\n\n## 재료\n### 기본재료\n- 돼지고기 통삼겹살: 1근\n- 굴: 150g\n- 무채: 세 줌\n- 고춧가루: 2큰술\n- 쪽파: 3대\n- 알배추: 약간\n- 굵은 소금, 통깨: 약간\n\n### 고기 삶는 물\n- 물: 8컵\n- 청주: 1/4컵\n- 된장: 1큰술\n- 대파: 2대\n- 양파: 1/2개\n- 월계수: 3장\n- 마늘: 5쪽\n- 생강: 1/3쪽\n- 굵은 소금: 1/2큰술\n- 통후추: 약간\n\n### 굴무침 양념\n- 고춧가루: 1큰술\n- 멸치액젓: 1큰술\n- 맛술: 1큰술\n- 올리고당: 1큰술\n- 다진 마늘: 1큰술\n- 설탕: 1/2큰술\n\n## 레시피\n### Step 1\n돼지고기는 흐르는 물에 헹궈 준비해주세요. 냄비에 고기 삶는 물 재료를 넣고 끓어오르면 고기를 넣어 중간불에서 1시간 삶은 후 불을 끕니다. 뚜껑을 닫은 채로 20분간 뜸을 들여주세요.\n\n### Step 2\n굴은 옅은 소금물에 살살 헹군 후 체에 밭쳐 물기를 제거합니다. 무채는 굵은 소금에 10분간 절였다가 물기를 제거하고 고춧가루를 넣어 무쳐주세요.\n\n### Step 3\n쪽파는 4cm 길이로 썰고 알배추는 깨끗이 씻어 한 장씩 떼어냅니다. 알배추 대신 절인 배추속대를 활용해도 좋아요.\n\n### Step 4\n무채에 굴무침 양념 재료와 쪽파를 넣고 섞어주세요. 먹기 직전에 굴을 넣어 살살 버무리고 통깨를 뿌려주세요. 기호에 따라 액젓으로 간을 해도 좋아요.\n\n### Step 5\n[Tip.굴보쌈과 곁들이면 좋은 김장김치! 김장키트로 손쉽게 만들어요]\n1.김장키트 속 절임배추를 흐르는 물에 씻어 물기를 꽉 짜 주세요.\n2.절임배추의 겉잎부터 양념장을 묻혀 치대어 주세요. \n3.취향에 따라 무채, 쪽파 등을 추가해도 좋아요.\n\n### Step 6\n돼지고기를 건져 한입 크기로 도톰하게 썰고 통깨를 뿌려주세요. 굴무침, 알배추 잎을 곁들여 냅니다."
  },
  {
    "role": "user",
    "content": "재료: 올리고당, 소금, 통깨, 간장, 양파, 식용유, 우유, 튀김가루, 설탕, 단호박, 감자, 파슬리, 후추, 생크림, 맛술, 휘핑 생크림, 잔멸치, 버터, 호두, 다진 마늘, 참기름\n식사 유형: 아침식사\n매운 음식: X\n제외 음식: "
  },
  {
    "role": "assistant",
    "content": "# 단호박수프\n따뜻하고 부드러운 수프는 몸도 마음도 부드럽게 녹여주지요. 특히 단호박은 자체의 단맛이 풍부해 남노소 누구나 좋아하고 예쁜 주황빛이 식탁을 화사하게 만들어주는 효과도 있답니다. 담백한 감자와 양파를 더해주면 맛과 향이 한층 더 깊어지지요. 캐주얼한 홈파티는 물론 아침 식사로도 참 좋아요.\n\n## 재료\n### 기본재료\n- 단호박: 1통(작은 크기)\n- 감자: 1개\n- 양파: 1/4개\n- 버터: 2큰술\n- 물: 3컵\n- 우유: 1컵\n- 생크림: 1/2컵\n- 올리고당: 2큰술\n- 소금: 1작은술\n- 후추: 약간\n- 파슬리: 약간\n- 휘핑 생크림: 약간\n\n## 레시피\n### Step 1\n단호박, 감자는 껍질을 제거해 잘게 썰고 양파는 채를 썰어 준비해주세요.\n(단호박은 전자렌지에 3분정도 돌리거나, 김오른 찜통에 넣어 5분간 쪄낸 후 껍질을 제거하면 좀 더 쉽게 단호박 껍질을 벗길 수 있답니다.)\n\n### Step 2\n달군 냄비에 버터를 녹인 후 양파를 먼저 볶다가 투명해지면 단호박, 감자를 넣고 소금으로 간을 해 3분정도 볶아주세요.\n\n### Step 3\n물을 붓고 20분간 중간불로 끓인 후 한 김 식혀서 핸드믹서로 갈아주세요. 우유를 넣고 약한 불에서 5분간 잘 저어가며 끓여주세요.\n\n### Step 4\n생크림, 올리고당, 소금, 후추를 넣고 2~3분간 더 끓이면서 농도와 간을 조절합니다.\n\n### Step 5\n그릇에 담고 가볍게 휘핑한 생크림과 다진 파슬리를 뿌려주세요."
  },
  {
    "role": "user",
    "content": "재료: 참기름, 간장, 설탕, 후추, 맛술, 휘핑 생크림, 생크림, 파슬리, 단호박, 소금, 호두, 튀김가루, 식용유, 다진 마늘, 감자, 버터, 올리고당, 양파, 잔멸치, 통깨, 우유\n식사 유형: 밑반찬\n매운 음식: X\n제외 음식: "
  },
  {
    "role": "assistant",
    "content": "# 단호박 멸치볶음\n달콤한 단호박과 고소한 멸치를 함께 볶아 보세요. 달콤하면서도 짭조름한 매력이 입맛을 돋운답니다. 단호박을 더해 맛은 물론 영양까지 풍부해져요. 입맛 없을 때 꺼내 먹기 좋은 반찬이랍니다!\n\n## 재료\n### 기본 재료\n- 단호박: 1/8개(120g)\n- 잔멸치: 1컵(40g)\n- 호두: 한 줌(40g)\n- 올리고당: 2큰술\n- 물: 5큰술\n- 통깨: 약간\n- 참기름: 약간\n\n### 양념 재료\n- 식용유: 1큰술\n- 간장: 1큰술\n- 맛술: 1큰술\n- 다진 마늘: 1/2큰술\n- 설탕: 1/2큰술\n\n## 레시피\n### Step 1\n단호박은 깨끗이 씻어 사방 1cm 크기로 깍뚝 썰어주세요.\n\n### Step 2\n팬에 멸치와 호두를 넣고 5단에서 4분 30초간 볶아주세요. 볶은 멸치와 호두는 따로 덜어주세요.\n\n### Step 3\n팬에 단호박과 물을 넣고 뚜껑을 덮고 5단에서 5분간 익혀주세요.\n\n### Step 4\n익힌 단호박에 멸치와 호두, 양념 재료를 넣고 5단에서 2분간 볶아주세요.\n\n### Step 5\n불을 끄고 올리고당과 참기름을 넣고 가볍게 섞어 완성해주세요.\n\n### Step 6\n완성된 단호박 멸치볶음을 접시에 담아 맛있게 즐겨주세요."
  },
  {
    "role": "user",
    "content": "재료: 화이트 발사믹, 후춧가루, 건고추, 부라타 치즈, 청양고추, 고춧가루, 올리브오일, 마늘, 소금, 브라운 양송이버섯, 토마토, 그린 올리브, 홍고추, 고추기름, 타임\n식사 유형: 아침식사\n매운 음식: X\n제외 음식: "
  },
  {
    "role": "assistant",
    "content": "# 토마토 셔벗 샐러드\n얼린 토마토를 치즈 그레이터로 갈아 부라타 치즈 위에 올리고 화이트 발사믹과 올리브오일, 소금, 후춧가루만 살짝 더해 주면 근사한 샐러드가 완성돼요. 시원하고 상큼한 토마토와 고소하고 부드러운 부라타 치즈가 정말 잘 어울린답니다!\n\n## 재료\n### 기본 재료\n- 토마토: 1개\n- 부라타 치즈: 1개\n- 타임: 적당량\n- 화이트 발사믹: 2큰술\n- 올리브오일: 1큰술\n- 소금: 약간\n- 후춧가루: 약간\n\n## 레시피\n### Step 1\n토마토를 냉동실에 넣어 얼려주세요.\n(tip. 샐러드를 만들기 하루 전날 얼려 두면 시간을 절약할 수 있어요)\n\n### Step 2\n접시에 부라타 치즈를 넣은 후 얼린 토마토를 치즈 그레이터로 갈아주세요.\n\n### Step 3\n화이트 발사믹, 올리브오일, 소금, 후춧가루, 타임을 얹어 주세요.\n\n### Step 4\n치즈와 갈린 토마토를 곁들여 맛있게 즐겨주세요."
  },
  {
    "role": "user",
    "content": "재료: 브라운 양송이버섯, 올리브오일, 후춧가루, 소금, 고추기름, 고춧가루, 토마토, 마늘, 건고추, 부라타 치즈, 청양고추, 타임, 홍고추, 그린 올리브, 화이트 발사믹\n식사 유형: 안주\n매운 음식: X\n제외 음식: "
  },
  {
    "role": "assistant",
    "content": "# 브라운 양송이버섯 볶음\n와인 안주로 올리브를 선호하는 분들이 많죠. 하지만 매번 똑같이 먹다 보면 지겹잖아요. 그래서 와인과 아주 절묘하게 어울리는 안주 레시피 하나를 소개하려고 합니다. 바로 브라운 양송이버섯 볶음! 맛은 물론 향까지 좋아 와인을 더 맛있게 즐길 수 있도록 해 줄 거예요~!\n\n## 재료\n### 기본 재료\n- 브라운 양송이버섯: 8개\n- 그린 올리브: 10개\n- 올리브오일: 1/2컵\n- 다진 마늘: 1큰술\n- 소금: 두 꼬집\n- 후춧가루: 약간\n- 타임(생략 가능): 약간\n\n## 레시피\n### Step 1\n브라운 양송이버섯은 두툼하게 잘라주세요.\n\n### Step 2\n달군 팬에 올리브오일을 두른 후 다진 마늘을 볶아주세요.\n\n### Step 3\n브라운 양송이버섯을 넣어 볶다가 그린올리브, 소금과 후춧가루를 넣어주세요.\n\n### Step 4\n마지막에 타임을 넣어 완성해주세요.\n(tip. 타임이 없을 경우 허브가루를 넣거나 생략 가능해요)"
  },
  {
    "role": "user",
    "content": "재료: 간장, 통깨, 단호박, 맛술, 잔멸치, 올리고당, 튀김가루, 우유, 후추, 파슬리, 식용유, 휘핑 생크림, 양파, 설탕, 버터, 생크림, 감자, 다진 마늘, 호두, 참기름, 소금\n식사 유형: 안주\n매운 음식: X\n제외 음식: "
  },
  {
    "role": "assistant",
    "content": "# 웨지감자튀김\n감자를 굵게 썰어 바삭하게 튀겨낸 웨지감자는 스테디셀러 간식이자 안주로 꾸준한 사랑을 받고 있죠. 바삭하게 튀긴 웨지감자를 케찹이나 치즈소스에 콕 찍어 맥주 한 잔과 곁들이면 어느 호프집 부럽지 않은 홈술 한 상이 완성돼요.\n\n## 재료\n### 기본 재료\n- 킹감자: 2개(500g)\n- 파슬리가루: 약간\n\n### 가루 양념 재료\n- 튀김가루: 1/2컵\n- 소금: 약간\n- 후춧가루: 약간\n\n## 레시피\n### Step 1\n감자는 껍질째 깨끗이 씻은 후 웨지 모양으로 잘라주세요.\n\n### Step 2\n끓는 물에 감자를 넣어 8분 정도 삶아 체에 받쳐 물기를 빼주세요.\n\n### Step 3\n감자의 물기를 제거한 후 가루 양념 재료를 고루 묻혀주세요.\n\n### Step 4\n170도로 달군 기름에 튀겨 식힌 후 한 번 더 센 온도에서 바삭하게 튀겨주세요.\n\n### Step 5\n튀긴 감자에 기호에 따라 파슬리 가루를 뿌린 후 케찹이나 치즈소스 등을 곁들여 즐겨주세요."
  }
]

export async function POST({request}) {
  const {text} = await request.json()
  // const openai = new OpenAIApi({apiKey: process.env.OPENAI_API_KEY})
  console.log(process.env.OPENAI_API_KEY)

  try {
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [...messages, {role: 'user', content: text}],
    //   temperature: 0,
    //   max_tokens: 4095,
    //   top_p: 1,
    //   frequency_penalty: 0,
    //   presence_penalty: 0
    // })
    return new Response(JSON.stringify({output: process.env.OPENAI_API_KEY}), {status: 200, headers: {'Content-Type': 'application/json'}})
  } catch (error) {
    return new Response(JSON.stringify({error: 'OpenAI API 요청 실패'}), {status: 500, headers: {'Content-Type': 'application/json'}})
  }
}
