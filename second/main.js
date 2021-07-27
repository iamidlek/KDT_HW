// 상품 데이터
const data = [
    { name: '초콜렛', price: 2000 },
    { name: '아이스크림', price: 1000 },
    { name: '컵라면', price: 1600 },
    { name: '볼펜', price: 2500 },
    { name: '아메리카노', price: 4000 },
    { name: '과자', price: 3000 },
    { name: '탄산수', price: 1200 },
    { name: '떡볶이', price: 3500 },
    { name: '노트', price: 1500 },
    { name: '껌', price: 500 }
];

// 사용자 입력 받기
const line = prompt('최대 금액을 입력해주세요.');
const amount = +line;

// 주어진 금액으로 살 수 있는 가장 비싼 상품을 구함
const item = getItemByAmount(data, amount);

const msg = item ? 
    `${amount}원으로 살 수 있는 가장 비싼 상품은 [${item.name}]이고, 가격은 ${item.price}원입니다.` : 
    '살 수 있는 상품이 없습니다.';

// 결과 출력
alert(msg);

// 아래에 getItemByAmount 함수를 작성하세요.
function getItemByAmount(data, amount) {
    // 상품 데이터에 중복되는 동일한 가격을 가지는 상품은 없다고 전제한다.(출력 메세지를 반복하지 않기 때문)
    
    // 정규표현식 0-9가 아닌것을 전부 확인(글로벌 매치)
    const regex= /[^0-9]/g
    // 0-9 이외의 경우 true를 return
    if (regex.test(amount)){
        return null
    }
    // 구매할 수 있는 가장 비싼 상품을 비교하기 위한 배열
    let compair = [];
    // 차액이 가장 작은 값을 넣을 변수
    let max = -Infinity;
    // 상기의 조건에 부합하는 인덱스 번호를 저장
    let idx = 0;

    // amount와 상품 가격이 일치할 경우 가장 비싼 상품에 해당하므로 return
    for (let i = 0; i < data.length; i++) {
        let com = data[i].price - amount;
        if (com == 0) {
            return data[i];
        } else if (com < 0) { 
            // 일치하지 않는 경우 구매가능한 상품을 차액과 함께 비교하기 위한 배열에 넣는다
            compair.push({
                name: data[i].name,
                price: com
            });
        }
    }

    // 입력한 금액으로 구매 가능한 상품목록이 없는 경우
    if (compair.length === 0) {
        return null
    }
    // 상품을 훑으며 가장 차액이 적은 상품을 찾고 인덱스 번호를 구한다
    for (let k = 0; k < compair.length; k++) {
        if (max < compair[k].price) {
            max = compair[k].price
            idx = k
        }
    }
    // 비교하기 위한 배열엔 차액이 들어있으므로 보정하여 return
    return {
        name: compair[idx].name,
        price: compair[idx].price + amount
    }
}
