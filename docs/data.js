/* Editorial seed data. Coordinates locate approximate hot spring AREA centres, not hotels. */
window.YU_DATA=(()=>{
 const l=(zh,en,ja,ko)=>({'zh-TW':zh,en,ja,ko});
 const source='https://taiwanhotspring.net/SpringArea-Intro.aspx?a=50&l=1';
 const rows=[
 ['beitou','north',25.137,121.509,l('新北投','Xinbeitou','新北投','신베이터우'),l('台北','Taipei','台北','타이베이')],
 ['shamao','north',25.153,121.535,l('紗帽山','Shamaoshan','紗帽山','사마오산'),l('台北','Taipei','台北','타이베이')],
 ['yangming','north',25.156,121.548,l('陽明山','Yangmingshan','陽明山','양밍산'),l('台北','Taipei','台北','타이베이')],
 ['wulai','north',24.864,121.550,l('烏來','Wulai','烏来','우라이'),l('新北','New Taipei','新北','신베이')],
 ['jinshan','north',25.220,121.641,l('金山萬里','Jinshan & Wanli','金山・万里','진산·완리'),l('新北','New Taipei','新北','신베이')],
 ['jiaoxi','north',24.829,121.773,l('礁溪','Jiaoxi','礁溪','자오시'),l('宜蘭','Yilan','宜蘭','이란')],
 ['jianshi','north',24.706,121.201,l('內灣尖石','Neiwan & Jianshi','内湾・尖石','네이완·젠스'),l('新竹','Hsinchu','新竹','신주')],
 ['taian','central',24.468,120.977,l('泰安','Tai’an','泰安','타이안'),l('苗栗','Miaoli','苗栗','먀오리')],
 ['guguan','central',24.203,121.008,l('谷關','Guguan','谷関','구관'),l('台中','Taichung','台中','타이중')],
 ['dakeng','central',24.173,120.748,l('大坑','Dakeng','大坑','다컹'),l('台中','Taichung','台中','타이중')],
 ['wuri','central',24.083,120.603,l('烏日','Wuri','烏日','우르'),l('台中','Taichung','台中','타이중')],
 ['beigang','central',24.047,120.953,l('北港溪','Beigang River','北港渓','베이강시'),l('南投','Nantou','南投','난터우')],
 ['dongpu','central',23.561,120.925,l('東埔','Dongpu','東埔','둥푸'),l('南投','Nantou','南投','난터우')],
 ['guanziling','south',23.337,120.504,l('關子嶺','Guanziling','関子嶺','관쯔링'),l('台南','Tainan','台南','타이난')],
 ['baolai','south',23.109,120.702,l('寶來不老','Baolai & Bulao','宝来・不老','바오라이·부라오'),l('高雄','Kaohsiung','高雄','가오슝')],
 ['sichongxi','south',22.096,120.744,l('四重溪','Sichongxi','四重溪','쓰충시'),l('屏東','Pingtung','屏東','핑둥')],
 ['antong','east',23.267,121.346,l('安通','Antong','安通','안퉁'),l('花蓮','Hualien','花蓮','화롄')],
 ['ruisui','east',23.482,121.345,l('瑞穗','Ruisui','瑞穂','루이수이'),l('花蓮','Hualien','花蓮','화롄')],
 ['zhiben','east',22.694,121.018,l('知本','Zhiben','知本','즈번'),l('台東','Taitung','台東','타이둥')]
 ];
 const areas=rows.map(([id,region,lat,lng,name,city])=>({id,region,lat,lng,name,city,source}));
 const hotels=[
 {id:'gaia',area:'beitou',name:l('大地酒店','The Gaia Hotel','ザ・ガイア・ホテル','더 가이아 호텔'),types:['bath','stay'],art:'forest',tag:'bath',desc:l('白磺泉大眾風呂，留一段時間給自己。','White-sulfur baths for an unhurried escape.','白硫黄泉の大浴場で、ゆっくり過ごす。','백황천 대중탕에서 느긋하게 쉬어 가세요.'),url:'https://www.thegaiahotel.com/facility-detail/public-hot-springs/',offer:{kind:'bath',min:1600,max:1800,detail:l('每人／單次 4 小時；平日 NT$1,600、假日 NT$1,800。4–9 月另有優惠，稅費請洽館方。','Per person / 4 hours. Weekdays NT$1,600; holidays NT$1,800. Apr–Sep offer; confirm taxes.','1名・4時間。平日 NT$1,600、休日 NT$1,800。4〜9月は特別料金。税等は施設へ確認。','1인·4시간. 평일 NT$1,600, 휴일 NT$1,800. 4~9월 별도 혜택. 세금은 시설에 확인.')},rule:l('男女分浴裸湯；限 12 歲以上。','Separate nude baths; ages 12+.','男女別の裸湯。12歳以上。','남녀 별도 나체탕. 만 12세 이상.')},
 {id:'royal-jiaoxi',area:'jiaoxi',name:l('礁溪老爺酒店','Hotel Royal Chiaohsi','ホテルロイヤル礁溪','호텔 로열 자오시'),types:['stay'],art:'mountain',tag:'stay',desc:l('把礁溪的一晚，留給山景與溫泉。','A mountain-side hot spring stay in Jiaoxi.','山の麓、礁溪で過ごす温泉の一夜。','산자락 자오시에서 보내는 온천의 하룻밤.'),url:'https://www.hotelroyal.com.tw/zh-tw/chiaohsi/'},
 {id:'hoshinoya',area:'guguan',name:l('虹夕諾雅 谷關','HOSHINOYA Guguan','星のやグーグァン','호시노야 구관'),types:['stay'],art:'mountain',tag:'stay',desc:l('谷關山谷裡，客房設有半露天溫泉浴池。','Valley retreat with semi-open-air baths in every room.','谷関の渓谷で、客室の半露天風呂を楽しむ。','구관 계곡에서 객실 반노천탕을 즐기세요.'),url:'https://hoshinoresorts.com/en/hotels/hoshinoyaguguan/',source:'https://hoshinoresorts.com/en/presscenter/04/2024/130141/'},
 {id:'volando',area:'wulai',name:l('馥蘭朵烏來','Volando Urai','ヴォランド・ウーライ','볼란도 우라이'),types:['stay'],art:'river',tag:'stay',desc:l('沿著烏來溪景，把旅行步調放慢。','Slow down beside Wulai’s riverside scenery.','烏来の川景色とともに、旅をゆっくり。','우라이 강 풍경 곁에서 여행의 속도를 늦춰 보세요.'),url:'https://www.volandospringpark.com/',transport:l('住宿旅客可預約新店捷運站接駁；座位有限。','Guests can reserve the Xindian MRT shuttle; limited seats.','宿泊者は新店MRT駅からの送迎を予約可。定員あり。','투숙객은 신뎬 MRT역 셔틀 예약 가능. 좌석 제한.')},
 {id:'papawaqa',area:'taian',name:l('泰安觀止','Onsen Papawaqa','泰安観止','온천 파파와카'),types:['bath','stay'],art:'forest',tag:'bath',desc:l('山林建築與露天湯池，走進泰安的綠意。','Forest architecture and outdoor baths in Tai’an.','泰安の緑に包まれた建築と露天風呂。','타이안 숲속 건축과 노천탕을 만나보세요.'),url:'https://www.papawaqa.com.tw/main/pages/mainfaq/mainfaq.html',rule:l('戶外大眾池兒童須家長陪同；裸湯另有年齡規則。','Children need adult supervision outdoors; nude-bath age rules apply.','屋外浴場は子どもに保護者同伴。裸湯は別途年齢条件あり。','야외탕 어린이는 보호자 동반. 나체탕은 별도 연령 규정.')},
 {id:'grandcosmos',area:'ruisui',name:l('瑞穗天合國際觀光酒店','Grand Cosmos Resort Ruisui','グランドコスモスリゾート瑞穂','그랜드 코스모스 리조트 루이수이'),types:['stay'],art:'golden',tag:'stay',desc:l('花東縱谷裡的莊園住宿與黃金湯。','An estate-style stay and golden springs in the East Rift Valley.','花東縦谷のリゾートで黄金の湯を。','화둥 종곡의 리조트와 황금빛 온천.'),url:'https://www.grandcosmos.com.tw/'},
 {id:'qingquan',area:'sichongxi',name:l('清泉日式溫泉館','Qingquan Hot Spring','清泉日式温泉館','칭취안 온천'),types:['bath','private','stay'],art:'tropical',tag:'bath',desc:l('四重溪露天風呂，感受南台灣的暖意。','Open-air bathing in warm southern Sichongxi.','南台湾・四重溪の露天風呂へ。','남부 쓰충시의 노천탕에서 따뜻함을 느껴보세요.'),url:'https://since100hotspring.com.tw/web/FamousHotspring',offer:{kind:'bath',min:300,max:350,detail:l('成人每人；週一至五 NT$300，週末及國定假日 NT$350。時限未載明，春節另計；稅費請確認。','Adult admission: Mon–Fri NT$300; weekends/holidays NT$350. Duration unspecified; Lunar New Year excluded. Confirm taxes.','大人1名。月〜金 NT$300、土日祝 NT$350。時間制限の記載なし。旧正月・税等は要確認。','성인 1인. 월~금 NT$300, 주말·공휴일 NT$350. 이용 시간 미기재. 설날 요금·세금 확인 필요.')},rule:l('露天風呂需泳衣、泳帽。','Swimsuit and swim cap required outdoors.','露天風呂は水着・水泳帽が必要。','노천탕은 수영복·수영모 필수.')},
 {id:'royal-zhiben',area:'zhiben',name:l('知本老爺酒店','Hotel Royal Chihpen','ホテルロイヤル知本','호텔 로열 즈번'),types:['stay'],art:'river',tag:'stay',desc:l('走進台東山林，安排一晚知本溫泉假期。','A forest-side hot spring stay in Taitung.','台東の山林で、知本の温泉休日を。','타이둥 숲 곁에서 즐기는 즈번 온천 여행.'),url:'https://www.hotelroyal.com.tw/zh-tw/chihpen/'},
 {id:'longnice',area:'beitou',name:l('瀧乃湯','Longnice Hot Spring','瀧乃湯','룽나이탕'),types:['bath','private'],art:'forest',tag:'bath',desc:l('從新北投出發，認識老浴場的泡湯日常。','Discover a historic bathhouse in Xinbeitou.','新北投の歴史ある湯処を訪ねる。','신베이터우의 오래된 온천 목욕탕을 만나보세요.'),url:'https://www.longnice.com.tw/'},
 {id:'myspa',area:'guanziling',name:l('景大渡假莊園','King’s Garden Villa','景大リゾート','킹스 가든 빌라'),types:['stay'],art:'golden',tag:'stay',desc:l('在關子嶺停留，探訪泥漿溫泉小鎮。','Stay in Guanziling’s mud-spring town.','泥湯の町、関子嶺に泊まる。','머드 온천 마을 관쯔링에 머물러 보세요.'),url:'https://www.myspa.com.tw/'},
 {id:'reikei',area:'guanziling',name:l('儷景溫泉會館','Reikei Hot Spring Resort','儷景温泉会館','레이케이 온천 리조트'),types:['stay'],art:'golden',tag:'stay',desc:l('關子嶺山景與泥漿溫泉的住宿選擇。','Mountain scenery and a mud-spring stay in Guanziling.','関子嶺の山景色と泥湯の宿。','관쯔링 산 풍경과 머드 온천 숙소.'),url:'https://www.reikei.com.tw/'},
 {id:'sweetme',area:'beitou',name:l('北投水美溫泉會館','SweetMe Hot Spring Resort','水美温泉会館','스위트미 온천 리조트'),types:['private','bath','stay'],art:'river',tag:'private',desc:l('把一場泡湯，接上一餐北投滋味。','Pair a Beitou soak with a leisurely meal.','北投で、湯浴みと食事を一緒に。','베이터우 온천과 여유로운 식사를 함께.'),url:'https://www.sweetme.com.tw/tw/promotions/hot-spring-indulgence-package.html',offer:{kind:'package',min:2400,max:3000,detail:l('雙人湯屋＋兩份套餐；90 分鐘。淡季 NT$2,400；旺季平日 NT$2,600、假日 NT$3,000。12/31及春節除外；稅費請確認。','Private bath + 2 meals / 90 min. Low season NT$2,400; peak weekdays NT$2,600, holidays NT$3,000. Dec 31 / Lunar New Year excluded; confirm taxes.','貸切風呂90分＋2名分の食事。閑散期 NT$2,400、繁忙期平日 NT$2,600・休日 NT$3,000。12/31・旧正月除外。税等は要確認。','개인탕 90분+2인 식사. 비수기 NT$2,400, 성수기 평일 NT$2,600·휴일 NT$3,000. 12/31·설날 제외. 세금 확인 필요.')},rule:l('湯屋現場候位；餐點與泡湯須同日使用。','Private baths are walk-in; bath and meals must be used the same day.','貸切風呂は現地で順番待ち。食事と入浴は同日利用。','개인탕은 현장 대기. 식사와 온천은 당일 이용.')}
 ];
 return {areas,hotels,checked:'2026-11-22',areaSource:source,l};
})();
