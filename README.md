
## 💡 더컴퍼스 국민대학교 2024년도 동계 인턴쉽 챌린지 [프론트엔드] - 20213015 송규원

![image](https://github.com/user-attachments/assets/aaa89322-2351-484c-b742-868d20b422dd)

## 1. 프로젝트 설치 및 실행 방법

### 1) 레포지토리 복제

```bash
git clone https://github.com/gyuwonsong/TheCompass-Assignment.git
```

### 2) npm 설치

```bash
npm install
```

### 3) npm 실행

```bash
npm start
```

## 2. 프로젝트 구조

```
TheCompass-Assignment
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── public
│   ├── index.html
│   └── (기타 정적 파일)
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   └── (개별 컴포넌트 파일들)
    ├── data
    │   └── (데이터 관련 파일들)
    ├── index.css
    └── index.js
```

## 3. 주요 기능

- **컴포넌트 기반 구조** : `src/components` 폴더에 있는 개별 컴포넌트
- **Tailwind CSS 스타일링** : `tailwind.config.js` 및 `postcss.config.js`를 사용한 스타일링 설정
- **React Router** : 페이지 간 라우팅 처리

## 4. 기술 스택

- **React** - UI 라이브러리
- **Tailwind CSS** - 유틸리티 중심의 CSS 프레임워크
- **PostCSS** - CSS 빌드 도구

## 5. 문제 해결 및 디버깅

### 1) 문제 상황

- React 프로젝트에서 *"Duplicate form field id in the same form"*  에러 발생. 해당 오류는 동일한 `id` 속성을 여러 개의 폼 필드에서 사용했을 때 나타남.
- 이 프로젝트에서는 기존에 `TaskItem` 컴포넌트에서 태스크의 상태를 선택하는 `<select>` 요소에 동일한 `id` 속성 (`id="status"`)을 사용. 이로 인해 여러 개의 `<select>` 요소가 동일한 `id`를 공유하게 되었고, 중복 `id`로 인해 오류가 발생한 것으로 파악됨.

### 2) 문제 원인

- **중복된 `id` 사용** : `TaskItem` 컴포넌트가 한 프로젝트가 가진 여러 태스크를 렌더링하면서 각각의 `<select>` 요소에 `id="status"` 속성이 중복 사용되었음을 확인함.
- **React의 컴포넌트 반복 구조** : React에서 컴포넌트를 반복하여 렌더링할 때 같은 `id`를 사용하는 요소들이 여러 번 생성되면서 브라우저가 폼 필드를 구분하지 못해 문제 상황 발생 가능성이 있음.

### 3) 문제 해결

1. **고유한 동적 `id` 할당**

   각 `<select>` 요소에 `id`를 동적으로 설정하여 중복을 방지. 각 태스크의 `id`를 활용하여 `<select>` 요소마다 고유한 `id`를 부여하여 해결함.

2. **디버깅 과정**
    - 브라우저 콘솔에 출력된 *"duplicate same field id in same form"* 이슈 확인
    - `TaskItem` 컴포넌트에서 동일한 `id="status"`가 반복되는 것을 발견
    - 각 태스크마다 고유한 `id`를 할당하기 위해 `taskData.id`를 활용해 동적 `id`로 설정하는 방식으로 수정

### 4) 수정된 코드 예시

```jsx
<div>
    <label htmlFor={`status-${taskData.id}`} className="text-gray-600 mr-2">상태 :</label>
    <select
        id={`status-${taskData.id}`} // 고유한 id 설정
        value={taskData.status}
        onChange={handleStatusChange}
        className="p-1 border border-gray-300 rounded-xl"
        disabled={taskData.status === "done"}
    >
        <option value="not-started">시작 전</option>
        <option value="in-progress">진행 중</option>
        <option value="done">완료</option>
    </select>
</div>

```

- `id`와 `htmlFor` 속성을 각각 `status-${taskData.id}`와 같은 고유한 값으로 설정
- 이를 통해 `<select>` 요소마다 고유한 `id`가 적용되어 중복 오류 해결