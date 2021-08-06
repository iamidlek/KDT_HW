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
const amount = Number(line);

// 주어진 금액으로 살 수 있는 가장 비싼 상품을 구함
const item = getItemByAmount(data, amount);

const msg = item ? 
    `${amount}원으로 살 수 있는 가장 비싼 상품은 [${item.name}]이고, 가격은 ${item.price}원입니다.` : 
    '살 수 있는 상품이 없습니다.';

// 결과 출력
alert(msg);

// 아래에 getItemByAmount 함수를 작성하세요.

/**
 * 소지한 금액으로 구매가능한 가장 비싼 상품을 반환하는 함수
 * @function getItemByAmount 
 * @param {Number} amount 소지금액 
 * @returns {object} {name: '물품명',price: 가격} 을 반환
 */
function getItemByAmount(data, amount) {
    // 상품 데이터에 중복되는 동일한 가격을 가지는 상품은 없다고 전제한다.(출력 메세지를 반복하지 않기 때문)
    
    // 정규표현식 0-9가 아닌것을 전부 확인(글로벌 매치)
    const regex= /[^0-9]/g
    // 0-9 이외의 경우 true를 return
    if (regex.test(amount)){
        return null
    }
    
    // amount 보다 같거나 작은 배열을 생성 (구매 가능한 상품 배열)
    const purchasable = data.filter(function (object) {
        if (object.price <= amount) {
            return object
        }
    });
    // 구매 가능한 상품이 없을 경우
    if (purchasable.length === 0) {
        return null
    }

    // 구매 가능한 목록중 가장 큰 price 를 가진 상품을 반환
    const max = purchasable.reduce(function (previous, current) {
        return previous.price > current.price ? previous : current;
    });
    return max
}
