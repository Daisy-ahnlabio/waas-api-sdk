# WAAS API SDK

WAAS API SDK는 다양한 블록체인 네트워크와 상호작용할 수 있는 여러 가지 유틸리티 함수를 제공합니다. 이 SDK를 사용하여 주소 확인, 트랜잭션 전송, 토큰 정보 조회 등 다양한 작업을 수행할 수 있습니다.

## 설치

npm을 사용하여 SDK를 설치할 수 있습니다.

```bash
npm install waas-api-sdk
```

## 환경 설정

`.env` 파일을 프로젝트 루트에 생성하고 필요한 환경 변수를 추가합니다.

```
REACT_APP_WAASURL=https://api.example.com
```

## 사용법

### Address 모듈

지갑 주소의 nonce 값을 조회하는 예제:

```typescript
import { getNonce } from "waas-api-sdk";

const accessToken = "your-access-token";
const network = "your-network";
const address = "your-wallet-address";

getNonce(accessToken, network, address).then((nonce) => {
  if (nonce !== null) {
    console.log("Retrieved nonce:", nonce);
  } else {
    console.log("Failed to retrieve nonce.");
  }
});
```

### 기타 모듈

- **Aptos 모듈**: Aptos 네트워크와 상호작용하는 함수들을 제공합니다.
- **Contract 모듈**: 스마트 계약 호출 관련 함수들을 제공합니다.
- **Gas 모듈**: 가스 요금 관련 함수들을 제공합니다.
- **MPCServer 모듈**: MPC 서버와 상호작용하는 함수들을 제공합니다.
- **MPCWallet 모듈**: MPC 지갑 관련 함수들을 제공합니다.
- **NFT 모듈**: NFT 관련 정보 조회 함수들을 제공합니다.
- **Sign 모듈**: 트랜잭션 서명 관련 함수들을 제공합니다.
- **Token 모듈**: 토큰 관련 정보 조회 함수들을 제공합니다.
- **Transaction 모듈**: 트랜잭션 관련 함수들을 제공합니다.
- **Walletscan 모듈**: 지갑 관련 정보 조회 함수들을 제공합니다.
- **Member 모듈**: 사용자 정보 및 인증 관련 함수들을 제공합니다.
